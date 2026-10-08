<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            foreach (['zh', 'ko', 'th', 'ja'] as $locale) {
                $table->json($locale)->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', fn (Blueprint $table) => $table->dropColumn(['zh', 'ko', 'th', 'ja']));
    }
};
