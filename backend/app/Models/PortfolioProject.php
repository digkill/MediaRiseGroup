<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortfolioProject extends Model
{
    use SoftDeletes;

    public const LOCALES = ['en', 'ru', 'zh', 'ko', 'th', 'ja'];

    public const CATEGORIES = ['Apps', 'Web platforms', 'AI & automation', 'System software', 'Games', 'Devices'];

    public const STATUSES = ['Live', 'In development', 'Prototype'];

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['en' => 'array', 'ru' => 'array', 'zh' => 'array', 'ko' => 'array', 'th' => 'array', 'ja' => 'array', 'stack' => 'array', 'platforms' => 'array', 'screenshots' => 'array', 'published' => 'boolean', 'featured' => 'boolean', 'version' => 'integer', 'position' => 'integer'];
    }

    public function toPublicArray(string $locale = 'en'): array
    {
        // Return exactly one locale, never the complete multilingual model.
        $locale = in_array($locale, self::LOCALES, true) ? $locale : 'en';
        $localized = array_filter($this->{$locale} ?? [], fn ($value) => is_string($value) ? trim($value) !== '' : ($value !== null && $value !== []));
        $content = array_intersect_key(array_merge($this->en, $localized), array_flip(['title', 'type', 'description', 'audience', 'features', 'note', 'websiteLabel']));

        return array_merge($content, [
            'slug' => $this->slug, 'category' => $this->category, 'status' => $this->status,
            'stack' => $this->stack, 'platforms' => $this->platforms, 'website' => $this->website,
            'featured' => $this->featured, 'position' => $this->position,
            'screenshots' => array_map(fn ($shot) => [
                'src' => $shot['src'], 'kind' => $shot['kind'] ?? 'screenshot',
                'alt' => trim($shot['caption_'.$locale] ?? '') !== '' ? $shot['caption_'.$locale] : $shot['caption_en'], 'caption' => trim($shot['caption_'.$locale] ?? '') !== '' ? $shot['caption_'.$locale] : $shot['caption_en'],
            ], $this->screenshots),
        ]);
    }
}
