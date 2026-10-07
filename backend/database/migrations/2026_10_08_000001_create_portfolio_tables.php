<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
        });
        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('status');
            $table->boolean('published')->default(false)->index();
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('position')->default(0);
            $table->json('en');
            $table->json('ru')->nullable();
            $table->json('stack');
            $table->json('platforms');
            $table->json('screenshots');
            $table->string('website', 2048)->nullable();
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('portfolio_media', function (Blueprint $table) {
            $table->string('hash', 64)->primary();
            $table->string('mime');
            // Base64 in longText keeps uploads durable in MySQL, without relying
            // on an ephemeral deployment filesystem. The request size is capped.
            $table->longText('content');
            $table->unsignedInteger('bytes');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_media');
        Schema::dropIfExists('portfolio_projects');
        Schema::table('users', fn (Blueprint $table) => $table->dropColumn('is_admin'));
    }
};
