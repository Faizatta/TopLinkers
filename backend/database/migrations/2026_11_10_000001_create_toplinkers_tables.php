<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('lead_code')->nullable();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('city')->nullable();
            $table->string('division')->default('Plots');
            $table->string('project')->nullable();
            $table->string('budget')->nullable();
            $table->string('status')->default('New');
            $table->string('priority')->default('Medium');
            $table->string('source')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('market_rates', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g., 'all_rates'
            $table->json('payload');
            $table->timestamps();
        });

        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->bigInteger('price')->default(0);
            $table->string('type')->default('plot');
            $table->string('purpose')->default('for-sale');
            $table->string('location')->nullable();
            $table->string('area')->nullable();
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->string('image')->nullable();
            $table->boolean('featured')->default(false);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
        Schema::dropIfExists('market_rates');
        Schema::dropIfExists('properties');
    }
};
