<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\Property;
use App\Models\Opportunity;
use App\Models\User;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $userId = $admin ? $admin->id : 1;

        // Create sample Leads (skip if already exist)
        if (Lead::count() == 0) {
            $leads = [
                ['first_name' => 'John', 'last_name' => 'Smith', 'email' => 'john@example.com', 'phone' => '+1-555-0101', 'status' => 'new', 'source' => 'website', 'estimated_value' => 500000],
                ['first_name' => 'Sarah', 'last_name' => 'Johnson', 'email' => 'sarah@example.com', 'phone' => '+1-555-0102', 'status' => 'qualified', 'source' => 'referral', 'estimated_value' => 350000],
                ['first_name' => 'Michael', 'last_name' => 'Brown', 'email' => 'michael@example.com', 'phone' => '+1-555-0103', 'status' => 'contacted', 'source' => 'social_media', 'estimated_value' => 750000],
                ['first_name' => 'Emily', 'last_name' => 'Davis', 'email' => 'emily@example.com', 'phone' => '+1-555-0104', 'status' => 'qualified', 'source' => 'website', 'estimated_value' => 400000],
                ['first_name' => 'David', 'last_name' => 'Wilson', 'email' => 'david@example.com', 'phone' => '+1-555-0105', 'status' => 'new', 'source' => 'referral', 'estimated_value' => 600000],
            ];

            foreach ($leads as $leadData) {
                Lead::create(array_merge($leadData, [
                    'created_by' => $userId,
                    'updated_by' => $userId,
                ]));
            }
        }

        // Create sample Properties
        $properties = [
            ['title' => 'Luxury Downtown Villa', 'type' => 'villa', 'status' => 'available', 'listing_type' => 'sale', 'price' => 850000, 'bedrooms' => 4, 'bathrooms' => 3, 'area' => 3500, 'address' => '123 Main St', 'city' => 'New York', 'country' => 'USA'],
            ['title' => 'Modern City Apartment', 'type' => 'apartment', 'status' => 'available', 'listing_type' => 'rent', 'price' => 3500, 'bedrooms' => 2, 'bathrooms' => 2, 'area' => 1200, 'address' => '456 Park Ave', 'city' => 'Los Angeles', 'country' => 'USA'],
            ['title' => 'Beachfront Penthouse', 'type' => 'penthouse', 'status' => 'available', 'listing_type' => 'sale', 'price' => 1200000, 'bedrooms' => 3, 'bathrooms' => 3, 'area' => 2800, 'address' => '789 Ocean Dr', 'city' => 'Miami', 'country' => 'USA'],
            ['title' => 'Suburban Family House', 'type' => 'house', 'status' => 'available', 'listing_type' => 'sale', 'price' => 450000, 'bedrooms' => 3, 'bathrooms' => 2, 'area' => 2200, 'address' => '321 Oak St', 'city' => 'Chicago', 'country' => 'USA'],
            ['title' => 'Downtown Studio', 'type' => 'studio', 'status' => 'rented', 'listing_type' => 'rent', 'price' => 1800, 'bedrooms' => 1, 'bathrooms' => 1, 'area' => 600, 'address' => '654 Market St', 'city' => 'San Francisco', 'country' => 'USA'],
        ];

        $createdProperties = [];
        foreach ($properties as $propertyData) {
            $createdProperties[] = Property::create(array_merge($propertyData, [
                'created_by' => $userId,
                'updated_by' => $userId,
            ]));
        }

        $createdLeads = Lead::all();

        // Create sample Opportunities
        $opportunities = [
            [
                'title' => 'Downtown Villa Sale - John Smith',
                'lead_id' => $createdLeads[0]->id ?? null,
                'property_id' => $createdProperties[0]->id ?? null,
                'value' => 850000,
                'probability' => 75,
                'stage' => 'negotiation',
                'type' => 'sale',
                'status' => 'active',
                'expected_close_date' => now()->addDays(30),
            ],
            [
                'title' => 'City Apartment Rental - Sarah Johnson',
                'lead_id' => $createdLeads[1]->id ?? null,
                'property_id' => $createdProperties[1]->id ?? null,
                'value' => 42000,
                'probability' => 60,
                'stage' => 'viewing',
                'type' => 'rent',
                'status' => 'active',
                'expected_close_date' => now()->addDays(15),
            ],
            [
                'title' => 'Penthouse Purchase - Michael Brown',
                'lead_id' => $createdLeads[2]->id ?? null,
                'property_id' => $createdProperties[2]->id ?? null,
                'value' => 1200000,
                'probability' => 50,
                'stage' => 'qualification',
                'type' => 'sale',
                'status' => 'active',
                'expected_close_date' => now()->addDays(60),
            ],
            [
                'title' => 'Family House Sale - Emily Davis',
                'lead_id' => $createdLeads[3]->id ?? null,
                'property_id' => $createdProperties[3]->id ?? null,
                'value' => 450000,
                'probability' => 80,
                'stage' => 'proposal',
                'type' => 'sale',
                'status' => 'active',
                'expected_close_date' => now()->addDays(20),
            ],
            [
                'title' => 'Investment Property - David Wilson',
                'lead_id' => $createdLeads[4]->id ?? null,
                'property_id' => null,
                'value' => 600000,
                'probability' => 40,
                'stage' => 'qualification',
                'type' => 'sale',
                'status' => 'active',
                'expected_close_date' => now()->addDays(90),
                'notes' => 'Looking for multiple investment properties',
            ],
        ];

        foreach ($opportunities as $opportunityData) {
            Opportunity::create(array_merge($opportunityData, [
                'created_by' => $userId,
                'updated_by' => $userId,
            ]));
        }

        $this->command->info('Sample data seeded successfully!');
        $this->command->info('Leads: ' . Lead::count());
        $this->command->info('Properties: ' . Property::count());
        $this->command->info('Opportunities: ' . Opportunity::count());
    }
}
