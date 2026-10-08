<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $projects = json_decode(file_get_contents(__DIR__.'/data/portfolio.json'), true, flags: JSON_THROW_ON_ERROR);
        foreach ($projects as $project) {
            // Includes archived rows so a redeployment never resurrects them.
            DB::transaction(function () use ($project) {
                $record = PortfolioProject::withTrashed()->lockForUpdate()->firstOrCreate(['slug' => $project['slug']], $project);
                // Backfill the new language columns once. Preserve all edited content,
                // publication flags, order, archive state and existing screenshot order.
                $added = false;
                foreach (['zh', 'ko', 'th', 'ja'] as $locale) {
                    if ($record->{$locale} === null) {
                        $record->{$locale} = $project[$locale];
                        $added = true;
                    }
                }
                if ($added) {
                    $reference = collect($project['screenshots'])->keyBy('src');
                    $record->screenshots = array_map(function ($shot) use ($reference) {
                        $source = $reference->get($shot['src']);
                        foreach (['zh', 'ko', 'th', 'ja'] as $locale) {
                            if ($source && ! isset($shot['caption_'.$locale])) {
                                $shot['caption_'.$locale] = $source['caption_'.$locale];
                            }
                        }

                        return $shot;
                    }, $record->screenshots);
                    $record->version++;
                    $record->save();
                }
            });
        }
    }
}
