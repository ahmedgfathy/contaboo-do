<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user to assign properties
        $user = User::first();

        if (!$user) {
            $this->command->warn('No users found. Please create a user first.');
            return;
        }

        $properties = [
            [
                'title' => 'Luxury Downtown Apartment',
                'description' => 'Beautiful modern apartment in the heart of downtown with stunning city views. Features high-end finishes, floor-to-ceiling windows, and access to premium building amenities including gym, pool, and 24/7 concierge service.',
                'type' => 'apartment',
                'status' => 'available',
                'listing_type' => 'sale',
                'price' => 450000.00,
                'area' => 120.50,
                'bedrooms' => 2,
                'bathrooms' => 2,
                'parking_spaces' => 1,
                'floor_number' => 15,
                'total_floors' => 25,
                'year_built' => 2020,
                'furnished' => true,
                'amenities' => ['Pool', 'Gym', 'Security', 'Parking', 'Elevator', 'AC', 'Internet'],
                'address' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'country' => 'USA',
                'postal_code' => '10001',
                'latitude' => 40.7506,
                'longitude' => -73.9936,
                'reference_number' => 'PROP-2025-001',
                'notes' => 'Prime location near subway stations, restaurants, and shopping centers. Perfect for professionals or investors.',
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'title' => 'Spacious Family Villa with Garden',
                'description' => 'Charming 4-bedroom villa in a quiet suburban neighborhood. Features a large backyard garden, modern kitchen, spacious living areas, and a two-car garage. Perfect for families looking for comfort and space.',
                'type' => 'villa',
                'status' => 'available',
                'listing_type' => 'rent',
                'price' => 3500.00,
                'area' => 280.00,
                'bedrooms' => 4,
                'bathrooms' => 3,
                'parking_spaces' => 2,
                'floor_number' => null,
                'total_floors' => 2,
                'year_built' => 2015,
                'furnished' => false,
                'amenities' => ['Garden', 'Parking', 'AC', 'Heating', 'Internet', 'Pet Friendly'],
                'address' => '456 Oak Avenue',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'country' => 'USA',
                'postal_code' => '90001',
                'latitude' => 34.0522,
                'longitude' => -118.2437,
                'reference_number' => 'PROP-2025-002',
                'notes' => 'Excellent schools nearby. Recently renovated kitchen and bathrooms. Large backyard perfect for kids and pets.',
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'title' => 'Modern Office Space in Business District',
                'description' => 'Premium office space in the central business district. Open floor plan with modern infrastructure, high-speed internet, conference rooms, and dedicated parking. Ideal for tech startups or established businesses.',
                'type' => 'office',
                'status' => 'pending',
                'listing_type' => 'sale',
                'price' => 850000.00,
                'area' => 350.00,
                'bedrooms' => null,
                'bathrooms' => 4,
                'parking_spaces' => 10,
                'floor_number' => 8,
                'total_floors' => 20,
                'year_built' => 2018,
                'furnished' => true,
                'amenities' => ['Security', 'Parking', 'Elevator', 'AC', 'Heating', 'Internet'],
                'address' => '789 Business Boulevard',
                'city' => 'Chicago',
                'state' => 'IL',
                'country' => 'USA',
                'postal_code' => '60601',
                'latitude' => 41.8781,
                'longitude' => -87.6298,
                'reference_number' => 'PROP-2025-003',
                'notes' => 'Recently upgraded building systems. Close to public transportation and major highways. Flexible lease terms available.',
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
        ];

        foreach ($properties as $propertyData) {
            Property::create($propertyData);
            $this->command->info("Created property: {$propertyData['title']}");
        }

        $this->command->info('Successfully seeded 3 example properties!');
    }
}
