<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE contacts MODIFY COLUMN type ENUM('client', 'partner', 'vendor', 'owner', 'agent', 'broker', 'other') DEFAULT 'client'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE contacts MODIFY COLUMN type ENUM('client', 'partner', 'vendor', 'other') DEFAULT 'client'");
    }
};
