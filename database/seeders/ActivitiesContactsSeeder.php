<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\Property;
use App\Models\Opportunity;
use App\Models\User;

class ActivitiesContactsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        
        // Create Contacts
        $contacts = [
            [
                'type' => 'client',
                'company_name' => 'Smith & Associates',
                'contact_person' => 'Robert Smith',
                'email' => 'robert@smithassociates.com',
                'phone' => '+1-555-0201',
                'mobile' => '+1-555-0202',
                'website' => 'https://smithassociates.com',
                'address' => '123 Business Street',
                'city' => 'New York',
                'state' => 'NY',
                'country' => 'USA',
                'postal_code' => '10001',
                'status' => 'active',
                'notes' => 'High-value client interested in luxury properties.',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'partner',
                'company_name' => 'Premium Construction Ltd',
                'contact_person' => 'Maria Garcia',
                'email' => 'maria@premiumconst.com',
                'phone' => '+1-555-0203',
                'mobile' => '+1-555-0204',
                'website' => 'https://premiumconstruction.com',
                'address' => '456 Industrial Ave',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'country' => 'USA',
                'postal_code' => '90001',
                'status' => 'active',
                'notes' => 'Preferred construction partner for renovations.',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'vendor',
                'company_name' => 'Quality Furniture Co',
                'contact_person' => 'James Wilson',
                'email' => 'james@qualityfurniture.com',
                'phone' => '+1-555-0205',
                'mobile' => '+1-555-0206',
                'website' => 'https://qualityfurniture.com',
                'address' => '789 Furniture Row',
                'city' => 'Chicago',
                'state' => 'IL',
                'country' => 'USA',
                'postal_code' => '60601',
                'status' => 'active',
                'notes' => 'Provides furniture for property staging.',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'client',
                'company_name' => 'Tech Startups Inc',
                'contact_person' => 'Sarah Johnson',
                'email' => 'sarah@techstartups.com',
                'phone' => '+1-555-0207',
                'mobile' => '+1-555-0208',
                'website' => 'https://techstartups.com',
                'address' => '321 Innovation Drive',
                'city' => 'San Francisco',
                'state' => 'CA',
                'country' => 'USA',
                'postal_code' => '94102',
                'status' => 'active',
                'notes' => 'Looking for office space for growing team.',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'partner',
                'company_name' => 'Legal & Associates',
                'contact_person' => 'Michael Brown',
                'email' => 'michael@legalassociates.com',
                'phone' => '+1-555-0209',
                'mobile' => '+1-555-0210',
                'website' => 'https://legalassociates.com',
                'address' => '654 Law Street',
                'city' => 'Boston',
                'state' => 'MA',
                'country' => 'USA',
                'postal_code' => '02101',
                'status' => 'active',
                'notes' => 'Handles all legal documentation for property transactions.',
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
        ];

        foreach ($contacts as $contactData) {
            Contact::create($contactData);
        }

        // Get some entities to relate activities to
        $lead = Lead::first();
        $property = Property::first();
        $opportunity = Opportunity::first();
        $contact = Contact::first();

        // Create Activities
        $activities = [
            [
                'type' => 'call',
                'subject' => 'Initial contact with John Smith',
                'description' => 'Discussed property requirements and budget expectations.',
                'due_date' => now()->subDays(2),
                'completed_at' => now()->subDays(2),
                'priority' => 'high',
                'status' => 'completed',
                'duration' => '30 minutes',
                'related_type' => $lead ? 'App\\Models\\Lead' : null,
                'related_id' => $lead?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'meeting',
                'subject' => 'Property viewing - Downtown Villa',
                'description' => 'Schedule property showing with potential buyer.',
                'due_date' => now()->addDays(3),
                'priority' => 'high',
                'status' => 'pending',
                'duration' => '1 hour',
                'location' => 'Property Location',
                'related_type' => $property ? 'App\\Models\\Property' : null,
                'related_id' => $property?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'task',
                'subject' => 'Prepare contract for opportunity',
                'description' => 'Draft purchase agreement and send for legal review.',
                'due_date' => now()->addDays(5),
                'priority' => 'urgent',
                'status' => 'in_progress',
                'related_type' => $opportunity ? 'App\\Models\\Opportunity' : null,
                'related_id' => $opportunity?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'email',
                'subject' => 'Follow-up on partnership proposal',
                'description' => 'Send detailed partnership terms and benefits.',
                'due_date' => now()->addDays(1),
                'priority' => 'medium',
                'status' => 'pending',
                'related_type' => $contact ? 'App\\Models\\Contact' : null,
                'related_id' => $contact?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'call',
                'subject' => 'Check-in call with lead',
                'description' => 'Follow up on property preferences and timeline.',
                'due_date' => now()->subDay(),
                'priority' => 'high',
                'status' => 'pending',
                'duration' => '15 minutes',
                'related_type' => $lead ? 'App\\Models\\Lead' : null,
                'related_id' => $lead?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'task',
                'subject' => 'Update property photos',
                'description' => 'Arrange professional photography for new listing.',
                'due_date' => now()->addDays(7),
                'priority' => 'low',
                'status' => 'pending',
                'related_type' => $property ? 'App\\Models\\Property' : null,
                'related_id' => $property?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'note',
                'subject' => 'Market research notes',
                'description' => 'Comparable properties in the area are selling 10-15% above asking price. Strong seller market.',
                'priority' => 'low',
                'status' => 'completed',
                'completed_at' => now(),
                'related_type' => $property ? 'App\\Models\\Property' : null,
                'related_id' => $property?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
            [
                'type' => 'meeting',
                'subject' => 'Negotiation meeting',
                'description' => 'Final price negotiation with buyer.',
                'due_date' => now()->addDays(10),
                'priority' => 'urgent',
                'status' => 'pending',
                'duration' => '2 hours',
                'location' => 'Office Conference Room',
                'related_type' => $opportunity ? 'App\\Models\\Opportunity' : null,
                'related_id' => $opportunity?->id,
                'assigned_to' => $user->id,
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ],
        ];

        foreach ($activities as $activityData) {
            Activity::create($activityData);
        }

        $this->command->info('✓ Created 5 contacts (clients, partners, vendors)');
        $this->command->info('✓ Created 8 activities (calls, meetings, tasks, emails, notes)');
    }
}
