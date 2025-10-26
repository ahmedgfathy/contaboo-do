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
        // Add fields to leads table to track conversion
        Schema::table('leads', function (Blueprint $table) {
            $table->boolean('is_converted')->default(false)->after('asking');
            $table->foreignId('converted_to_contact_id')->nullable()->after('is_converted')->constrained('contacts')->onDelete('set null');
            $table->timestamp('converted_at')->nullable()->after('converted_to_contact_id');
        });

        // Add field to contacts table to reference original lead
        Schema::table('contacts', function (Blueprint $table) {
            $table->foreignId('original_lead_id')->nullable()->after('updated_by')->constrained('leads')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropForeign(['original_lead_id']);
            $table->dropColumn('original_lead_id');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->dropForeign(['converted_to_contact_id']);
            $table->dropColumn(['is_converted', 'converted_to_contact_id', 'converted_at']);
        });
    }
};
