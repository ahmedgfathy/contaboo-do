<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Opportunity;
use App\Models\Lead;
use App\Models\Property;
use Carbon\Carbon;

class ArabicOpportunitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some leads and properties for relationships
        $leads = Lead::limit(10)->pluck('id')->toArray();
        $properties = Property::limit(10)->pluck('id')->toArray();

        $opportunities = [
            [
                'title' => 'بيع شقة في التجمع الخامس',
                'lead_id' => $leads[0] ?? null,
                'property_id' => $properties[0] ?? null,
                'value' => 3500000,
                'probability' => 80,
                'stage' => 'negotiation',
                'expected_close_date' => Carbon::now()->addDays(15),
                'actual_close_date' => null,
                'type' => 'sale',
                'status' => 'active',
                'notes' => 'العميل مهتم جداً، جاري التفاوض على السعر والشروط',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'تأجير فيلا في الشيخ زايد',
                'lead_id' => $leads[1] ?? null,
                'property_id' => $properties[1] ?? null,
                'value' => 96000,
                'probability' => 60,
                'stage' => 'proposal',
                'expected_close_date' => Carbon::now()->addDays(30),
                'actual_close_date' => null,
                'type' => 'lease',
                'status' => 'active',
                'notes' => 'تم إرسال العرض للعميل، في انتظار الموافقة',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'بيع بنتهاوس في الزمالك',
                'lead_id' => $leads[2] ?? null,
                'property_id' => $properties[3] ?? null,
                'value' => 12000000,
                'probability' => 90,
                'stage' => 'contract',
                'expected_close_date' => Carbon::now()->addDays(7),
                'actual_close_date' => null,
                'type' => 'sale',
                'status' => 'active',
                'notes' => 'مرحلة التعاقد النهائي، جاري تجهيز الأوراق القانونية',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'شراء أرض في العاصمة الإدارية',
                'lead_id' => $leads[3] ?? null,
                'property_id' => $properties[5] ?? null,
                'value' => 5000000,
                'probability' => 50,
                'stage' => 'qualification',
                'expected_close_date' => Carbon::now()->addDays(45),
                'actual_close_date' => null,
                'type' => 'sale',
                'status' => 'active',
                'notes' => 'العميل يبحث عن أرض للاستثمار، جاري عرض عدة خيارات',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'تأجير مكتب في المهندسين',
                'lead_id' => $leads[4] ?? null,
                'property_id' => $properties[8] ?? null,
                'value' => 180000,
                'probability' => 70,
                'stage' => 'negotiation',
                'expected_close_date' => Carbon::now()->addDays(20),
                'actual_close_date' => null,
                'type' => 'lease',
                'status' => 'active',
                'notes' => 'شركة ناشئة تبحث عن مكتب، جاري التفاوض على مدة العقد',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'بيع شاليه في الساحل الشمالي',
                'lead_id' => $leads[5] ?? null,
                'property_id' => $properties[7] ?? null,
                'value' => 2800000,
                'probability' => 100,
                'stage' => 'closed_won',
                'expected_close_date' => Carbon::now()->subDays(5),
                'actual_close_date' => Carbon::now()->subDays(3),
                'type' => 'sale',
                'status' => 'won',
                'notes' => 'تم إتمام الصفقة بنجاح، العميل راضٍ جداً',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'بيع دوبلكس في 6 أكتوبر',
                'lead_id' => $leads[6] ?? null,
                'property_id' => $properties[4] ?? null,
                'value' => 4200000,
                'probability' => 40,
                'stage' => 'proposal',
                'expected_close_date' => Carbon::now()->addDays(35),
                'actual_close_date' => null,
                'type' => 'sale',
                'status' => 'active',
                'notes' => 'العميل يفكر في الأمر، سيعود للرد خلال أسبوع',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'تأجير استوديو في الشروق',
                'lead_id' => $leads[7] ?? null,
                'property_id' => $properties[6] ?? null,
                'value' => 42000,
                'probability' => 0,
                'stage' => 'closed_lost',
                'expected_close_date' => Carbon::now()->subDays(10),
                'actual_close_date' => Carbon::now()->subDays(8),
                'type' => 'lease',
                'status' => 'lost',
                'notes' => 'لم يتم إتمام الصفقة',
                'lost_reason' => 'العميل وجد خيار أرخص في منطقة أخرى',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'بيع شقة في المعادي',
                'lead_id' => $leads[8] ?? null,
                'property_id' => $properties[2] ?? null,
                'value' => 96000,
                'probability' => 85,
                'stage' => 'negotiation',
                'expected_close_date' => Carbon::now()->addDays(12),
                'actual_close_date' => null,
                'type' => 'lease',
                'status' => 'active',
                'notes' => 'عائلة صغيرة مهتمة جداً، جاري الاتفاق على تفاصيل العقد',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'بيع محل تجاري في وسط البلد',
                'lead_id' => $leads[9] ?? null,
                'property_id' => $properties[9] ?? null,
                'value' => 3500000,
                'probability' => 100,
                'stage' => 'closed_won',
                'expected_close_date' => Carbon::now()->subDays(15),
                'actual_close_date' => Carbon::now()->subDays(12),
                'type' => 'sale',
                'status' => 'won',
                'notes' => 'صفقة ناجحة، تم التعاقد وتسليم المحل',
                'lost_reason' => null,
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];

        foreach ($opportunities as $opportunity) {
            Opportunity::create($opportunity);
        }
    }
}
