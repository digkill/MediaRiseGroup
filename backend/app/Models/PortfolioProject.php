<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortfolioProject extends Model
{
    use SoftDeletes;

    public const CATEGORIES = ['Apps', 'Web platforms', 'AI & automation', 'System software', 'Games', 'Devices'];

    public const STATUSES = ['Live', 'In development', 'Prototype'];

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['en' => 'array', 'ru' => 'array', 'stack' => 'array', 'platforms' => 'array', 'screenshots' => 'array', 'published' => 'boolean', 'featured' => 'boolean', 'version' => 'integer', 'position' => 'integer'];
    }

    public function toPublicArray(): array
    {
        // Explicit allowlist: never serialize the model or Russian editorial data.
        $content = array_intersect_key($this->en, array_flip(['title', 'type', 'description', 'audience', 'features', 'note', 'websiteLabel']));

        return array_merge($content, [
            'slug' => $this->slug, 'category' => $this->category, 'status' => $this->status,
            'stack' => $this->stack, 'platforms' => $this->platforms, 'website' => $this->website,
            'featured' => $this->featured, 'position' => $this->position,
            'screenshots' => array_map(fn ($shot) => [
                'src' => $shot['src'], 'kind' => $shot['kind'] ?? 'screenshot',
                'alt' => $shot['caption_en'], 'caption' => $shot['caption_en'],
            ], $this->screenshots),
        ]);
    }
}
