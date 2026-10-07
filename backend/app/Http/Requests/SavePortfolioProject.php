<?php

namespace App\Http\Requests;

use App\Models\PortfolioMedia;
use App\Models\PortfolioProject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SavePortfolioProject extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    protected function prepareForValidation(): void
    {
        $values = ['published' => $this->boolean('published'), 'featured' => $this->boolean('featured')];
        foreach (['stack', 'platforms'] as $field) {
            $values[$field] = $this->lines($this->input($field, ''));
        }
        foreach (['en', 'ru'] as $locale) {
            $values[$locale] = $this->input($locale, []);
            $values[$locale]['features'] = $this->lines($values[$locale]['features'] ?? '');
        }
        $values['screenshots'] = array_values(array_filter($this->input('screenshots', []), fn ($shot) => empty($shot['remove'])));
        $this->merge($values);
    }

    private function lines($value): array
    {
        if (is_array($value)) {
            return $value;
        }

        return array_values(array_filter(array_map('trim', preg_split('/\R/u', $value ?? '')), fn ($line) => $line !== ''));
    }

    public function rules(): array
    {
        $rules = [
            'slug' => ['required', 'max:100', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('portfolio_projects', 'slug')->ignore($this->route('project')?->id)],
            'category' => ['required', Rule::in(PortfolioProject::CATEGORIES)], 'status' => ['required', Rule::in(PortfolioProject::STATUSES)],
            'published' => ['required', 'boolean'], 'featured' => ['required', 'boolean'], 'position' => ['required', 'integer', 'min:0', 'max:100000'],
            'version' => [$this->route('project') ? 'required' : 'nullable', 'integer', 'min:1'],
            'website' => ['nullable', 'string', 'max:2048', function ($attr, $value, $fail) {
                if (! preg_match('~^(https://[^\s]+|/(?!/)[a-zA-Z0-9/_-]*)$~', $value)) {
                    $fail('Use an HTTPS address or a local page path.');
                }
            }],
            'stack' => ['array', 'max:20'], 'stack.*' => ['required', 'string', 'max:80'],
            'platforms' => ['array', 'max:20'], 'platforms.*' => ['required', 'string', 'max:80'],
            'screenshots' => ['array', 'max:30'],
            'screenshots.*.src' => ['required', 'string', 'max:255', function ($attr, $value, $fail) {
                $static = preg_match('~^/images/projects/[a-zA-Z0-9/_-]+\.(webp|png|jpe?g)$~', $value) && is_file(config('portfolio.public_path').$value);
                $uploaded = preg_match('~^/portfolio-media/([a-f0-9]{64})$~', $value, $match) && PortfolioMedia::where('hash', $match[1])->exists();
                if (! $static && ! $uploaded) {
                    $fail('Choose an existing project image or upload a new image.');
                }
            }],
            'screenshots.*.caption_en' => ['required', 'string', 'max:500'], 'screenshots.*.caption_ru' => ['nullable', 'string', 'max:500'],
            'screenshots.*.kind' => ['required', Rule::in(['screenshot', 'illustration'])],
            'screenshots.*.position' => ['nullable', 'integer', 'min:0', 'max:10000'],
        ];
        foreach (['en', 'ru'] as $locale) {
            $required = $locale === 'en' ? 'required' : 'nullable';
            $rules[$locale] = ['required', 'array:title,type,description,audience,features,note,websiteLabel'];
            foreach (['title' => 160, 'type' => 240, 'description' => 3000, 'audience' => 1000, 'note' => 2000, 'websiteLabel' => 80] as $field => $max) {
                $rules["$locale.$field"] = [in_array($field, ['note', 'websiteLabel']) ? 'nullable' : $required, 'string', "max:$max"];
            }
            $rules["$locale.features"] = ['array', 'max:30'];
            $rules["$locale.features.*"] = ['required', 'string', 'max:500'];
        }

        return $rules;
    }
}
