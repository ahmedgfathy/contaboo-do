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
        Schema::table('leads', function (Blueprint $table) {
            $table->text('requirements')->nullable()->after('notes');
            $table->decimal('budget', 15, 2)->nullable()->after('requirements');
            $table->string('property_type')->nullable()->after('budget');
            $table->string('property_category')->nullable()->after('property_type');
            $table->integer('no_of_rooms')->nullable()->after('property_category');
            $table->integer('no_of_bathrooms')->nullable()->after('no_of_rooms');
            $table->string('asking')->nullable()->after('no_of_bathrooms'); // 'buy' or 'rent'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn([
                'requirements',
                'budget',
                'property_type',
                'property_category',
                'no_of_rooms',
                'no_of_bathrooms',
                'asking'
            ]);
        });
    }
};
