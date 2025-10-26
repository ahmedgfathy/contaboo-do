<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lead;
use Carbon\Carbon;

class ArabicLeadsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leads = [
            [
                'first_name' => 'أحمد',
                'last_name' => 'محمد',
                'email' => 'ahmed.mohamed.ar@example.com',
                'phone' => '+20 100 123 4567',
                'company' => 'شركة النجاح للتطوير العقاري',
                'job_title' => 'مدير المشتريات',
                'status' => 'new',
                'source' => 'website',
                'city' => 'القاهرة',
                'notes' => 'مهتم بشراء شقة في التجمع الخامس، الميزانية 3 مليون جنيه',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'فاطمة',
                'last_name' => 'حسن',
                'email' => 'fatima.hassan.ar@example.com',
                'phone' => '+20 101 234 5678',
                'company' => 'مجموعة الأمل التجارية',
                'job_title' => 'مديرة تنفيذية',
                'status' => 'qualified',
                'source' => 'referral',
                'city' => 'الإسكندرية',
                'notes' => 'تبحث عن فيلا على البحر، ميزانية مفتوحة',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'محمود',
                'last_name' => 'عبدالله',
                'email' => 'mahmoud.abdullah.ar@example.com',
                'phone' => '+20 102 345 6789',
                'company' => 'شركة الهرم للاستثمار',
                'job_title' => 'رئيس مجلس الإدارة',
                'status' => 'qualified',
                'source' => 'social_media',
                'city' => 'الجيزة',
                'notes' => 'يرغب في شراء مكتب إداري في منطقة المهندسين',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'نورا',
                'last_name' => 'إبراهيم',
                'email' => 'nora.ibrahim.ar@example.com',
                'phone' => '+20 103 456 7890',
                'company' => 'شركة الريادة للتكنولوجيا',
                'job_title' => 'مديرة الموارد البشرية',
                'status' => 'contacted',
                'source' => 'email_campaign',
                'city' => 'الشروق',
                'notes' => 'مهتمة بشقة استوديو للاستثمار في العاصمة الإدارية',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'خالد',
                'last_name' => 'سعيد',
                'email' => 'khaled.saeed.ar@example.com',
                'phone' => '+20 104 567 8901',
                'company' => 'مؤسسة النور للتجارة',
                'job_title' => 'صاحب العمل',
                'status' => 'new',
                'source' => 'cold_call',
                'city' => 'المنصورة',
                'notes' => 'يبحث عن أرض للبناء في منطقة حدائق أكتوبر',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'ليلى',
                'last_name' => 'أحمد',
                'email' => 'laila.ahmed.ar@example.com',
                'phone' => '+20 105 678 9012',
                'company' => 'شركة الأفق للاستشارات',
                'job_title' => 'مستشارة تسويق',
                'status' => 'won',
                'source' => 'website',
                'city' => 'المعادي',
                'notes' => 'اشترت شقة في المعادي الجديدة بقيمة 2.5 مليون جنيه',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'يوسف',
                'last_name' => 'علي',
                'email' => 'youssef.ali.ar@example.com',
                'phone' => '+20 106 789 0123',
                'company' => 'شركة الفجر للمقاولات',
                'job_title' => 'مهندس معماري',
                'status' => 'qualified',
                'source' => 'referral',
                'city' => 'الزمالك',
                'notes' => 'مهتم بشراء بنتهاوس في الزمالك، ميزانية 10 مليون جنيه',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'مريم',
                'last_name' => 'حسين',
                'email' => 'mariam.hussein.ar@example.com',
                'phone' => '+20 107 890 1234',
                'company' => 'مجموعة السلام الطبية',
                'job_title' => 'طبيبة',
                'status' => 'contacted',
                'source' => 'social_media',
                'city' => 'الشيخ زايد',
                'notes' => 'تبحث عن فيلا في الشيخ زايد للسكن العائلي',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'عمر',
                'last_name' => 'فتحي',
                'email' => 'omar.fathy.ar@example.com',
                'phone' => '+20 108 901 2345',
                'company' => 'شركة الوادي للصناعات',
                'job_title' => 'مدير عام',
                'status' => 'new',
                'source' => 'cold_call',
                'city' => 'العبور',
                'notes' => 'يرغب في شراء مصنع أو مخزن في مدينة العبور',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'first_name' => 'سارة',
                'last_name' => 'مصطفى',
                'email' => 'sara.mostafa.ar@example.com',
                'phone' => '+20 109 012 3456',
                'company' => 'شركة النيل للسياحة',
                'job_title' => 'مديرة مبيعات',
                'status' => 'qualified',
                'source' => 'email_campaign',
                'city' => 'الساحل الشمالي',
                'notes' => 'مهتمة بشراء شاليه في الساحل الشمالي للاستثمار',
                'assigned_to' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];

        foreach ($leads as $lead) {
            Lead::create($lead);
        }
    }
}
