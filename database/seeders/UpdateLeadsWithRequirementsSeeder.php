<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lead;

class UpdateLeadsWithRequirementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyTypes = ['apartment', 'villa', 'shop', 'land', 'office', 'warehouse', 'building'];
        $propertyCategories = ['residential', 'commercial', 'industrial', 'agricultural'];
        $askingOptions = ['buy', 'rent'];
        
        $requirements = [
            'Looking for a property with modern amenities and good location',
            'Need a spacious property with parking space',
            'Prefer a property near schools and shopping centers',
            'Interested in properties with sea view or waterfront access',
            'Looking for investment opportunity in growing area',
            'Need property with high ROI potential',
            'Prefer newly constructed or recently renovated properties',
            'Looking for property with good public transport access',
            'Need property suitable for family with children',
            'Interested in properties with garden or outdoor space',
            'Looking for commercial property in high-traffic area',
            'Need warehouse space with loading dock access',
            'Prefer properties with low maintenance costs',
            'Looking for agricultural land suitable for farming',
            'Need office space in business district with parking',
        ];

        $leads = Lead::all();
        
        foreach ($leads as $index => $lead) {
            $propertyType = $propertyTypes[array_rand($propertyTypes)];
            $propertyCategory = $propertyCategories[array_rand($propertyCategories)];
            $asking = $askingOptions[array_rand($askingOptions)];
            
            // Generate budget based on property type and asking
            $baseBudget = match($propertyType) {
                'apartment' => rand(150000, 500000),
                'villa' => rand(400000, 1200000),
                'shop' => rand(200000, 600000),
                'land' => rand(100000, 800000),
                'office' => rand(250000, 700000),
                'warehouse' => rand(300000, 900000),
                'building' => rand(800000, 2000000),
                default => rand(200000, 600000),
            };
            
            // If renting, divide by 100 to get monthly rent
            $budget = $asking === 'rent' ? round($baseBudget / 100, 2) : $baseBudget;
            
            // Generate rooms and bathrooms based on property type
            $rooms = match($propertyType) {
                'apartment' => rand(1, 4),
                'villa' => rand(3, 6),
                'shop' => 0,
                'land' => 0,
                'office' => rand(1, 10),
                'warehouse' => 0,
                'building' => rand(5, 20),
                default => rand(1, 4),
            };
            
            $bathrooms = match($propertyType) {
                'apartment' => rand(1, 3),
                'villa' => rand(2, 5),
                'shop' => rand(1, 2),
                'land' => 0,
                'office' => rand(1, 5),
                'warehouse' => rand(1, 3),
                'building' => rand(3, 10),
                default => rand(1, 2),
            };
            
            $lead->update([
                'requirements' => $requirements[$index % count($requirements)],
                'budget' => $budget,
                'property_type' => $propertyType,
                'property_category' => $propertyCategory,
                'no_of_rooms' => $rooms,
                'no_of_bathrooms' => $bathrooms,
                'asking' => $asking,
            ]);
            
            $this->command->info("Updated lead #{$lead->id}: {$lead->full_name} - {$propertyType} ({$asking})");
        }
        
        $this->command->info("\nSuccessfully updated " . $leads->count() . " leads with requirements data!");
    }
}

