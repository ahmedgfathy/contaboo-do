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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['apartment', 'house', 'villa', 'townhouse', 'studio', 'penthouse', 'duplex', 'land', 'commercial', 'office'])->default('apartment');
            $table->enum('status', ['available', 'sold', 'rented', 'pending', 'off_market'])->default('available');
            $table->enum('listing_type', ['sale', 'rent'])->default('sale');
            $table->decimal('price', 15, 2);
            $table->decimal('area', 10, 2)->nullable(); // in square meters
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('parking_spaces')->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('total_floors')->nullable();
            $table->year('year_built')->nullable();
            $table->boolean('furnished')->default(false);
            $table->json('amenities')->nullable(); // pool, gym, security, etc.
            $table->json('images')->nullable(); // array of image URLs
            $table->string('address');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('country');
            $table->string('postal_code')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('reference_number')->unique()->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['type', 'status']);
            $table->index(['listing_type', 'price']);
            $table->index(['city', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
