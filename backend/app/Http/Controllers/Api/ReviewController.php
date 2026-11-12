<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $this->seedDefaultsIfEmpty();

        $reviews = Review::orderBy('id')->get()->map(function ($r) {
            return [
                'id' => $r->review_code,
                'db_id' => $r->id,
                'name' => $r->name,
                'role' => $r->role,
                'location' => $r->location,
                'project' => $r->project,
                'quote' => $r->quote,
                'rating' => $r->rating,
                'isActive' => $r->is_active,
            ];
        });

        return response()->json($reviews)
            ->header('Cache-Control', 'public, max-age=180, stale-while-revalidate=900');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:160',
            'role' => 'nullable|string|max:160',
            'location' => 'nullable|string|max:160',
            'project' => 'nullable|string|max:160',
            'quote' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $code = $request->input('id') ?: ('REV-' . rand(100, 9999));

        $review = Review::updateOrCreate(
            ['review_code' => $code],
            [
                'name' => $validated['name'],
                'role' => $validated['role'] ?? 'Verified Client',
                'location' => $validated['location'] ?? 'Islamabad',
                'project' => $validated['project'] ?? 'TopLinkers Advisory',
                'quote' => $validated['quote'],
                'rating' => $validated['rating'] ?? 5,
                'is_active' => true,
            ]
        );

        return response()->json([
            'id' => $review->review_code,
            'db_id' => $review->id,
            'name' => $review->name,
            'role' => $review->role,
            'location' => $review->location,
            'project' => $review->project,
            'quote' => $review->quote,
            'rating' => $review->rating,
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $review = Review::where('review_code', $id)->orWhere('id', $id)->firstOrFail();

        $review->update([
            'name' => $request->input('name', $review->name),
            'role' => $request->input('role', $review->role),
            'location' => $request->input('location', $review->location),
            'project' => $request->input('project', $review->project),
            'quote' => $request->input('quote', $review->quote),
            'rating' => $request->input('rating', $review->rating),
        ]);

        return response()->json([
            'id' => $review->review_code,
            'name' => $review->name,
            'role' => $review->role,
            'location' => $review->location,
            'project' => $review->project,
            'quote' => $review->quote,
            'rating' => $review->rating,
        ]);
    }

    public function destroy(string $id)
    {
        $review = Review::where('review_code', $id)->orWhere('id', $id)->first();
        if ($review) {
            $review->delete();
        }

        return response()->json(['deleted' => true]);
    }

    private function seedDefaultsIfEmpty(): void
    {
        if (Review::count() > 0) {
            return;
        }

        $defaults = [
            [
                'review_code' => 'REV-101',
                'name' => 'Chaudhry Naveed Sahi',
                'role' => 'Home Buyer — Gulberg Greens',
                'location' => 'Gulberg Greens, Islamabad',
                'project' => 'TopCity-1 (10 Marla)',
                'quote' => 'Buying our 10 Marla residential plot in TopCity through TopLinkers was seamless. Their team handled CDA & RDA verification, transfer paperwork, and on-ground demarcation within three working days. Honest and transparent advisory throughout!',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-102',
                'name' => 'Engr. Salman Qureshi',
                'role' => 'Property Investor & Landlord',
                'location' => 'Sector I-12, Islamabad',
                'project' => 'PHA Flats & 20kW Solar',
                'quote' => 'I invested in PHA Sector I-12 and I-16 flats on installments based on TopLinkers analysis. The capital appreciation has exceeded expectations, and their construction and solar team also handled our villa electrification with top-tier Tier-1 panels.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-103',
                'name' => 'Dr. Sarah Mansoor',
                'role' => 'Property Seller — Overseas UK',
                'location' => 'Manchester, United Kingdom',
                'project' => 'Faisal Town Phase 2 File',
                'quote' => 'As an overseas Pakistani living in the UK, finding reliable real estate representation in Islamabad can be daunting. TopLinkers sold my FT-II commercial file at market-leading price and transferred proceeds securely. Truly dependable!',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-104',
                'name' => 'Malik Jahangir Awan',
                'role' => 'Commercial Investor — Dubai UAE',
                'location' => 'Dubai, United Arab Emirates',
                'project' => 'PECHS Islamabad (1 Kanal)',
                'quote' => 'Secured a prime 1 Kanal Moqa Ka Plot on Kashmir Highway through TopLinkers. Physical demarcation and registry transfer were completed without me having to travel to Pakistan. 100% genuine advisory for overseas investors.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-105',
                'name' => 'Brig. (R) Tariq Mahmud',
                'role' => 'Villa Owner — DHA Phase 2',
                'location' => 'DHA Phase 2, Islamabad',
                'project' => 'Turnkey Luxury Villa Construction',
                'quote' => 'TopLinkers completed our 1 Kanal turnkey designer villa in DHA with exceptional structural integrity, Amreli 60-grade steel, and imported finishings on time and within agreed budget. Their engineering standards are second to none.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-106',
                'name' => 'Zainab & Hammad Farooq',
                'role' => 'Vacation Suite Investors',
                'location' => 'DHA Phase 5, Lahore',
                'project' => 'Harsukh Nathia Gali Suites',
                'quote' => 'Booked a 2-Bed scenic vacation suite in Harsukh Nathia Gali with only 15% down payment. The panoramic pine valley views and hands-off rental management model make it our highest-yield real estate asset.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-107',
                'name' => 'Farhan Bashir',
                'role' => 'Factory Owner — I-9 Industrial',
                'location' => 'Industrial Area, Islamabad',
                'project' => '50kW Commercial Solar Net Metering',
                'quote' => 'Our industrial electricity bills dropped to near zero within two billing cycles. TopLinkers solar engineering division processed our IESCO Green Meter paperwork smoothly without bureaucratic delays.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-108',
                'name' => 'Khurram Shahzad',
                'role' => 'Overseas Pakistani — USA',
                'location' => 'Dallas, Texas, USA',
                'project' => 'Airport Green Garden (AGG) Plot',
                'quote' => 'TopLinkers transparent video inspection and live title verification gave me full confidence to invest in Airport Green Garden. Their consultants are thoroughly professional and genuinely look after overseas clients.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-109',
                'name' => 'Syed Kashif Raza',
                'role' => 'Apartment Owner — PHA I-12',
                'location' => 'Sector I-12, Islamabad',
                'project' => 'PHA Sector I-12/1 Type D Flat',
                'quote' => 'Secured a 2-bed Type D apartment in Sector I-12/1 through TopLinkers. Their team assisted with balloting verification, file transfer at PHA head office, and possession inspection. Highly recommended!',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-110',
                'name' => 'Mrs. Ayesha Haroon',
                'role' => 'Government Officer (BPS-19)',
                'location' => 'Sector G-11, Islamabad',
                'project' => 'PHA G-11 Officers Residencia',
                'quote' => 'TopLinkers facilitated the purchase of our 3-bed executive apartment in G-11 Officers Residencia. Legal clearance and allotment documentation were handled flawlessly.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-111',
                'name' => 'Raja Daniyal Kayani',
                'role' => 'Resident Owner — Sector I-16',
                'location' => 'Rawalpindi',
                'project' => 'PHA I-16/3 Ready G+6 Flat',
                'quote' => 'Moved into our 2-bed apartment in Sector I-16/3 last month. TopLinkers ensured active elevator testing, electricity connection, and hassle-free registry transfer.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-112',
                'name' => 'Major (R) Waqas Abbasi',
                'role' => 'Overseas Investor — Riyadh KSA',
                'location' => 'Riyadh, Saudi Arabia',
                'project' => 'Banu Hafeez Complex 3-Bed',
                'quote' => 'Investing from Saudi Arabia was worry-free thanks to TopLinkers. They provided 4K walk-through videos and secured our 3-bed corner flat in Banu Hafeez Complex at developer price.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-113',
                'name' => 'Dr. Bilal Ahmad Khan',
                'role' => 'Consultant Physician',
                'location' => 'Sector F-10, Islamabad',
                'project' => 'TopCity-1 Kunar Heights Flat',
                'quote' => 'TopLinkers advised us to book a 2-bed luxury flat in Kunar Heights TopCity-1. Their market timing analysis was spot-on, generating solid capital gain within 9 months.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-114',
                'name' => 'Mian Usman Rafiq',
                'role' => 'Textile Exporter — Faisalabad',
                'location' => 'Faisalabad & Islamabad',
                'project' => 'Gulberg Greens Opal Square Suite',
                'quote' => 'Purchased a 2-bed corporate executive suite in Opal Square, Gulberg Greens. TopLinkers structured an easy installment schedule and ensured CDA compliance.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-115',
                'name' => 'Hajra Begum',
                'role' => 'Retired School Principal',
                'location' => 'Chaklala Scheme 3, Rawalpindi',
                'project' => 'Kurri Road PHA Residencia',
                'quote' => 'TopLinkers consultants are honest, polite, and extremely thorough with land registry details. My Kurri Road apartment transfer went without a single hitch.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-116',
                'name' => 'Engr. Noman Siddiqui',
                'role' => 'Software Architect — London UK',
                'location' => 'London, United Kingdom',
                'project' => 'Faisal Town F-17 Executive Flat',
                'quote' => 'I managed my real estate investment completely remotely from London. TopLinkers digital verification, legal checks, and banking coordination were world-class.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-117',
                'name' => 'Tariq Mehmood Gondal',
                'role' => 'Commercial Plaza Owner',
                'location' => 'Sector G-11 Markaz, Islamabad',
                'project' => 'Al Hameed Plaza G-11 Office',
                'quote' => 'Purchased a prime 2nd floor corporate office in Al Hameed Plaza G-11 Markaz. Rental yield is steady at 8.5% per annum. TopLinkers is our trusted lifetime advisor.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-118',
                'name' => 'Chaudhry Arshad Gujjar',
                'role' => 'Agricultural Landlord',
                'location' => 'Gujar Khan & Islamabad',
                'project' => 'PECHS Islamabad Block K Flat',
                'quote' => 'Bought a 2-bed flat in PECHS Islamabad near the airport for my university-going children. TopLinkers gave accurate advice on upcoming road infrastructure.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-119',
                'name' => 'Dr. Maimoona Siddiqui',
                'role' => 'Professor & Researcher',
                'location' => 'Sector H-8, Islamabad',
                'project' => '15kW Residential On-Grid Solar',
                'quote' => 'TopLinkers solar engineering team installed our 15kW Longi/Huawei system in just four days. IESCO net-metering green meter was energized within 3 weeks.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-120',
                'name' => 'Sheikh Imran Nazir',
                'role' => 'Auto Parts Distributor',
                'location' => 'Sector I-10 Industrial, Islamabad',
                'project' => '30kW Commercial Hybrid Solar',
                'quote' => 'Installed a 30kW hybrid solar system for our central warehouse. Power reliability has been 100% through summer peak load. Outstanding engineering support.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-121',
                'name' => 'Hassan Raza Jafri',
                'role' => 'Bank Vice President',
                'location' => 'Bahria Town Phase 7, Rawalpindi',
                'project' => 'Turnkey 10 Marla Luxury House',
                'quote' => 'TopLinkers constructed our 10 Marla modern house from grey structure to turnkey interior finishing. Quality of Grade-60 steel, plumbing, and woodwork exceeded all standards.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-122',
                'name' => 'Mrs. Samina Parveen',
                'role' => 'Overseas Pakistani — Toronto Canada',
                'location' => 'Toronto, Canada',
                'project' => 'Banu Hafeez 2-Bed Master Suite',
                'quote' => 'TopLinkers verified the land title, handled the power of attorney paperwork, and secured our apartment in Banu Hafeez Complex seamlessly while I stayed in Canada.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-123',
                'name' => 'Col. (R) Iftikhar Dara',
                'role' => 'Defense Housing Resident',
                'location' => 'DHA Phase 5, Islamabad',
                'project' => 'TopCity-1 Block C Plot Demarcation',
                'quote' => 'Their on-ground survey team physically pegged and demarcated our 1 Kanal plot in TopCity-1 with digital GPS coordinates. Professionalism at its peak.',
                'rating' => 5,
            ],
            [
                'review_code' => 'REV-124',
                'name' => 'Adeel Munir',
                'role' => 'Tech Entrepreneur — Silicon Valley',
                'location' => 'San Jose, California, USA',
                'project' => 'Harsukh Nathia Gali Holiday Suite',
                'quote' => 'The guaranteed rental program and panoramic mountain views in Nathia Gali made this an effortless investment from California. TopLinkers executed everything seamlessly.',
                'rating' => 5,
            ],
        ];

        foreach ($defaults as $item) {
            Review::firstOrCreate(['review_code' => $item['review_code']], $item);
        }
    }
}
