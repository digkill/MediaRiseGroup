<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/cms-health', function () {
    DB::table('portfolio_projects')->limit(1)->count();

    return response()->json(['status' => 'ok']);
});
