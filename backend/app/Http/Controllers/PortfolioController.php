<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate(['locale' => ['sometimes', 'string', 'max:32']]);
        $requested = $data['locale'] ?? 'en';
        $locale = in_array($requested, PortfolioProject::LOCALES, true) ? $requested : 'en';

        return response()->json(['data' => PortfolioProject::where('published', true)->orderBy('position')->orderBy('id')->get()->map(fn ($project) => $project->toPublicArray($locale))])->header('Cache-Control', 'no-store')->header('Content-Language', $locale);
    }
}
