<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SavePortfolioProject;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = PortfolioProject::query();
        if ($request->string('view')->toString() === 'archived') {
            $query->onlyTrashed();
        }

        return view('admin.projects.index', ['projects' => $query->orderBy('position')->orderBy('id')->get(), 'archived' => $request->string('view')->toString() === 'archived']);
    }

    public function create()
    {
        return view('admin.projects.edit', ['project' => new PortfolioProject(['category' => 'Apps', 'status' => 'In development', 'position' => 0, 'en' => [], 'ru' => [], 'stack' => [], 'platforms' => [], 'screenshots' => []])]);
    }

    public function edit(PortfolioProject $project)
    {
        return view('admin.projects.edit', compact('project'));
    }

    private function attributes(SavePortfolioProject $request): array
    {
        $data = $request->validated();
        unset($data['version']);
        usort($data['screenshots'], fn ($a, $b) => ($a['position'] ?? 0) <=> ($b['position'] ?? 0));
        $data['screenshots'] = array_map(fn ($shot) => array_intersect_key($shot, array_flip(['src', 'kind', 'caption_en', 'caption_ru'])), $data['screenshots']);

        return $data;
    }

    public function store(SavePortfolioProject $request)
    {
        $project = PortfolioProject::create($this->attributes($request));

        return redirect()->route('admin.projects.edit', $project)->with('status', 'Project created.');
    }

    public function update(SavePortfolioProject $request, PortfolioProject $project)
    {
        $attributes = $this->attributes($request);
        $saved = DB::transaction(function () use ($project, $request, $attributes) {
            $current = PortfolioProject::whereKey($project->id)->lockForUpdate()->firstOrFail();
            if ($current->version !== $request->integer('version')) {
                return false;
            }
            $current->fill($attributes);
            $current->version++;

            return $current->save();
        });
        if (! $saved) {
            return back()->withInput()->withErrors(['version' => 'This project was changed in another window. Reload it before saving again.']);
        }

        return redirect()->route('admin.projects.edit', $project)->with('status', 'Saved. The website will use these changes on its next page load.');
    }

    public function visibility(Request $request, PortfolioProject $project)
    {
        $data = $request->validate(['published' => ['required', 'boolean'], 'featured' => ['required', 'boolean'], 'version' => ['required', 'integer']]);
        $saved = PortfolioProject::whereKey($project->id)->where('version', $data['version'])->update(['published' => $data['published'], 'featured' => $data['featured'], 'version' => DB::raw('version + 1')]);
        if (! $saved) {
            return back()->withErrors(['version' => 'The project changed in another window. Please reload.']);
        }

        return back()->with('status', 'Visibility updated.');
    }

    public function destroy(PortfolioProject $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('status', 'Project archived. You can restore it from the archive.');
    }

    public function restore(int $id)
    {
        $project = PortfolioProject::onlyTrashed()->findOrFail($id);
        $project->published = false;
        $project->featured = false;
        $project->version++;
        $project->restore();

        return redirect()->route('admin.projects.edit', $project)->with('status', 'Restored as a hidden draft.');
    }
}
