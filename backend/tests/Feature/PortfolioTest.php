<?php

namespace Tests\Feature;

use App\Models\PortfolioProject;
use App\Models\User;
use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create();
        $user->is_admin = true;
        $user->save();

        return $user;
    }

    private function project(): PortfolioProject
    {
        $this->seed(PortfolioSeeder::class);

        return PortfolioProject::where('slug', 'vibe-video')->firstOrFail();
    }

    private function payload(PortfolioProject $project): array
    {
        return $project->only(['slug', 'category', 'status', 'published', 'featured', 'position', 'version', 'website', 'stack', 'platforms', 'en', 'ru', 'screenshots']);
    }

    public function test_seed_is_idempotent_and_preserves_editor_changes_and_archives(): void
    {
        $p = $this->project();
        $p->update(['en' => [...$p->en, 'title' => 'Edited name'], 'featured' => false]);
        $archived = PortfolioProject::where('slug', 'tarot')->first();
        $archived->delete();
        $this->seed(PortfolioSeeder::class);
        $this->assertSame(21, PortfolioProject::withTrashed()->count());
        $this->assertSame('Edited name', $p->fresh()->en['title']);
        $this->assertFalse($p->fresh()->featured);
        $this->assertTrue(PortfolioProject::withTrashed()->find($archived->id)->trashed());
    }

    public function test_public_api_is_english_only_and_excludes_hidden_projects(): void
    {
        $p = $this->project();
        $p->update(['published' => false, 'featured' => true]);
        $result = $this->getJson('/api/portfolio?locale=ru')->assertOk()->assertJsonCount(20, 'data');
        $this->assertStringNotContainsString('caption_ru', $result->getContent());
        $this->assertStringNotContainsString('"ru"', $result->getContent());
        $this->assertStringNotContainsString('Vibe Video', $result->getContent());
        foreach ($result->json('data') as $project) {
            unset($project['website']);
            $this->assertDoesNotMatchRegularExpression('/[А-Яа-яЁё]/u', json_encode($project, JSON_UNESCAPED_UNICODE));
        }
    }

    public function test_guests_and_non_admins_cannot_manage_projects_or_upload(): void
    {
        $p = $this->project();
        $this->get('/admin/projects')->assertRedirect('/admin/login');
        $this->post('/admin/projects', [])->assertRedirect('/admin/login');
        $this->actingAs(User::factory()->create())->get('/admin/projects')->assertForbidden();
        $this->put('/admin/projects/'.$p->id, $this->payload($p))->assertForbidden();
        $this->post('/admin/media')->assertForbidden();
    }

    public function test_admin_can_edit_both_languages_and_publication_flags(): void
    {
        $p = $this->project();
        $this->actingAs($this->admin());
        $this->get('/admin/projects')->assertOk()->assertSee('На главной');
        $this->get('/admin/projects/'.$p->id.'/edit')->assertOk()->assertSee('Русская версия — скрыта');
        $data = $this->payload($p);
        $data['en']['title'] = 'Updated video editor';
        $data['ru']['title'] = 'Сохранённая русская версия';
        $data['featured'] = false;
        $this->put('/admin/projects/'.$p->id, $data)->assertSessionHasNoErrors()->assertRedirect();
        $p->refresh();
        $this->assertSame('Updated video editor', $p->en['title']);
        $this->assertSame('Сохранённая русская версия', $p->ru['title']);
        $this->assertFalse($p->featured);
        $this->getJson('/api/portfolio')->assertJsonFragment(['title' => 'Updated video editor'])->assertJsonMissing(['title' => 'Сохранённая русская версия']);
    }

    public function test_stale_edit_cannot_overwrite_newer_changes(): void
    {
        $p = $this->project();
        $data = $this->payload($p);
        $p->update(['version' => 2]);
        $this->actingAs($this->admin())->from('/admin/projects/'.$p->id.'/edit')->put('/admin/projects/'.$p->id, $data)->assertSessionHasErrors('version');
        $this->assertSame(2, $p->fresh()->version);
    }

    public function test_checkbox_can_remove_featured_without_unpublishing(): void
    {
        $p = $this->project();
        $this->actingAs($this->admin())->patch('/admin/projects/'.$p->id.'/visibility', ['published' => 1, 'featured' => 0, 'version' => 1])->assertSessionHasNoErrors();
        $this->assertTrue($p->fresh()->published);
        $this->assertFalse($p->fresh()->featured);
        $this->getJson('/api/portfolio')->assertJsonFragment(['slug' => 'vibe-video', 'featured' => false]);
    }

    public function test_admin_can_create_archive_and_restore_project_as_hidden(): void
    {
        $p = $this->project();
        $data = $this->payload($p);
        $data['slug'] = 'new-product';
        $data['published'] = false;
        $this->actingAs($this->admin())->post('/admin/projects', $data)->assertSessionHasNoErrors();
        $new = PortfolioProject::where('slug', 'new-product')->firstOrFail();
        $this->delete('/admin/projects/'.$new->id)->assertRedirect();
        $this->assertSoftDeleted($new);
        $this->post('/admin/projects/'.$new->id.'/restore')->assertRedirect();
        $this->assertFalse($new->fresh()->published);
        $this->assertFalse($new->fresh()->featured);
    }

    public function test_unsafe_links_and_image_paths_are_rejected(): void
    {
        $p = $this->project();
        $data = $this->payload($p);
        $data['website'] = 'javascript:alert(1)';
        $data['screenshots'][0]['src'] = '/images/projects/../../.env';
        $this->actingAs($this->admin())->put('/admin/projects/'.$p->id, $data)->assertSessionHasErrors(['website', 'screenshots.0.src']);
    }

    public function test_upload_is_validated_stored_and_served_from_database(): void
    {
        $this->actingAs($this->admin());
        $image = UploadedFile::fake()->image('screen.png', 400, 300);
        $response = $this->postJson('/admin/media', ['image' => $image])->assertCreated();
        $url = $response->json('src');
        $this->get($url)->assertOk()->assertHeader('Content-Type', 'image/png');
        $this->postJson('/admin/media', ['image' => UploadedFile::fake()->create('payload.svg', 2, 'image/svg+xml')])->assertUnprocessable();
        $this->postJson('/admin/media', ['image' => UploadedFile::fake()->image('huge.png')->size(6000)])->assertUnprocessable();
    }

    public function test_login_checks_admin_role_and_logout_invalidates_session(): void
    {
        $admin = $this->admin();
        $admin->password = Hash::make('a-secure-example-password');
        $admin->save();
        $this->post('/admin/login', ['email' => $admin->email, 'password' => 'wrong'])->assertSessionHasErrors('email');
        $this->post('/admin/login', ['email' => $admin->email, 'password' => 'a-secure-example-password'])->assertRedirect('/admin/projects');
        $this->assertAuthenticatedAs($admin);
        $this->post('/admin/logout')->assertRedirect('/admin/login');
        $this->assertGuest();
        $user = User::factory()->create(['password' => Hash::make('another-secure-password')]);
        $this->post('/admin/login', ['email' => $user->email, 'password' => 'another-secure-password'])->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_login_is_rate_limited(): void
    {
        for ($i = 0; $i < 6; $i++) {
            $response = $this->post('/admin/login', ['email' => 'admin@example.com', 'password' => 'wrong']);
        }
        $response->assertSessionHasErrors(['email' => 'Too many attempts. Please try again in a minute.']);
    }
}
