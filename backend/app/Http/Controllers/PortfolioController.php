<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;

class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json(['data' => PortfolioProject::where('published', true)->orderBy('position')->orderBy('id')->get()->map->toPublicArray()])->header('Cache-Control', 'no-store');
    }
}
