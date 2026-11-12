<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lead;
use App\Models\MarketRate;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Chief Admin
        User::updateOrCreate(
            ['email' => 'toplinkers@gmail.com'],
            [
                'name' => 'TopLinkers Executive',
                'password' => Hash::make('lock5816'),
            ]
        );

        // 2. Seed Initial CRM Leads
        $leads = [
            [
                'lead_code' => 'LD-101',
                'name' => 'Malik Jahangir Awan',
                'phone' => '0334-9522157',
                'email' => 'jahangir.awan@gmail.com',
                'city' => 'Dubai (Overseas Client)',
                'division' => 'Plots',
                'project' => 'PECHS Islamabad (1 Kanal Moqa Plot)',
                'budget' => 'PKR 1.85 Cr',
                'status' => 'New',
                'priority' => 'High',
                'source' => 'Moqa Ka Plot Inquire Button',
                'notes' => 'Wants immediate demarcation and video tour. Ready for full cash payment within 1 week.'
            ],
            [
                'lead_code' => 'LD-102',
                'name' => 'Dr. Sarah Mansoor',
                'phone' => '0334-9522157',
                'email' => 'sarah.mansoor@nhs.net',
                'city' => 'Manchester, UK',
                'division' => 'Installment Plots',
                'project' => 'Faisal Town Phase 2 (10 Marla)',
                'budget' => 'PKR 55.5 Lac',
                'status' => 'Contacted',
                'priority' => 'High',
                'source' => 'Installment Schedule Modal',
                'notes' => 'Sent 4.5-year quarterly schedule via WhatsApp. Requested file verification from Zedem office.'
            ],
            [
                'lead_code' => 'LD-103',
                'name' => 'Engr. Salman Qureshi',
                'phone' => '0332-4004884',
                'email' => 'salman.q@engr.pk',
                'city' => 'G-11, Islamabad',
                'division' => 'Solar',
                'project' => '20kW Villa System + IESCO Net Metering',
                'budget' => 'PKR 22 Lac',
                'status' => 'Site Visit Scheduled',
                'priority' => 'High',
                'source' => 'Solar Inquiry Form',
                'notes' => 'Engineer scheduled for rooftop structure inspection on Wednesday 11:00 AM.'
            ],
            [
                'lead_code' => 'LD-104',
                'name' => 'Hammad Farooq',
                'phone' => '0321-9876543',
                'email' => 'hammad.f@hotmail.com',
                'city' => 'DHA Phase 5, Lahore',
                'division' => 'Harsukh',
                'project' => '2-Bed Luxury Vacation Suite (Nathia Gali)',
                'budget' => 'PKR 1.45 Cr',
                'status' => 'New',
                'priority' => 'High',
                'source' => 'Nathia Gali Floating Curiosity Teaser',
                'notes' => 'Interested in guaranteed rental returns and snow season occupancy.'
            ],
        ];

        foreach ($leads as $l) {
            Lead::updateOrCreate(['lead_code' => $l['lead_code']], $l);
        }

        // 3. Seed Live Market Rates
        MarketRate::updateOrCreate(
            ['key' => 'live_rates'],
            [
                'payload' => [
                    'moqaPlots' => [
                        'pechs' => [
                            'name' => 'PECHS Islamabad',
                            'tag' => 'Near New Airport',
                            'm5' => 'PKR 25 - 45 Lac',
                            'm10' => 'PKR 65 - 95 Lac',
                            'k1' => 'PKR 1.25 - 1.95 Cr'
                        ],
                        'topCity' => [
                            'name' => 'TopCity-1',
                            'tag' => 'Airport Metro Link',
                            'm5' => 'PKR 65 - 90 Lac',
                            'm10' => 'PKR 1.2 - 2.5 Cr',
                            'k1' => 'PKR 2.2 - 3.4 Cr'
                        ],
                        'agg' => [
                            'name' => 'Airport Green Garden (AGG)',
                            'tag' => 'Direct Interchange',
                            'm5' => 'PKR 45 - 65 Lac',
                            'm10' => 'PKR 85 - 1.25 Cr',
                            'k1' => 'PKR 1.7 - 2.4 Cr'
                        ],
                        'topResidencia' => [
                            'name' => 'Top Residencia',
                            'tag' => 'Executive Enclave',
                            'm5' => 'PKR 40 - 60 Lac',
                            'm10' => 'PKR 80 - 1.2 Cr',
                            'k1' => 'PKR 1.6 - 2.2 Cr'
                        ]
                    ],
                    'installmentPlans' => [
                        'faisalTown' => [
                            'name' => 'Faisal Town Phase 2',
                            'duration' => '4.5-Year Easy Plan (18 Quarterly)',
                            'm5' => ['down' => 'PKR 5.9 Lac', 'total' => 'PKR 34.5 Lac', 'quarterly' => 'PKR 130,000'],
                            'm8' => ['down' => 'PKR 8.2 Lac', 'total' => 'PKR 46.5 Lac', 'quarterly' => 'PKR 175,000'],
                            'm10' => ['down' => 'PKR 9.9 Lac', 'total' => 'PKR 55.5 Lac', 'quarterly' => 'PKR 215,000'],
                            'k1' => ['down' => 'PKR 14.5 Lac', 'total' => 'PKR 98.5 Lac', 'quarterly' => 'PKR 395,000']
                        ],
                        'blueWorld' => [
                            'name' => 'Blue World City',
                            'duration' => '3 & 4-Year Flexible Plans',
                            'm5' => ['down' => 'PKR 1.49 Lac', 'total' => 'PKR 14.9 Lac', 'monthly' => 'PKR 14,900'],
                            'm7' => ['down' => 'PKR 2.45 Lac', 'total' => 'PKR 24.5 Lac', 'monthly' => 'PKR 24,500'],
                            'm10' => ['down' => 'PKR 3.25 Lac', 'total' => 'PKR 32.5 Lac', 'monthly' => 'PKR 32,500'],
                            'k1' => ['down' => 'PKR 5.8 Lac', 'total' => 'PKR 58.0 Lac', 'monthly' => 'PKR 58,000']
                        ]
                    ],
                    'phaFlats' => [
                        'i16_typeE' => ['name' => 'Sector I-16/3 — Type E (912 Sq Ft)', 'rate' => 'PKR 55 - 72 Lac', 'specs' => '2 Bed • 2 Bath • G+6 Completed & Active Resale'],
                        'i16_typeB' => ['name' => 'Sector I-16/3 — Type B (1,496 Sq Ft)', 'rate' => 'PKR 1.15 - 1.45 Cr', 'specs' => '3 Bed • 3 Bath • Servant Quarter • G+6 Completed'],
                        'i12_typeDE' => ['name' => 'Sector I-12/1 — Type D & Type E', 'rate' => 'PKR 58 - 82 Lac', 'specs' => '700–900+ Sq Ft (2-bed/2-bath) • 3,200 Units Nearing Completion'],
                        'kurri_g11' => ['name' => 'G-11 / Kurri Road — Executive Residencia', 'rate' => 'PKR 1.55 - 2.25 Cr', 'specs' => 'Multi-Bedroom • Senior Officers (BPS 20–22) & Select Public Quotas']
                    ],
                    'phaProjectsTable' => [
                        [
                            'location' => 'Sector I-16/3',
                            'categories' => 'Type E (2-Bed) & Type B (3-Bed)',
                            'specs' => 'Type E is ~912 sq. ft. (2 beds, 2 baths). Type B is ~1,496 sq. ft. (3 beds, servant quarter). G+6 blocks with completed/active resale market.',
                            'badge' => 'Active Resale Market'
                        ],
                        [
                            'location' => 'Sector I-12/1',
                            'categories' => 'Type D & Type E',
                            'specs' => 'Roughly 700–900+ sq. ft. layouts (2-bed/2-bath and slightly larger configurations). Comprises 3,200 units nearing completion, with limited re-balloted units.',
                            'badge' => '3,200 Units'
                        ],
                        [
                            'location' => 'G-11 / Kurri Road',
                            'categories' => 'Executive / Officers Residencia',
                            'specs' => 'Larger multi-bedroom apartments. Primarily targeted at senior officers (BPS 20–22) and select general public quotas.',
                            'badge' => 'Officers Residencia'
                        ]
                    ],
                    'solarPackages' => [
                        'kw10' => ['name' => '10kW Residential Home', 'savings' => 'PKR 70k–90k / mo', 'quote' => 'PKR 1,150,000'],
                        'kw20' => ['name' => '20kW Villa & Farmhouse', 'savings' => 'PKR 160k–200k / mo', 'quote' => 'PKR 2,150,000'],
                        'kw50' => ['name' => '50kW Commercial Plaza', 'savings' => 'PKR 400k–550k / mo', 'quote' => 'PKR 4,950,000']
                    ]
                ]
            ]
        );

        // 4. Seed 2 CEOs/Co-Founders, Real Estate Agents & Engineers
        TeamMember::truncate();
        $team = [
            [
                'member_code' => 'ceo-1',
                'name' => 'Executive CEO & Founder',
                'role' => 'CEO & Founder — Real Estate & Investments',
                'category' => 'ceo',
                'tag' => 'Founder & Chief Executive',
                'experience' => '15+ Years',
                'phone' => '0334-9522157',
                'whatsapp' => '923349522157',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
                'quote' => 'At TopLinkers, our mission is straightforward: absolute transparency in property documentation, verified CDA/RDA titles, and rewarding real estate investments across Islamabad & Rawalpindi.',
                'bio' => 'Leading land acquisitions, TopCity-1, PECHS, Faisal Town Phase 2, and Harsukh Nathia Gali luxury developments.',
                'address' => '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'ceo-2',
                'name' => 'Co-Founder & Managing CEO',
                'role' => 'Co-Founder — Construction & Solar Engineering',
                'category' => 'ceo',
                'tag' => 'Co-Founder & Managing CEO',
                'experience' => '14+ Years',
                'phone' => '0332-4004884',
                'whatsapp' => '923324004884',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
                'quote' => 'Precision engineering in turnkey residential construction and high-yield solar net metering execution defines every project we deliver at TopLinkers.',
                'bio' => 'Overseeing turnkey villa builds, PHA apartments trading, corporate joint ventures, and commercial solar infrastructure.',
                'address' => '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'agent-1',
                'name' => 'Muhammad Tariq',
                'role' => 'Principal Property Consultant',
                'category' => 'agent',
                'tag' => 'Senior Agent',
                'experience' => '12+ Years',
                'phone' => '+92 334 9522157',
                'whatsapp' => '923349522157',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
                'bio' => 'Senior property investment consultant with 12+ years in Islamabad CDA sectors, Moqa Ka Plots (PECHS, AGG, TopCity-1), and Gulberg Greens commercial plazas.',
                'address' => 'Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'agent-2',
                'name' => 'Kamran Akhtar',
                'role' => 'Senior Sales Specialist — PHA & Installments',
                'category' => 'agent',
                'tag' => 'Sales Specialist',
                'experience' => '9+ Years',
                'phone' => '+92 334 9522157',
                'whatsapp' => '923349522157',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                'bio' => 'Specialized in PHA apartments (I-12, I-16), Faisal Town Phase II (FT-II), Blue World City files, and fast verified transfers.',
                'address' => 'Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'agent-3',
                'name' => 'Zainab Rehman',
                'role' => 'Overseas Client & Corporate Advisor',
                'category' => 'agent',
                'tag' => 'Overseas Desk',
                'experience' => '7+ Years',
                'phone' => '+92 334 9522157',
                'whatsapp' => '923349522157',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                'bio' => 'Dedicated advisor for overseas Pakistani investors (UK, UAE, USA) seeking secure plots, Harsukh Nathia Gali suites, and luxury villas.',
                'address' => 'Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'eng-1',
                'name' => 'Engr. Asif Mahmood',
                'role' => 'Chief Civil & Turnkey Construction Engineer',
                'category' => 'engineer',
                'tag' => 'PEC Registered Civil Eng.',
                'experience' => '11+ Years',
                'phone' => '+92 332 4004884',
                'whatsapp' => '923324004884',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                'bio' => 'PEC-licensed structural & turnkey construction engineer leading A+ grey structure quality, BOQ estimation, and modern villa finishing.',
                'address' => 'Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
            [
                'member_code' => 'eng-2',
                'name' => 'Engr. Salman Qureshi',
                'role' => 'Lead Solar & IESCO Net-Metering Engineer',
                'category' => 'engineer',
                'tag' => 'PEC Registered Solar Eng.',
                'experience' => '8+ Years',
                'phone' => '+92 332 4004884',
                'whatsapp' => '923324004884',
                'email' => 'toplinkers12@gmail.com',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                'bio' => 'Specialist in 10kW, 20kW, and 50kW Tier-1 hybrid & on-grid solar installations with turnkey IESCO green net-metering clearance.',
                'address' => 'Al Hameed Plaza, G-11 Markaz, Islamabad',
            ],
        ];

        foreach ($team as $member) {
            TeamMember::updateOrCreate(['member_code' => $member['member_code']], $member);
        }
    }
}
