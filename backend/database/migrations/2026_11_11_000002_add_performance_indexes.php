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
        // Add indexes to blogs table for ultra-fast filtering, sorting, and pagination
        if (Schema::hasTable('blogs')) {
            Schema::table('blogs', function (Blueprint $table) {
                $table->index(['is_published', 'published_at'], 'idx_blogs_pub_date');
                $table->index('category', 'idx_blogs_category');
                $table->index('views', 'idx_blogs_views');
            });
        }

        // Add indexes to properties table
        if (Schema::hasTable('properties')) {
            Schema::table('properties', function (Blueprint $table) {
                $table->index(['purpose', 'type'], 'idx_props_purpose_type');
                $table->index('featured', 'idx_props_featured');
                $table->index('price', 'idx_props_price');
            });
        }

        // Add indexes to leads table
        if (Schema::hasTable('leads')) {
            Schema::table('leads', function (Blueprint $table) {
                $table->index(['status', 'priority'], 'idx_leads_status_priority');
                $table->index('created_at', 'idx_leads_created_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('blogs')) {
            Schema::table('blogs', function (Blueprint $table) {
                $table->dropIndex('idx_blogs_pub_date');
                $table->dropIndex('idx_blogs_category');
                $table->dropIndex('idx_blogs_views');
            });
        }

        if (Schema::hasTable('properties')) {
            Schema::table('properties', function (Blueprint $table) {
                $table->dropIndex('idx_props_purpose_type');
                $table->dropIndex('idx_props_featured');
                $table->dropIndex('idx_props_price');
            });
        }

        if (Schema::hasTable('leads')) {
            Schema::table('leads', function (Blueprint $table) {
                $table->dropIndex('idx_leads_status_priority');
                $table->dropIndex('idx_leads_created_at');
            });
        }
    }
};
