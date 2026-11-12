<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->boolean('offer_enabled')->default(false);
            $table->string('offer_label')->nullable();
            $table->bigInteger('offer_price')->nullable();
            $table->string('offer_expires_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn(['offer_enabled', 'offer_label', 'offer_price', 'offer_expires_at']);
        });
    }
};
