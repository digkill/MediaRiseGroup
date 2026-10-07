<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $projects = json_decode(file_get_contents(__DIR__.'/data/portfolio.json'), true, flags: JSON_THROW_ON_ERROR);
        foreach ($projects as $project) {
            // Includes archived rows so a redeployment never resurrects them.
            PortfolioProject::withTrashed()->firstOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
