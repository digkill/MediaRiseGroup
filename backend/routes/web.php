<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/admin/login', [AuthController::class, 'create'])->name('login');
Route::post('/admin/login', [AuthController::class, 'store'])->middleware('throttle:30,1');
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::redirect('/', '/admin/projects');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
    Route::resource('projects', ProjectController::class)->except('show');
    Route::patch('/projects/{project}/visibility', [ProjectController::class, 'visibility'])->name('projects.visibility');
    Route::post('/projects/{id}/restore', [ProjectController::class, 'restore'])->whereNumber('id')->name('projects.restore');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
});
Route::get('/portfolio-media/{hash}', [MediaController::class, 'show'])->where('hash', '[a-f0-9]{64}');
