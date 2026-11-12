<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Market Trends');
            $table->string('author')->default('TopLinkers Editorial');
            $table->string('author_role')->nullable()->default('Property Specialist');
            $table->string('author_photo')->nullable();
            $table->string('image')->nullable();
            $table->string('read_time')->default('5 min read');
            $table->text('summary')->nullable();
            $table->longText('content');
            $table->json('tags')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
