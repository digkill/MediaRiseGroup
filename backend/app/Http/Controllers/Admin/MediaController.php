<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioMedia;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120', 'dimensions:max_width=8000,max_height=8000']]);
        $file = $request->file('image');
        $content = file_get_contents($file->getRealPath());
        $hash = hash('sha256', $content);
        PortfolioMedia::firstOrCreate(['hash' => $hash], ['content' => base64_encode($content), 'mime' => $file->getMimeType(), 'bytes' => strlen($content)]);

        return response()->json(['src' => '/portfolio-media/'.$hash], 201);
    }

    public function show(string $hash)
    {
        $image = PortfolioMedia::findOrFail($hash);

        return response(base64_decode($image->content), 200, ['Content-Type' => $image->mime, 'X-Content-Type-Options' => 'nosniff', 'Cache-Control' => 'public, max-age=31536000, immutable', 'ETag' => '"'.$hash.'"']);
    }
}
