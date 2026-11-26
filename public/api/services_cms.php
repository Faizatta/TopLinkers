<?php
/**
 * TopLinkers Services CMS Engine (SQLite + PHP)
 * Handles schema auto-migration, initial content seeding, and full CRUD APIs for:
 * - service_categories
 * - services
 * - service_features
 * - service_galleries
 * - service_sections
 * - service_section_blocks
 * - service_seo
 * - services-upload (image upload, validation & cleanup)
 */

declare(strict_types=1);

if (!function_exists('ensureServicesCmsSchema')) {
    function ensureServicesCmsSchema(PDO $pdo): void {
        static $initialized = false;
        if ($initialized) return;
        $initialized = true;

        $pdo->exec('PRAGMA foreign_keys = ON;');

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS service_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                description TEXT DEFAULT '',
                icon TEXT DEFAULT 'Squares2X2Icon',
                display_order INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                category_id INTEGER REFERENCES service_categories(id) ON DELETE SET NULL,
                division_key TEXT DEFAULT 'custom',
                short_description TEXT DEFAULT '',
                full_description TEXT DEFAULT '',
                main_image TEXT DEFAULT '',
                main_image_alt TEXT DEFAULT '',
                icon TEXT DEFAULT 'BuildingOffice2Icon',
                benefits TEXT DEFAULT '[]',
                specifications TEXT DEFAULT '[]',
                location_details TEXT DEFAULT '',
                pricing_info TEXT DEFAULT '',
                additional_info TEXT DEFAULT '{}',
                cta_text TEXT DEFAULT 'Inquire Now',
                cta_link TEXT DEFAULT '/contact',
                whatsapp_number TEXT DEFAULT '923349522157',
                whatsapp_text TEXT DEFAULT '',
                related_service_ids TEXT DEFAULT '[]',
                display_order INTEGER DEFAULT 0,
                status TEXT DEFAULT 'published',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS service_features (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                icon TEXT DEFAULT 'CheckCircleIcon',
                highlight_badge TEXT DEFAULT '',
                display_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS service_galleries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
                image_url TEXT NOT NULL,
                alt_text TEXT DEFAULT '',
                caption TEXT DEFAULT '',
                display_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS service_sections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                section_key TEXT NOT NULL UNIQUE,
                section_type TEXT NOT NULL DEFAULT 'custom',
                title TEXT DEFAULT '',
                subtitle TEXT DEFAULT '',
                description TEXT DEFAULT '',
                badge_text TEXT DEFAULT '',
                background_image TEXT DEFAULT '',
                hero_image TEXT DEFAULT '',
                image_alt TEXT DEFAULT '',
                cta_text TEXT DEFAULT '',
                cta_link TEXT DEFAULT '',
                secondary_cta_text TEXT DEFAULT '',
                secondary_cta_link TEXT DEFAULT '',
                contact_phone TEXT DEFAULT '',
                whatsapp_number TEXT DEFAULT '',
                whatsapp_text TEXT DEFAULT '',
                extra_json TEXT DEFAULT '{}',
                display_order INTEGER DEFAULT 0,
                is_enabled INTEGER DEFAULT 1,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS service_section_blocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                section_id INTEGER NOT NULL REFERENCES service_sections(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                subtitle TEXT DEFAULT '',
                badge TEXT DEFAULT '',
                description TEXT DEFAULT '',
                image_url TEXT DEFAULT '',
                image_alt TEXT DEFAULT '',
                icon TEXT DEFAULT '',
                link_text TEXT DEFAULT '',
                link_url TEXT DEFAULT '',
                whatsapp_text TEXT DEFAULT '',
                meta_json TEXT DEFAULT '{}',
                display_order INTEGER DEFAULT 0,
                is_enabled INTEGER DEFAULT 1
            );

            CREATE TABLE IF NOT EXISTS service_seo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                entity_type TEXT NOT NULL DEFAULT 'page',
                entity_id INTEGER NOT NULL DEFAULT 0,
                seo_title TEXT DEFAULT '',
                meta_description TEXT DEFAULT '',
                canonical_url TEXT DEFAULT '',
                og_title TEXT DEFAULT '',
                og_description TEXT DEFAULT '',
                og_image TEXT DEFAULT '',
                structured_data_json TEXT DEFAULT '',
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(entity_type, entity_id)
            );

            CREATE INDEX IF NOT EXISTS idx_services_status_order ON services(status, display_order);
            CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
            CREATE INDEX IF NOT EXISTS idx_service_features_sid ON service_features(service_id, display_order);
            CREATE INDEX IF NOT EXISTS idx_service_galleries_sid ON service_galleries(service_id, display_order);
            CREATE INDEX IF NOT EXISTS idx_service_sections_order ON service_sections(is_enabled, display_order);
            CREATE INDEX IF NOT EXISTS idx_service_blocks_sid ON service_section_blocks(section_id, display_order);
        ");

        seedServicesCmsIfEmpty($pdo);
    }
}

if (!function_exists('seedServicesCmsIfEmpty')) {
    function seedServicesCmsIfEmpty(PDO $pdo): void {
        $serviceCount = (int)$pdo->query("SELECT COUNT(*) FROM services")->fetchColumn();
        $sectionCount = (int)$pdo->query("SELECT COUNT(*) FROM service_sections")->fetchColumn();
        if ($serviceCount > 0 && $sectionCount > 0) return;

        $pdo->beginTransaction();
        try {
            if ($serviceCount === 0) {
                $catStmt = $pdo->prepare("INSERT OR IGNORE INTO service_categories (name, slug, description, icon, display_order, is_active) VALUES (?, ?, ?, ?, ?, 1)");
                $categories = [
                    ['Real Estate Advisory', 'real-estate', 'Verified CDA/RDA property brokerage and legal title diligence.', 'BuildingOffice2Icon', 1],
                    ['Residential Plots', 'residential-plots', 'On-ground possession Moqa plots and installment files.', 'MapIcon', 2],
                    ['Apartments & PHA Flats', 'apartments-flats', 'PHA I-12 & I-16 apartments, Faisal Heights F-18, and Harsukh suites.', 'BuildingOffice2Icon', 3],
                    ['Turnkey Construction', 'construction', 'PEC-licensed grey structure and turnkey luxury villas.', 'WrenchScrewdriverIcon', 4],
                    ['Solar Net Metering', 'solar', 'Tier-1 solar EPC and IESCO bi-directional green metering.', 'SunIcon', 5]
                ];
                foreach ($categories as $c) {
                    $catStmt->execute($c);
                }

                $catIds = [];
                foreach ($pdo->query("SELECT id, slug FROM service_categories")->fetchAll() as $row) {
                    $catIds[$row['slug']] = (int)$row['id'];
                }

                $svcStmt = $pdo->prepare("INSERT INTO services (
                    title, slug, category_id, division_key, short_description, full_description,
                    main_image, main_image_alt, icon, benefits, specifications, location_details,
                    pricing_info, additional_info, cta_text, cta_link, whatsapp_number, whatsapp_text,
                    related_service_ids, display_order, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')");

                $featStmt = $pdo->prepare("INSERT INTO service_features (service_id, title, description, icon, highlight_badge, display_order) VALUES (?, ?, ?, ?, ?, ?)");
                $galStmt = $pdo->prepare("INSERT INTO service_galleries (service_id, image_url, alt_text, caption, display_order) VALUES (?, ?, ?, ?, ?)");
                $seoStmt = $pdo->prepare("INSERT OR REPLACE INTO service_seo (entity_type, entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image) VALUES ('service', ?, ?, ?, ?, ?, ?, ?)");

                $seedServices = [
                    [
                        'title' => 'Real Estate Advisory & Brokerage',
                        'slug' => 'real-estate-advisory',
                        'cat' => 'real-estate',
                        'division_key' => 'real-estate',
                        'short_description' => 'Verified CDA/RDA plot registry checks, Token Biyana escrow, and transparent title verification across Islamabad & Rawalpindi.',
                        'full_description' => '<p>TopLinkers provides institutional real estate advisory for local homeowners, investors, and overseas Pakistanis. Every listing undergoes preliminary verification through CDA, RDA, and FGEHA records before any transaction.</p>',
                        'main_image' => '/images/hero-real-estate.webp',
                        'main_image_alt' => 'TopLinkers Real Estate Advisory Islamabad',
                        'icon' => 'BuildingOffice2Icon',
                        'benefits' => ['100% Title & NOC Verification', 'Secure Token Biyana Escrow', 'Overseas POA Facilitation', 'Zero Hidden Commission'],
                        'specifications' => ['CDA & RDA Layout Scrutiny', 'Computerized Biometric Transfer', 'Market Feasibility & ROI Appraisal'],
                        'location_details' => 'G-11 Markaz HQ serving Islamabad & Rawalpindi',
                        'pricing_info' => 'Standard 1% Advisory / 0% Overseas Deals',
                        'additional_info' => ['guideRoute' => '/services/real-estate', 'divisionBadge' => 'Core Advisory'],
                        'cta_text' => 'Explore Real Estate Guide',
                        'cta_link' => '/services/real-estate',
                        'whatsapp_number' => '923349522157',
                        'whatsapp_text' => 'Hello TopLinkers, I would like verified real estate advisory in Islamabad.',
                        'display_order' => 1,
                        'features' => [
                            ['CDA & RDA Record Verification', 'Direct verification of allotment letters, NDCs, and site plans.', 'ShieldCheckIcon', 'Verified', 1],
                            ['Overseas Concierge Desk', 'Live 4K video site tours and embassy Power of Attorney handling.', 'GlobeAltIcon', 'Overseas VIP', 2],
                            ['Escrow & Legal Documentation', 'Tripartite sale agreements witnessed by licensed legal counsel.', 'DocumentCheckIcon', '100% Safe', 3]
                        ],
                        'gallery' => [
                            ['/images/hero-real-estate.webp', 'Islamabad Real Estate Advisory', 'CDA & RDA Verified Real Estate Sectors', 1],
                            ['/images/hero-moqa-plot.webp', 'TopCity-1 Possession Plots', 'Airport Corridor Investment Plots', 2]
                        ],
                        'seo' => [
                            'Real Estate Advisory & Property Brokerage | TopLinkers',
                            'Verified property advisory in Islamabad. Buy, sell, and verify CDA/RDA sector files with complete legal diligence.',
                            'https://toplinkersgroup.com/services/real-estate'
                        ]
                    ],
                    [
                        'title' => 'Residential Plots & Installments',
                        'slug' => 'residential-plots-installments',
                        'cat' => 'residential-plots',
                        'division_key' => 'plot',
                        'short_description' => 'Segregated land portfolios: immediate on-ground physical possession (TopCity-1, AGG, PECHS) and 4.5-year installment files (Faisal Town Phase 2).',
                        'full_description' => '<p>Choose between 100% cash-ready Moqa Ka Plots with immediate demarcation and possession or flexible 42-month installment plans in master-planned communities near New Islamabad International Airport.</p>',
                        'main_image' => '/images/hero-moqa-plot.webp',
                        'main_image_alt' => 'Prime Moqa Ka Plot in TopCity-1',
                        'icon' => 'MapIcon',
                        'benefits' => ['Immediate Physical Possession (Moqa)', '42 Monthly Installment Plans', '15% Lump-Sum Discount Options', 'Direct Airport & M-2 Access'],
                        'specifications' => ['Sizes: 5 Marla, 8 Marla, 10 Marla, 1 Kanal, 2 Kanal', 'RDA & CDA Compliant Societies', 'Underground Electricity, Gas & Water'],
                        'location_details' => 'TopCity-1, PECHS, Airport Green Garden (AGG), Faisal Town Phase 2',
                        'pricing_info' => 'PKR 24 Lac – PKR 5.50 Cr',
                        'additional_info' => ['guideRoute' => '/services/residential-plots', 'divisionBadge' => 'Division 01'],
                        'cta_text' => 'Dedicated Plots Portal',
                        'cta_link' => '/services/residential-plots',
                        'whatsapp_number' => '923349522157',
                        'whatsapp_text' => 'Hello TopLinkers, I am interested in Cash Moqa Plots and Installment Plots.',
                        'display_order' => 2,
                        'features' => [
                            ['TopCity-1 Moqa Ka Plots', 'Immediate possession plots adjoining New Islamabad Airport.', 'MapPinIcon', 'Cash Moqa', 1],
                            ['PECHS Islamabad', 'Budget-friendly 5, 7, 10 Marla & 1 Kanal plots near Airport.', 'CheckBadgeIcon', 'RDA NOC', 2],
                            ['Faisal Town Phase 2 (FT-II)', '4.5-year installment schedule (42 monthly) with 15% lump-sum discount.', 'CalendarDaysIcon', 'Installments', 3],
                            ['Airport Green Garden (AGG)', 'Prime airport corridor residential plots with swift transfer.', 'SparklesIcon', 'Ready Transfer', 4]
                        ],
                        'gallery' => [
                            ['/images/hero-moqa-plot.webp', 'TopCity-1 Moqa Plot', 'TopCity-1 Demarcated Possession Plot', 1],
                            ['/images/plots/agg-plot-1.webp', 'Airport Green Garden Plots', 'AGG Developed Roads & Infrastructure', 2]
                        ],
                        'seo' => [
                            'Residential & Commercial Plots Islamabad | TopLinkers Deals',
                            'Explore verified residential plots in TopCity-1, PECHS, and Faisal Town Phase 2 with cash possession and CDA/RDA approvals.',
                            'https://toplinkersgroup.com/services/residential-plots'
                        ]
                    ],
                    [
                        'title' => 'Apartments & PHA Flats',
                        'slug' => 'apartments-pha-flats',
                        'cat' => 'apartments-flats',
                        'division_key' => 'flats',
                        'short_description' => 'PHA government-allocated flats in Sector I-12 & Sector I-16 alongside premier luxury apartments at Faisal Heights (F-18) and Harsukh Residencies (Nathia Gali).',
                        'full_description' => '<p>From verified Pakistan Housing Authority (PHA) Sector I-12 and I-16 apartments to luxury residential towers in Faisal Town (F-18) and alpine vacation suites in Nathia Gali with 20%+ tourist rental yield.</p>',
                        'main_image' => '/images/hero-pha-flats.webp',
                        'main_image_alt' => 'PHA Apartments Sector I-12 and I-16 Islamabad',
                        'icon' => 'BuildingOffice2Icon',
                        'benefits' => ['Verified PHA Allotment Transfers (I-12 & I-16)', 'Immediate Possession G+6 Blocks in I-16/3', 'Faisal Heights F-18 Luxury Towers', 'Harsukh 20%+ Annual Rental ROI'],
                        'specifications' => ['PHA Type B, D & E (710 – 1,496 Sq.Ft)', 'Faisal Heights Studio to 4-Bed Lofts', 'Harsukh Studio, 1-Bed & 2-Bed Suites'],
                        'location_details' => 'Sector I-12/1, Sector I-16/3, Faisal Town F-18, Kuza Gali (Nathia Gali)',
                        'pricing_info' => 'PKR 55 Lac – PKR 3.38 Cr',
                        'additional_info' => ['guideRoute' => '/services/apartments-flats', 'divisionBadge' => 'Division 02'],
                        'cta_text' => 'Dedicated Flats Portal',
                        'cta_link' => '/services/apartments-flats',
                        'whatsapp_number' => '923349522157',
                        'whatsapp_text' => 'Hello TopLinkers, I am interested in PHA Flats (I-12, I-16) and Luxury Apartments.',
                        'display_order' => 3,
                        'features' => [
                            ['PHA Sector I-12/1 Apartments', '3,200 units nearing handover (Type D & E 2-Bed with dual elevators).', 'BuildingOfficeIcon', '3,200 Units', 1],
                            ['PHA Sector I-16/3 Ready Flats', '100% ready physical possession G+6 blocks with active utilities.', 'CheckCircleIcon', '100% Ready', 2],
                            ['Faisal Heights (Faisal Town F-18)', '1 Million Sq.Ft luxury residential tower by Zedem / Faisal Town.', 'SparklesIcon', 'Luxury F-18', 3],
                            ['Harsukh Residencies Nathia Gali', '8,200 ft mountain-view furnished suites on 3-year installments.', 'HomeModernIcon', '20%+ ROI', 4]
                        ],
                        'gallery' => [
                            ['/images/pha/pha-i12-ext-1.webp', 'PHA Sector I-12 Flats', 'Sector I-12/1 Apartment Towers', 1],
                            ['/images/pha/pha-i16-ext-1.webp', 'PHA Sector I-16 Flats', 'Sector I-16/3 Completed Blocks', 2],
                            ['/images/faisal-heights/fh-building.webp', 'Faisal Heights F-18', 'Faisal Heights Luxury Tower (F-18)', 3],
                            ['/images/hero-harsukh.webp', 'Harsukh Nathia Gali', 'Harsukh Residencies Pine Valley View', 4]
                        ],
                        'seo' => [
                            'PHA Flats & Luxury Apartments Islamabad | TopLinkers Deals',
                            'Buy ready and under-construction PHA apartments in I-12 and I-16, Faisal Heights F-18, and Harsukh Nathia Gali luxury suites.',
                            'https://toplinkersgroup.com/services/apartments-flats'
                        ]
                    ],
                    [
                        'title' => 'Turnkey Architectural & Civil Construction',
                        'slug' => 'turnkey-construction',
                        'cat' => 'construction',
                        'division_key' => 'construction',
                        'short_description' => 'PEC-licensed grey structure and full A+ turnkey designer villa construction, commercial plazas, and architectural blueprints in Islamabad & Rawalpindi.',
                        'full_description' => '<p>Engineered by PEC-registered civil engineers using 60-grade Mughal/Amreli steel, Bestway/Fauji OPC cement, and transparent stage-by-stage BOQ milestone billing.</p>',
                        'main_image' => '/images/hero-construction.webp',
                        'main_image_alt' => 'Turnkey Luxury Villa Construction Islamabad',
                        'icon' => 'WrenchScrewdriverIcon',
                        'benefits' => ['PEC-Licensed Civil Engineers', '60-Grade Steel & A+ Materials', 'Stage-by-Stage Milestone Billing', '1-Year Complete Structural Warranty'],
                        'specifications' => ['Grey Structure & Full Turnkey Packages', '5 Marla, 10 Marla, 1 Kanal & Commercial Plazas', '3D Elevation, Structural & MEP Drawings'],
                        'location_details' => 'Islamabad, TopCity-1, DHA, Bahria Town, Gulberg Greens, Rawalpindi',
                        'pricing_info' => 'Transparent Per-Sq.Ft Fixed BOQ Rates',
                        'additional_info' => ['guideRoute' => '/services/construction', 'divisionBadge' => 'Division 03'],
                        'cta_text' => 'Dedicated Construction Portal',
                        'cta_link' => '/services/construction',
                        'whatsapp_number' => '923324004884',
                        'whatsapp_text' => 'Hello TopLinkers, I want to inquire about Turnkey House Construction.',
                        'display_order' => 4,
                        'features' => [
                            ['Turnkey Villa Construction', 'End-to-end luxury house execution with imported tiles & woodwork.', 'HomeIcon', 'A+ Turnkey', 1],
                            ['Grey Structure Only', 'Solid foundation, brickwork, slab casting, and PPRC/PVC piping.', 'WrenchIcon', 'Milestone Pay', 2],
                            ['Commercial Plazas', 'Multi-storey plazas, basements, and corporate office towers.', 'BuildingOffice2Icon', 'Commercial', 3],
                            ['Architectural & MEP Design', 'CDA/RDA submission drawings, 3D renders, and BOQ estimation.', 'DocumentTextIcon', 'PEC Certified', 4]
                        ],
                        'gallery' => [
                            ['/images/hero-construction.webp', 'Turnkey Villa Construction', 'Modern Designer Villa Construction', 1]
                        ],
                        'seo' => [
                            'Turnkey House Construction Islamabad | TopLinkers Building',
                            'PEC-licensed turnkey home construction, modern architectural design & grey structure execution in Islamabad.',
                            'https://toplinkersgroup.com/services/construction'
                        ]
                    ],
                    [
                        'title' => 'Solar Solutions & IESCO Net Metering',
                        'slug' => 'solar-net-metering',
                        'cat' => 'solar',
                        'division_key' => 'solar',
                        'short_description' => 'Tier-1 N-Type bifacial solar systems (10kW, 20kW, 50kW+) with hybrid battery storage and turnkey IESCO bi-directional green metering.',
                        'full_description' => '<p>Earn From The Sun — generate clean Tier-1 solar electricity by day, offset your WAPDA/IESCO bill to PKR 0, and export surplus units back to the national grid with 24–36 month payback.</p>',
                        'main_image' => '/images/hero-solar.webp',
                        'main_image_alt' => 'Tier-1 Solar Net Metering Islamabad',
                        'icon' => 'SunIcon',
                        'benefits' => ['Offset Electricity Bills to PKR 0', 'IESCO Bi-Directional Green Meter Approval', '25-Year Panel Performance Warranty', '~24–36 Month Capital Payback'],
                        'specifications' => ['10kW, 20kW, 50kW+ On-Grid & Hybrid', 'Tier-1 Bifacial Panels & European/Tier-1 Inverters', 'BESS Lithium Battery Storage Options'],
                        'location_details' => 'Islamabad, Rawalpindi & IESCO Region',
                        'pricing_info' => 'Starting PKR 1,150,000 (10kW System)',
                        'additional_info' => ['guideRoute' => '/services/solar', 'divisionBadge' => 'Division 04'],
                        'cta_text' => 'Dedicated Solar Portal',
                        'cta_link' => '/services/solar',
                        'whatsapp_number' => '923324004884',
                        'whatsapp_text' => 'Hello TopLinkers Solar Desk, I want a solar net metering quote.',
                        'display_order' => 5,
                        'features' => [
                            ['10kW Residential Home', 'Saves PKR 70k–90k/mo with turnkey IESCO green meter.', 'SunIcon', 'Best Seller', 1],
                            ['20kW Villa & Farmhouse', 'Saves PKR 160k–200k/mo for large 1 Kanal+ residences.', 'BoltIcon', 'High ROI', 2],
                            ['50kW Commercial Plaza', 'Saves PKR 400k–550k/mo for plazas, offices & factories.', 'BuildingStorefrontIcon', 'Commercial', 3],
                            ['Hybrid & Lithium BESS', 'Zero load-shedding backup with smart hybrid inverters.', 'BatteryChargingIcon', '24/7 Backup', 4]
                        ],
                        'gallery' => [
                            ['/images/hero-solar.webp', 'Solar Net Metering System', 'Tier-1 Solar Installation Islamabad', 1]
                        ],
                        'seo' => [
                            'Turnkey Solar EPC & IESCO Net Metering Islamabad | TopLinkers',
                            'Engineered on-grid, hybrid & commercial solar systems (5kW to 500kW+) with Tier-1 panels & IESCO green net metering.',
                            'https://toplinkersgroup.com/services/solar'
                        ]
                    ]
                ];

                foreach ($seedServices as $s) {
                    $svcStmt->execute([
                        $s['title'],
                        $s['slug'],
                        $catIds[$s['cat']] ?? null,
                        $s['division_key'],
                        $s['short_description'],
                        $s['full_description'],
                        $s['main_image'],
                        $s['main_image_alt'],
                        $s['icon'],
                        json_encode($s['benefits']),
                        json_encode($s['specifications']),
                        $s['location_details'],
                        $s['pricing_info'],
                        json_encode($s['additional_info']),
                        $s['cta_text'],
                        $s['cta_link'],
                        $s['whatsapp_number'],
                        $s['whatsapp_text'],
                        '[]',
                        $s['display_order']
                    ]);
                    $sid = (int)$pdo->lastInsertId();

                    foreach ($s['features'] as $f) {
                        $featStmt->execute([$sid, $f[0], $f[1], $f[2], $f[3], $f[4]]);
                    }
                    foreach ($s['gallery'] as $g) {
                        $galStmt->execute([$sid, $g[0], $g[1], $g[2], $g[3]]);
                    }
                    $seoStmt->execute([
                        $sid,
                        $s['seo'][0],
                        $s['seo'][1],
                        $s['seo'][2],
                        $s['seo'][0],
                        $s['seo'][1],
                        'https://toplinkersgroup.com' . $s['main_image']
                    ]);
                }
            }

            if ($sectionCount === 0) {
                $secStmt = $pdo->prepare("INSERT INTO service_sections (
                    section_key, section_type, title, subtitle, description, badge_text,
                    background_image, hero_image, image_alt, cta_text, cta_link,
                    secondary_cta_text, secondary_cta_link, contact_phone, whatsapp_number,
                    whatsapp_text, extra_json, display_order, is_enabled
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");

                $blkStmt = $pdo->prepare("INSERT INTO service_section_blocks (
                    section_id, title, subtitle, badge, description, image_url, image_alt,
                    icon, link_text, link_url, whatsapp_text, meta_json, display_order, is_enabled
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");

                // 1. Page Hero Section
                $secStmt->execute([
                    'hero', 'hero',
                    'TopLinkers Advisory & Services',
                    'Integrated Property Solutions',
                    'From verified on-ground plots and installment files to PHA cash flats, turnkey construction, and IESCO Tier-1 solar net metering across Islamabad & Rawalpindi.',
                    'Integrated Property Solutions',
                    '', '', 'TopLinkers Services Overview',
                    'Explore Verified Listings', '/listings',
                    'Book Free Consultation', '/contact',
                    '+92-334-9522157', '923349522157',
                    'Hello TopLinkers, I would like to inquire about your Real Estate, Construction, or Solar services.',
                    json_encode(['showGuidesRow' => true, 'showDivisionTabs' => true]),
                    1
                ]);

                // 2. Services Introduction Section
                $secStmt->execute([
                    'intro', 'intro',
                    'Five Specialized Divisions Under One Roof',
                    'Institutional Diligence & Engineering Execution',
                    'Every division is led by specialized property advisors and PEC-registered engineers to guarantee legal title clarity, fixed BOQ transparency, and reliable ROI.',
                    'End-to-End Advisory',
                    '', '/images/hero-real-estate.webp', 'TopLinkers Islamabad Corporate Advisory',
                    'Meet Our Team', '/team',
                    '', '',
                    '+92-334-9522157', '923349522157', '',
                    json_encode(['layout' => 'compact']),
                    2
                ]);

                // 3. Harsukh Spotlight Banner
                $secStmt->execute([
                    'harsukh_spotlight', 'spotlight',
                    'Harsukh Residencies — Luxury Vacation & Investment Flats',
                    'Kuza Gali • Nathia Gali',
                    'Prime scenic location in Nathia Gali for memorable family holidays and high-yield tourist rental investment. Executive Studio, 1-Bed, and 2-Bed suites with panoramic pine-valley views.',
                    'HOT SELLING PROJECT',
                    '', '/images/hero-harsukh.webp', 'Harsukh Nathia Gali',
                    'Inquire Harsukh Booking', 'https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Harsukh%20luxury%20flats%20in%20Nathia%20Gali',
                    'View 3-Year Payment Schedule', '#schedule:hrsukh',
                    '+92-334-9522157', '923349522157',
                    'Hello TopLinkers, I am interested in Harsukh luxury flats in Nathia Gali',
                    json_encode(['hideOnTab' => 'solar']),
                    3
                ]);

                // 4. Division 01: Plots Section
                $secStmt->execute([
                    'division_plot', 'division',
                    'Plots: Cash Possession (Moqa) vs. Installments',
                    'Division 01 • Verified Land Portfolios',
                    'Clearly segregated land options: choose between immediate on-ground physical possession (TopCity-1, AGG, PECHS) or flexible 4.5-year installment files (Faisal Town Phase 2).',
                    'Division 01',
                    '', '', '',
                    'Dedicated Plots Guide', '/services/residential-plots',
                    '', '',
                    '+92-334-9522157', '923349522157', '',
                    json_encode(['tabKey' => 'plot']),
                    4
                ]);

                // 5. Division 02: PHA & Luxury Flats Section
                $secStmt->execute([
                    'division_flats', 'division',
                    'Flats & Apartments — PHA & Luxury Suites',
                    'Division 02 • PHA & Luxury Living',
                    'PHA apartments in Sector I-12 & Sector I-16, alongside premier luxury apartment projects: Faisal Heights (a project of Faisal Town in F-18) & Harsukh Residencies.',
                    'Division 02',
                    '', '', '',
                    'Dedicated Flats Portal', '/services/apartments-flats',
                    '', '',
                    '+92-334-9522157', '923349522157', '',
                    json_encode(['tabKey' => 'flats']),
                    5
                ]);

                // 6. Division 03: Construction Section
                $secStmt->execute([
                    'division_construction', 'division',
                    'Turnkey Architectural & Civil Construction',
                    'Division 03 • PEC-Licensed Engineering',
                    'Complete architectural design, grey structure, luxury finishing, and commercial plazas across Islamabad & Rawalpindi.',
                    'Division 03',
                    '', '', '',
                    'Dedicated Construction Portal', '/services/construction',
                    '', '',
                    '+92-332-4004884', '923324004884', '',
                    json_encode(['tabKey' => 'construction']),
                    6
                ]);

                // 7. Division 04: Solar Section
                $secStmt->execute([
                    'division_solar', 'division',
                    'Solar Systems & IESCO Net Metering',
                    'Division 04 • Earn From The Sun',
                    'Tier-1 On-Grid & Hybrid systems from 10kW to 50kW with Green Metering.',
                    'Division 04',
                    '', '/images/hero-solar.webp', 'Earn From The Sun — TopLinkers Tier-1 Solar Systems',
                    'Dedicated Solar Portal', '/services/solar',
                    'Calculate Roof ROI & Quote', '#solar-modal',
                    '+92-332-4004884', '923324004884', '',
                    json_encode(['tabKey' => 'solar']),
                    7
                ]);

                // 8. Why Choose Us Section
                $secStmt->execute([
                    'why_choose_us', 'features',
                    'Why Choose TopLinkers',
                    'Institutional Trust & Engineering Precision',
                    'We eliminate property fraud, hidden construction markups, and substandard solar equipment through verified documentation and licensed engineering.',
                    'Verified Excellence',
                    '', '', '',
                    '', '', '', '',
                    '+92-334-9522157', '923349522157', '',
                    '{}',
                    8
                ]);
                $whyId = (int)$pdo->lastInsertId();
                $whyBlocks = [
                    ['CDA & RDA Verified Titles', '100% Transparency', 'Badge', 'Every plot and flat file is verified directly at CDA, RDA, or PHA headquarters before token payment.', 'ShieldCheckIcon', 1],
                    ['PEC-Registered Engineers', 'Structural Quality', 'A+ Grade', 'Turnkey villas and commercial plazas built to seismic codes with Grade-60 steel and fixed BOQ milestones.', 'WrenchScrewdriverIcon', 2],
                    ['Tier-1 Solar EPC', 'IESCO Net Metering', '25-Yr Warranty', 'N-Type bifacial panels and smart inverters with complete IESCO bi-directional green meter licensing.', 'SunIcon', 3],
                    ['Overseas Client Desk', 'Remote Concierge', '0% Hidden Fees', '4K live video site walkthroughs, embassy POA guidance, and direct developer pricing for overseas Pakistanis.', 'GlobeAltIcon', 4]
                ];
                foreach ($whyBlocks as $b) {
                    $blkStmt->execute([$whyId, $b[0], $b[1], $b[2], $b[3], '', '', $b[4], '', '', '', '{}', $b[5]]);
                }

                // 9. Statistics & Counters Section
                $secStmt->execute([
                    'stats_counters', 'stats',
                    'Proven Track Record Across Twin Cities',
                    'By The Numbers',
                    'Over a decade of verified property transfers, turnkey builds, and clean energy installations.',
                    'Metrics',
                    '', '', '', '', '', '', '', '', '', '', '{}', 9
                ]);
                $statsId = (int)$pdo->lastInsertId();
                $statBlocks = [
                    ['15+ Years', 'Advisory Experience', 'Since 2011', 'Serving Islamabad, Rawalpindi & Nathia Gali real estate markets.', 'ClockIcon', 1],
                    ['1,000+', 'Happy Clients', 'Verified Deals', 'Local families and overseas Pakistanis across UK, UAE, USA & KSA.', 'UsersIcon', 2],
                    ['3,200+', 'PHA Units Covered', 'I-12 & I-16', 'Direct allotment transfer & verification assistance in Islamabad.', 'BuildingOffice2Icon', 3],
                    ['25 Years', 'Solar Performance', 'Tier-1 EPC', 'Backed by IESCO net metering approvals and Tier-1 OEM warranties.', 'SunIcon', 4]
                ];
                foreach ($statBlocks as $b) {
                    $blkStmt->execute([$statsId, $b[0], $b[1], $b[2], $b[3], '', '', $b[4], '', '', '', '{}', $b[5]]);
                }

                // 10. Process / Working Steps Section
                $secStmt->execute([
                    'process_steps', 'steps',
                    'How Our Advisory & Execution Process Works',
                    'Simple 4-Step Workflow',
                    'From initial inquiry to physical key handover, every step is documented and verified.',
                    'Workflow',
                    '', '', '', '', '', '', '', '', '', '', '{}', 10
                ]);
                $stepsId = (int)$pdo->lastInsertId();
                $stepBlocks = [
                    ['1. Consultation & Requirement', 'Step 01', 'Free Advisory', 'Discuss your budget, preferred sector, construction scope, or solar kW load with our senior desk.', 'ChatBubbleLeftRightIcon', 1],
                    ['2. Verification & Site Visit', 'Step 02', 'On-Ground Check', 'Physical demarcation check, CDA/RDA/PHA record scrutiny, or roof/plot engineering survey.', 'MapPinIcon', 2],
                    ['3. Transparent Agreement', 'Step 03', 'Zero Hidden Fees', 'Tripartite sale agreement, stage-wise construction BOQ, or turnkey solar EPC contract.', 'DocumentCheckIcon', 3],
                    ['4. Transfer & Handover', 'Step 04', 'Keys & Metering', 'Biometric transfer at authority HQ, turnkey home handover, or IESCO green meter activation.', 'CheckCircleIcon', 4]
                ];
                foreach ($stepBlocks as $b) {
                    $blkStmt->execute([$stepsId, $b[0], $b[1], $b[2], $b[3], '', '', $b[4], '', '', '', '{}', $b[5]]);
                }

                // 11. Contact & CTA Section
                $secStmt->execute([
                    'contact_cta', 'contact',
                    'Ready to Start Your Real Estate, Construction, or Solar Project?',
                    'G-11 Markaz Corporate Headquarters',
                    'Visit 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad or connect directly with our advisory desk on WhatsApp.',
                    'Direct Advisory Desk',
                    '', '', '',
                    'Chat on WhatsApp', 'https://wa.me/923349522157',
                    'Book Office Meeting', '/contact',
                    '+92-334-9522157', '923349522157',
                    'Hello TopLinkers, I would like to schedule a consultation.',
                    json_encode(['address' => '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad', 'email' => 'toplinkers69@gmail.com']),
                    11
                ]);
            }

            // Page-level SEO for /services
            $seoCheck = (int)$pdo->query("SELECT COUNT(*) FROM service_seo WHERE entity_type = 'page' AND entity_id = 0")->fetchColumn();
            if ($seoCheck === 0) {
                $pdo->prepare("INSERT INTO service_seo (entity_type, entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image) VALUES ('page', 0, ?, ?, ?, ?, ?, ?)")->execute([
                    'Services | Real Estate, Construction & Solar TopLinkers',
                    'Comprehensive real estate & engineering: verified plots, PHA flats, turnkey house building & solar net metering in Islamabad. Contact our team.',
                    'https://toplinkersgroup.com/services',
                    'Services | Real Estate, Construction & Solar TopLinkers',
                    'Verified plots, PHA apartments in I-12 & I-16, Faisal Heights F-18, turnkey construction & Tier-1 solar net metering in Islamabad.',
                    'https://toplinkersgroup.com/toplinkers-logo.jpg'
                ]);
            }

            $pdo->commit();
        } catch (Throwable $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            throw $e;
        }
    }
}

if (!function_exists('formatServiceRowsBatch')) {
    function formatServiceRowsBatch(PDO $pdo, array $rows): array {
        if (empty($rows)) return [];
        $ids = array_map(fn($r) => (int)$r['id'], $rows);
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        $featuresBySid = [];
        $fStmt = $pdo->prepare("SELECT id, service_id, title, description, icon, highlight_badge, display_order FROM service_features WHERE service_id IN ($placeholders) ORDER BY display_order ASC, id ASC");
        $fStmt->execute($ids);
        foreach ($fStmt->fetchAll() as $f) {
            $featuresBySid[(int)$f['service_id']][] = $f;
        }

        $galBySid = [];
        $gStmt = $pdo->prepare("SELECT id, service_id, image_url, alt_text, caption, display_order FROM service_galleries WHERE service_id IN ($placeholders) ORDER BY display_order ASC, id ASC");
        $gStmt->execute($ids);
        foreach ($gStmt->fetchAll() as $g) {
            $galBySid[(int)$g['service_id']][] = $g;
        }

        $seoBySid = [];
        $sStmt = $pdo->prepare("SELECT entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image, structured_data_json FROM service_seo WHERE entity_type = 'service' AND entity_id IN ($placeholders)");
        $sStmt->execute($ids);
        foreach ($sStmt->fetchAll() as $s) {
            $eid = (int)$s['entity_id'];
            unset($s['entity_id']);
            $seoBySid[$eid] = $s;
        }

        $defaultSeo = ['seo_title' => '', 'meta_description' => '', 'canonical_url' => '', 'og_title' => '', 'og_description' => '', 'og_image' => '', 'structured_data_json' => ''];
        return array_map(function ($row) use ($featuresBySid, $galBySid, $seoBySid, $defaultSeo) {
            $sid = (int)$row['id'];
            $row['id'] = $sid;
            $row['category_id'] = $row['category_id'] !== null ? (int)$row['category_id'] : null;
            $row['display_order'] = (int)$row['display_order'];
            $row['benefits'] = json_decode($row['benefits'] ?: '[]', true) ?: [];
            $row['specifications'] = json_decode($row['specifications'] ?: '[]', true) ?: [];
            $row['additional_info'] = json_decode($row['additional_info'] ?: '{}', true) ?: [];
            $row['related_service_ids'] = json_decode($row['related_service_ids'] ?: '[]', true) ?: [];
            $row['features'] = $featuresBySid[$sid] ?? [];
            $row['gallery'] = $galBySid[$sid] ?? [];
            $row['seo'] = $seoBySid[$sid] ?? $defaultSeo;
            return $row;
        }, $rows);
    }
}

if (!function_exists('formatServiceRow')) {
    function formatServiceRow(PDO $pdo, array $row): array {
        $batch = formatServiceRowsBatch($pdo, [$row]);
        return $batch[0];
    }
}

if (!function_exists('cleanupUnusedServiceImage')) {
    function cleanupUnusedServiceImage(PDO $pdo, string $imageUrl): void {
        if (strpos($imageUrl, '/uploads/services/') !== 0) return;
        $filename = basename($imageUrl);
        if (!$filename) return;

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM services WHERE main_image = ?");
        $stmt->execute([$imageUrl]);
        if ((int)$stmt->fetchColumn() > 0) return;

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM service_galleries WHERE image_url = ?");
        $stmt->execute([$imageUrl]);
        if ((int)$stmt->fetchColumn() > 0) return;

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM service_sections WHERE background_image = ? OR hero_image = ?");
        $stmt->execute([$imageUrl, $imageUrl]);
        if ((int)$stmt->fetchColumn() > 0) return;

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM service_section_blocks WHERE image_url = ?");
        $stmt->execute([$imageUrl]);
        if ((int)$stmt->fetchColumn() > 0) return;

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM service_seo WHERE og_image = ?");
        $stmt->execute([$imageUrl]);
        if ((int)$stmt->fetchColumn() > 0) return;

        $filePath = dirname(__DIR__) . '/uploads/services/' . $filename;
        if (is_file($filePath)) {
            @unlink($filePath);
        }
    }
}

if (!function_exists('handleServicesCmsRequest')) {
    function handleServicesCmsRequest(PDO $pdo, string $resource, ?string $subResource, array $segments, string $method, string $secretKey): bool {
        $handledResources = [
            'services',
            'service-categories',
            'service-sections',
            'service-section-blocks',
            'service-seo',
            'services-upload'
        ];
        if (!in_array($resource, $handledResources, true)) {
            return false;
        }

        ensureServicesCmsSchema($pdo);
        $isAdminQuery = isset($_GET['admin']) || isset($_GET['all']);
        $isAuthorized = verifyAuthToken($secretKey);

        // Require authentication for all mutations or admin-scoped queries
        if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true) || $isAdminQuery) {
            if (!$isAuthorized) {
                http_response_code(401);
                echo json_encode(['error' => 'Unauthorized: Valid administrator token required.']);
                return true;
            }
        }

        // 1. SERVICES CRUD
        if ($resource === 'services') {
            $action = $segments[2] ?? null;

            if ($method === 'GET') {
                if ($subResource) {
                    $stmt = $pdo->prepare("SELECT s.*, c.name AS category_name, c.slug AS category_slug FROM services s LEFT JOIN service_categories c ON s.category_id = c.id WHERE (s.slug = ? OR s.id = ?)" . ($isAuthorized && $isAdminQuery ? "" : " AND s.status = 'published'"));
                    $stmt->execute([$subResource, $subResource]);
                    $row = $stmt->fetch();
                    if (!$row) {
                        http_response_code(404);
                        echo json_encode(['error' => 'Service not found']);
                        return true;
                    }
                    echo json_encode(formatServiceRow($pdo, $row));
                    return true;
                }

                $where = ($isAuthorized && $isAdminQuery) ? "1=1" : "s.status = 'published'";
                $params = [];
                if (!empty($_GET['status']) && $isAuthorized && $isAdminQuery) {
                    $where .= " AND s.status = ?";
                    $params[] = $_GET['status'];
                }
                if (!empty($_GET['category'])) {
                    $where .= " AND (c.slug = ? OR s.category_id = ?)";
                    $params[] = $_GET['category'];
                    $params[] = $_GET['category'];
                }
                if (!empty($_GET['q'])) {
                    $where .= " AND (s.title LIKE ? OR s.short_description LIKE ? OR s.location_details LIKE ?)";
                    $q = '%' . $_GET['q'] . '%';
                    $params[] = $q;
                    $params[] = $q;
                    $params[] = $q;
                }

                $stmt = $pdo->prepare("SELECT s.*, c.name AS category_name, c.slug AS category_slug FROM services s LEFT JOIN service_categories c ON s.category_id = c.id WHERE $where ORDER BY s.display_order ASC, s.id ASC");
                $stmt->execute($params);
                $rows = $stmt->fetchAll();
                $items = formatServiceRowsBatch($pdo, $rows);

                if ($isAuthorized && $isAdminQuery) {
                    $stats = [
                        'total' => (int)$pdo->query("SELECT COUNT(*) FROM services")->fetchColumn(),
                        'published' => (int)$pdo->query("SELECT COUNT(*) FROM services WHERE status = 'published'")->fetchColumn(),
                        'draft' => (int)$pdo->query("SELECT COUNT(*) FROM services WHERE status = 'draft'")->fetchColumn(),
                        'disabled' => (int)$pdo->query("SELECT COUNT(*) FROM services WHERE status = 'disabled'")->fetchColumn(),
                        'sections_total' => (int)$pdo->query("SELECT COUNT(*) FROM service_sections")->fetchColumn(),
                        'sections_enabled' => (int)$pdo->query("SELECT COUNT(*) FROM service_sections WHERE is_enabled = 1")->fetchColumn(),
                    ];
                    echo json_encode(['services' => $items, 'stats' => $stats]);
                } else {
                    if (!headers_sent()) header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
                    echo json_encode($items);
                }
                return true;
            }

            if ($method === 'POST' && $subResource === 'reorder') {
                $in = getJsonInput();
                $orderList = $in['items'] ?? $in;
                if (!is_array($orderList)) {
                    http_response_code(422);
                    echo json_encode(['error' => 'Invalid reorder payload']);
                    return true;
                }
                $pdo->beginTransaction();
                $stmt = $pdo->prepare("UPDATE services SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                foreach ($orderList as $idx => $item) {
                    $id = is_array($item) ? (int)($item['id'] ?? 0) : (int)$item;
                    $ord = is_array($item) && isset($item['display_order']) ? (int)$item['display_order'] : ($idx + 1);
                    if ($id > 0) $stmt->execute([$ord, $id]);
                }
                $pdo->commit();
                echo json_encode(['success' => true]);
                return true;
            }

            if ($method === 'POST' && $subResource && $action === 'duplicate') {
                $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ?");
                $stmt->execute([(int)$subResource]);
                $orig = $stmt->fetch();
                if (!$orig) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Service not found']);
                    return true;
                }
                $full = formatServiceRow($pdo, $orig);
                $pdo->beginTransaction();
                $newSlug = $full['slug'] . '-copy-' . time();
                $ins = $pdo->prepare("INSERT INTO services (
                    title, slug, category_id, division_key, short_description, full_description,
                    main_image, main_image_alt, icon, benefits, specifications, location_details,
                    pricing_info, additional_info, cta_text, cta_link, whatsapp_number, whatsapp_text,
                    related_service_ids, display_order, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')");
                $ins->execute([
                    $full['title'] . ' (Copy)', $newSlug, $full['category_id'], $full['division_key'],
                    $full['short_description'], $full['full_description'], $full['main_image'],
                    $full['main_image_alt'], $full['icon'], json_encode($full['benefits']),
                    json_encode($full['specifications']), $full['location_details'], $full['pricing_info'],
                    json_encode($full['additional_info']), $full['cta_text'], $full['cta_link'],
                    $full['whatsapp_number'], $full['whatsapp_text'], json_encode($full['related_service_ids']),
                    $full['display_order'] + 1
                ]);
                $newId = (int)$pdo->lastInsertId();
                $fIns = $pdo->prepare("INSERT INTO service_features (service_id, title, description, icon, highlight_badge, display_order) VALUES (?, ?, ?, ?, ?, ?)");
                foreach ($full['features'] as $f) {
                    $fIns->execute([$newId, $f['title'], $f['description'], $f['icon'], $f['highlight_badge'], $f['display_order']]);
                }
                $gIns = $pdo->prepare("INSERT INTO service_galleries (service_id, image_url, alt_text, caption, display_order) VALUES (?, ?, ?, ?, ?)");
                foreach ($full['gallery'] as $g) {
                    $gIns->execute([$newId, $g['image_url'], $g['alt_text'], $g['caption'], $g['display_order']]);
                }
                $pdo->commit();
                $created = $pdo->prepare("SELECT * FROM services WHERE id = ?");
                $created->execute([$newId]);
                http_response_code(201);
                echo json_encode(formatServiceRow($pdo, $created->fetch()));
                return true;
            }

            if ($method === 'POST') {
                $in = getJsonInput();
                $title = trim((string)($in['title'] ?? ''));
                if ($title === '') {
                    http_response_code(422);
                    echo json_encode(['error' => 'Service title is required.']);
                    return true;
                }
                $baseSlug = !empty($in['slug']) ? slugify((string)$in['slug']) : slugify($title);
                $slug = $baseSlug;
                $check = $pdo->prepare("SELECT COUNT(*) FROM services WHERE slug = ?");
                $check->execute([$slug]);
                if ((int)$check->fetchColumn() > 0) {
                    $slug = $baseSlug . '-' . time();
                }

                $status = in_array($in['status'] ?? 'published', ['published', 'draft', 'disabled'], true) ? $in['status'] : 'published';
                $pdo->beginTransaction();
                $stmt = $pdo->prepare("INSERT INTO services (
                    title, slug, category_id, division_key, short_description, full_description,
                    main_image, main_image_alt, icon, benefits, specifications, location_details,
                    pricing_info, additional_info, cta_text, cta_link, whatsapp_number, whatsapp_text,
                    related_service_ids, display_order, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $title,
                    $slug,
                    !empty($in['category_id']) ? (int)$in['category_id'] : null,
                    trim((string)($in['division_key'] ?? $slug)),
                    (string)($in['short_description'] ?? ''),
                    (string)($in['full_description'] ?? ''),
                    (string)($in['main_image'] ?? ''),
                    (string)($in['main_image_alt'] ?? $title),
                    (string)($in['icon'] ?? 'BuildingOffice2Icon'),
                    json_encode(is_array($in['benefits'] ?? null) ? $in['benefits'] : []),
                    json_encode(is_array($in['specifications'] ?? null) ? $in['specifications'] : []),
                    (string)($in['location_details'] ?? ''),
                    (string)($in['pricing_info'] ?? ''),
                    json_encode(is_array($in['additional_info'] ?? null) ? $in['additional_info'] : []),
                    (string)($in['cta_text'] ?? 'Inquire Now'),
                    (string)($in['cta_link'] ?? '/contact'),
                    (string)($in['whatsapp_number'] ?? '923349522157'),
                    (string)($in['whatsapp_text'] ?? ''),
                    json_encode(is_array($in['related_service_ids'] ?? null) ? $in['related_service_ids'] : []),
                    (int)($in['display_order'] ?? 0),
                    $status
                ]);
                $sid = (int)$pdo->lastInsertId();

                if (!empty($in['features']) && is_array($in['features'])) {
                    $fStmt = $pdo->prepare("INSERT INTO service_features (service_id, title, description, icon, highlight_badge, display_order) VALUES (?, ?, ?, ?, ?, ?)");
                    foreach ($in['features'] as $idx => $f) {
                        if (empty($f['title'])) continue;
                        $fStmt->execute([$sid, $f['title'], $f['description'] ?? '', $f['icon'] ?? 'CheckCircleIcon', $f['highlight_badge'] ?? '', (int)($f['display_order'] ?? $idx + 1)]);
                    }
                }
                if (!empty($in['gallery']) && is_array($in['gallery'])) {
                    $gStmt = $pdo->prepare("INSERT INTO service_galleries (service_id, image_url, alt_text, caption, display_order) VALUES (?, ?, ?, ?, ?)");
                    foreach ($in['gallery'] as $idx => $g) {
                        if (empty($g['image_url'])) continue;
                        $gStmt->execute([$sid, $g['image_url'], $g['alt_text'] ?? '', $g['caption'] ?? '', (int)($g['display_order'] ?? $idx + 1)]);
                    }
                }
                $seo = $in['seo'] ?? [];
                $pdo->prepare("INSERT OR REPLACE INTO service_seo (entity_type, entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image, structured_data_json, updated_at) VALUES ('service', ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)")->execute([
                    $sid,
                    $seo['seo_title'] ?? $title,
                    $seo['meta_description'] ?? ($in['short_description'] ?? ''),
                    $seo['canonical_url'] ?? '',
                    $seo['og_title'] ?? ($seo['seo_title'] ?? $title),
                    $seo['og_description'] ?? ($seo['meta_description'] ?? ''),
                    $seo['og_image'] ?? ($in['main_image'] ?? ''),
                    $seo['structured_data_json'] ?? ''
                ]);
                $pdo->commit();

                $created = $pdo->prepare("SELECT s.*, c.name AS category_name, c.slug AS category_slug FROM services s LEFT JOIN service_categories c ON s.category_id = c.id WHERE s.id = ?");
                $created->execute([$sid]);
                http_response_code(201);
                echo json_encode(formatServiceRow($pdo, $created->fetch()));
                return true;
            }

            if (($method === 'PUT' || $method === 'PATCH') && $subResource) {
                $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ? OR slug = ?");
                $stmt->execute([$subResource, $subResource]);
                $existing = $stmt->fetch();
                if (!$existing) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Service not found']);
                    return true;
                }
                $sid = (int)$existing['id'];
                $in = getJsonInput();
                $oldMainImage = (string)$existing['main_image'];

                $title = isset($in['title']) ? trim((string)$in['title']) : $existing['title'];
                if ($title === '') {
                    http_response_code(422);
                    echo json_encode(['error' => 'Service title cannot be empty.']);
                    return true;
                }
                $slug = isset($in['slug']) && trim((string)$in['slug']) !== '' ? slugify((string)$in['slug']) : $existing['slug'];
                $status = isset($in['status']) && in_array($in['status'], ['published', 'draft', 'disabled'], true) ? $in['status'] : $existing['status'];

                $oldGalleries = $pdo->prepare("SELECT image_url FROM service_galleries WHERE service_id = ?");
                $oldGalleries->execute([$sid]);
                $oldGalleryUrls = $oldGalleries->fetchAll(PDO::FETCH_COLUMN);

                $pdo->beginTransaction();
                $upd = $pdo->prepare("UPDATE services SET
                    title = ?, slug = ?, category_id = ?, division_key = ?, short_description = ?, full_description = ?,
                    main_image = ?, main_image_alt = ?, icon = ?, benefits = ?, specifications = ?, location_details = ?,
                    pricing_info = ?, additional_info = ?, cta_text = ?, cta_link = ?, whatsapp_number = ?, whatsapp_text = ?,
                    related_service_ids = ?, display_order = ?, status = ?, updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?");
                $upd->execute([
                    $title,
                    $slug,
                    array_key_exists('category_id', $in) ? ($in['category_id'] ? (int)$in['category_id'] : null) : $existing['category_id'],
                    $in['division_key'] ?? $existing['division_key'],
                    $in['short_description'] ?? $existing['short_description'],
                    $in['full_description'] ?? $existing['full_description'],
                    $in['main_image'] ?? $existing['main_image'],
                    $in['main_image_alt'] ?? $existing['main_image_alt'],
                    $in['icon'] ?? $existing['icon'],
                    isset($in['benefits']) ? json_encode($in['benefits']) : $existing['benefits'],
                    isset($in['specifications']) ? json_encode($in['specifications']) : $existing['specifications'],
                    $in['location_details'] ?? $existing['location_details'],
                    $in['pricing_info'] ?? $existing['pricing_info'],
                    isset($in['additional_info']) ? json_encode($in['additional_info']) : $existing['additional_info'],
                    $in['cta_text'] ?? $existing['cta_text'],
                    $in['cta_link'] ?? $existing['cta_link'],
                    $in['whatsapp_number'] ?? $existing['whatsapp_number'],
                    $in['whatsapp_text'] ?? $existing['whatsapp_text'],
                    isset($in['related_service_ids']) ? json_encode($in['related_service_ids']) : $existing['related_service_ids'],
                    isset($in['display_order']) ? (int)$in['display_order'] : (int)$existing['display_order'],
                    $status,
                    $sid
                ]);

                if (isset($in['features']) && is_array($in['features'])) {
                    $pdo->prepare("DELETE FROM service_features WHERE service_id = ?")->execute([$sid]);
                    $fStmt = $pdo->prepare("INSERT INTO service_features (service_id, title, description, icon, highlight_badge, display_order) VALUES (?, ?, ?, ?, ?, ?)");
                    foreach ($in['features'] as $idx => $f) {
                        if (empty($f['title'])) continue;
                        $fStmt->execute([$sid, $f['title'], $f['description'] ?? '', $f['icon'] ?? 'CheckCircleIcon', $f['highlight_badge'] ?? '', (int)($f['display_order'] ?? $idx + 1)]);
                    }
                }
                if (isset($in['gallery']) && is_array($in['gallery'])) {
                    $pdo->prepare("DELETE FROM service_galleries WHERE service_id = ?")->execute([$sid]);
                    $gStmt = $pdo->prepare("INSERT INTO service_galleries (service_id, image_url, alt_text, caption, display_order) VALUES (?, ?, ?, ?, ?)");
                    foreach ($in['gallery'] as $idx => $g) {
                        if (empty($g['image_url'])) continue;
                        $gStmt->execute([$sid, $g['image_url'], $g['alt_text'] ?? '', $g['caption'] ?? '', (int)($g['display_order'] ?? $idx + 1)]);
                    }
                }
                if (isset($in['seo']) && is_array($in['seo'])) {
                    $seo = $in['seo'];
                    $pdo->prepare("INSERT OR REPLACE INTO service_seo (entity_type, entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image, structured_data_json, updated_at) VALUES ('service', ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)")->execute([
                        $sid,
                        $seo['seo_title'] ?? '',
                        $seo['meta_description'] ?? '',
                        $seo['canonical_url'] ?? '',
                        $seo['og_title'] ?? '',
                        $seo['og_description'] ?? '',
                        $seo['og_image'] ?? '',
                        $seo['structured_data_json'] ?? ''
                    ]);
                }
                $pdo->commit();

                if ($oldMainImage && $oldMainImage !== ($in['main_image'] ?? $oldMainImage)) {
                    cleanupUnusedServiceImage($pdo, $oldMainImage);
                }
                foreach ($oldGalleryUrls as $oldUrl) {
                    cleanupUnusedServiceImage($pdo, (string)$oldUrl);
                }

                $updated = $pdo->prepare("SELECT s.*, c.name AS category_name, c.slug AS category_slug FROM services s LEFT JOIN service_categories c ON s.category_id = c.id WHERE s.id = ?");
                $updated->execute([$sid]);
                echo json_encode(formatServiceRow($pdo, $updated->fetch()));
                return true;
            }

            if ($method === 'DELETE' && $subResource) {
                $stmt = $pdo->prepare("SELECT id, main_image FROM services WHERE id = ? OR slug = ?");
                $stmt->execute([$subResource, $subResource]);
                $existing = $stmt->fetch();
                if (!$existing) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Service not found']);
                    return true;
                }
                $sid = (int)$existing['id'];
                $galStmt = $pdo->prepare("SELECT image_url FROM service_galleries WHERE service_id = ?");
                $galStmt->execute([$sid]);
                $galUrls = $galStmt->fetchAll(PDO::FETCH_COLUMN);

                $pdo->beginTransaction();
                $pdo->prepare("DELETE FROM service_seo WHERE entity_type = 'service' AND entity_id = ?")->execute([$sid]);
                $pdo->prepare("DELETE FROM services WHERE id = ?")->execute([$sid]);
                $pdo->commit();

                if (!empty($existing['main_image'])) {
                    cleanupUnusedServiceImage($pdo, (string)$existing['main_image']);
                }
                foreach ($galUrls as $url) {
                    cleanupUnusedServiceImage($pdo, (string)$url);
                }
                echo json_encode(['success' => true]);
                return true;
            }
        }

        // 2. SERVICE CATEGORIES
        if ($resource === 'service-categories') {
            if ($method === 'GET') {
                $sql = ($isAuthorized && $isAdminQuery) ? "SELECT * FROM service_categories ORDER BY display_order ASC, id ASC" : "SELECT * FROM service_categories WHERE is_active = 1 ORDER BY display_order ASC, id ASC";
                echo json_encode($pdo->query($sql)->fetchAll());
                return true;
            }
            if ($method === 'POST') {
                $in = getJsonInput();
                $name = trim((string)($in['name'] ?? ''));
                if ($name === '') {
                    http_response_code(422);
                    echo json_encode(['error' => 'Category name is required.']);
                    return true;
                }
                $slug = !empty($in['slug']) ? slugify((string)$in['slug']) : slugify($name);
                $stmt = $pdo->prepare("INSERT INTO service_categories (name, slug, description, icon, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$name, $slug, $in['description'] ?? '', $in['icon'] ?? 'Squares2X2Icon', (int)($in['display_order'] ?? 0), isset($in['is_active']) ? (int)$in['is_active'] : 1]);
                http_response_code(201);
                echo json_encode(['id' => (int)$pdo->lastInsertId(), 'name' => $name, 'slug' => $slug]);
                return true;
            }
            if (($method === 'PUT' || $method === 'PATCH') && $subResource) {
                $in = getJsonInput();
                $pdo->prepare("UPDATE service_categories SET name = COALESCE(?, name), description = COALESCE(?, description), icon = COALESCE(?, icon), display_order = COALESCE(?, display_order), is_active = COALESCE(?, is_active), updated_at = CURRENT_TIMESTAMP WHERE id = ?")
                    ->execute([$in['name'] ?? null, $in['description'] ?? null, $in['icon'] ?? null, $in['display_order'] ?? null, $in['is_active'] ?? null, (int)$subResource]);
                echo json_encode(['success' => true]);
                return true;
            }
            if ($method === 'DELETE' && $subResource) {
                $pdo->prepare("DELETE FROM service_categories WHERE id = ?")->execute([(int)$subResource]);
                echo json_encode(['success' => true]);
                return true;
            }
        }

        // 3. SERVICE SECTIONS (Page Builder)
        if ($resource === 'service-sections') {
            if ($method === 'GET') {
                $where = ($isAuthorized && $isAdminQuery) ? "1=1" : "is_enabled = 1";
                $sections = $pdo->query("SELECT * FROM service_sections WHERE $where ORDER BY display_order ASC, id ASC")->fetchAll();
                $blkSql = ($isAuthorized && $isAdminQuery)
                    ? "SELECT * FROM service_section_blocks WHERE section_id = ? ORDER BY display_order ASC, id ASC"
                    : "SELECT * FROM service_section_blocks WHERE section_id = ? AND is_enabled = 1 ORDER BY display_order ASC, id ASC";
                $blkStmt = $pdo->prepare($blkSql);
                foreach ($sections as &$sec) {
                    $sec['id'] = (int)$sec['id'];
                    $sec['display_order'] = (int)$sec['display_order'];
                    $sec['is_enabled'] = (int)$sec['is_enabled'];
                    $sec['extra_json'] = json_decode($sec['extra_json'] ?: '{}', true) ?: [];
                    $blkStmt->execute([$sec['id']]);
                    $blocks = $blkStmt->fetchAll();
                    foreach ($blocks as &$b) {
                        $b['id'] = (int)$b['id'];
                        $b['section_id'] = (int)$b['section_id'];
                        $b['display_order'] = (int)$b['display_order'];
                        $b['is_enabled'] = (int)$b['is_enabled'];
                        $b['meta_json'] = json_decode($b['meta_json'] ?: '{}', true) ?: [];
                    }
                    $sec['blocks'] = $blocks;
                }
                if (!$isAdminQuery && !headers_sent()) {
                    header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
                }
                echo json_encode($sections);
                return true;
            }

            if ($method === 'POST' && $subResource === 'reorder') {
                $in = getJsonInput();
                $orderList = $in['items'] ?? $in;
                if (!is_array($orderList)) {
                    http_response_code(422);
                    echo json_encode(['error' => 'Invalid reorder payload']);
                    return true;
                }
                $pdo->beginTransaction();
                $stmt = $pdo->prepare("UPDATE service_sections SET display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                foreach ($orderList as $idx => $item) {
                    $id = is_array($item) ? (int)($item['id'] ?? 0) : (int)$item;
                    $ord = is_array($item) && isset($item['display_order']) ? (int)$item['display_order'] : ($idx + 1);
                    if ($id > 0) $stmt->execute([$ord, $id]);
                }
                $pdo->commit();
                echo json_encode(['success' => true]);
                return true;
            }

            if ($method === 'POST') {
                $in = getJsonInput();
                $title = trim((string)($in['title'] ?? 'New Section'));
                $key = !empty($in['section_key']) ? slugify((string)$in['section_key']) : ('section-' . time());
                $stmt = $pdo->prepare("INSERT INTO service_sections (
                    section_key, section_type, title, subtitle, description, badge_text,
                    background_image, hero_image, image_alt, cta_text, cta_link,
                    secondary_cta_text, secondary_cta_link, contact_phone, whatsapp_number,
                    whatsapp_text, extra_json, display_order, is_enabled
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $key,
                    $in['section_type'] ?? 'custom',
                    $title,
                    $in['subtitle'] ?? '',
                    $in['description'] ?? '',
                    $in['badge_text'] ?? '',
                    $in['background_image'] ?? '',
                    $in['hero_image'] ?? '',
                    $in['image_alt'] ?? '',
                    $in['cta_text'] ?? '',
                    $in['cta_link'] ?? '',
                    $in['secondary_cta_text'] ?? '',
                    $in['secondary_cta_link'] ?? '',
                    $in['contact_phone'] ?? '',
                    $in['whatsapp_number'] ?? '',
                    $in['whatsapp_text'] ?? '',
                    json_encode(is_array($in['extra_json'] ?? null) ? $in['extra_json'] : []),
                    (int)($in['display_order'] ?? 99),
                    isset($in['is_enabled']) ? (int)$in['is_enabled'] : 1
                ]);
                $id = (int)$pdo->lastInsertId();
                http_response_code(201);
                echo json_encode(['id' => $id, 'section_key' => $key, 'title' => $title]);
                return true;
            }

            if (($method === 'PUT' || $method === 'PATCH') && $subResource) {
                $stmt = $pdo->prepare("SELECT * FROM service_sections WHERE id = ? OR section_key = ?");
                $stmt->execute([$subResource, $subResource]);
                $existing = $stmt->fetch();
                if (!$existing) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Section not found']);
                    return true;
                }
                $in = getJsonInput();
                $oldBg = (string)$existing['background_image'];
                $oldHero = (string)$existing['hero_image'];

                $pdo->prepare("UPDATE service_sections SET
                    section_type = ?, title = ?, subtitle = ?, description = ?, badge_text = ?,
                    background_image = ?, hero_image = ?, image_alt = ?, cta_text = ?, cta_link = ?,
                    secondary_cta_text = ?, secondary_cta_link = ?, contact_phone = ?, whatsapp_number = ?,
                    whatsapp_text = ?, extra_json = ?, display_order = ?, is_enabled = ?, updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?")->execute([
                    $in['section_type'] ?? $existing['section_type'],
                    $in['title'] ?? $existing['title'],
                    $in['subtitle'] ?? $existing['subtitle'],
                    $in['description'] ?? $existing['description'],
                    $in['badge_text'] ?? $existing['badge_text'],
                    $in['background_image'] ?? $existing['background_image'],
                    $in['hero_image'] ?? $existing['hero_image'],
                    $in['image_alt'] ?? $existing['image_alt'],
                    $in['cta_text'] ?? $existing['cta_text'],
                    $in['cta_link'] ?? $existing['cta_link'],
                    $in['secondary_cta_text'] ?? $existing['secondary_cta_text'],
                    $in['secondary_cta_link'] ?? $existing['secondary_cta_link'],
                    $in['contact_phone'] ?? $existing['contact_phone'],
                    $in['whatsapp_number'] ?? $existing['whatsapp_number'],
                    $in['whatsapp_text'] ?? $existing['whatsapp_text'],
                    isset($in['extra_json']) ? json_encode($in['extra_json']) : $existing['extra_json'],
                    isset($in['display_order']) ? (int)$in['display_order'] : (int)$existing['display_order'],
                    isset($in['is_enabled']) ? (int)$in['is_enabled'] : (int)$existing['is_enabled'],
                    (int)$existing['id']
                ]);

                if ($oldBg && $oldBg !== ($in['background_image'] ?? $oldBg)) cleanupUnusedServiceImage($pdo, $oldBg);
                if ($oldHero && $oldHero !== ($in['hero_image'] ?? $oldHero)) cleanupUnusedServiceImage($pdo, $oldHero);

                echo json_encode(['success' => true, 'id' => (int)$existing['id']]);
                return true;
            }

            if ($method === 'DELETE' && $subResource) {
                $stmt = $pdo->prepare("SELECT id, background_image, hero_image FROM service_sections WHERE id = ? OR section_key = ?");
                $stmt->execute([$subResource, $subResource]);
                $sec = $stmt->fetch();
                if ($sec) {
                    $pdo->prepare("DELETE FROM service_sections WHERE id = ?")->execute([(int)$sec['id']]);
                    if (!empty($sec['background_image'])) cleanupUnusedServiceImage($pdo, (string)$sec['background_image']);
                    if (!empty($sec['hero_image'])) cleanupUnusedServiceImage($pdo, (string)$sec['hero_image']);
                }
                echo json_encode(['success' => true]);
                return true;
            }
        }

        // 4. SECTION BLOCKS CRUD
        if ($resource === 'service-section-blocks') {
            if ($method === 'POST' && $subResource === 'reorder') {
                $in = getJsonInput();
                $orderList = $in['items'] ?? $in;
                $pdo->beginTransaction();
                $stmt = $pdo->prepare("UPDATE service_section_blocks SET display_order = ? WHERE id = ?");
                foreach ((array)$orderList as $idx => $item) {
                    $id = is_array($item) ? (int)($item['id'] ?? 0) : (int)$item;
                    $ord = is_array($item) && isset($item['display_order']) ? (int)$item['display_order'] : ($idx + 1);
                    if ($id > 0) $stmt->execute([$ord, $id]);
                }
                $pdo->commit();
                echo json_encode(['success' => true]);
                return true;
            }
            if ($method === 'POST') {
                $in = getJsonInput();
                $sid = (int)($in['section_id'] ?? 0);
                $title = trim((string)($in['title'] ?? ''));
                if ($sid <= 0 || $title === '') {
                    http_response_code(422);
                    echo json_encode(['error' => 'section_id and title are required.']);
                    return true;
                }
                $stmt = $pdo->prepare("INSERT INTO service_section_blocks (
                    section_id, title, subtitle, badge, description, image_url, image_alt,
                    icon, link_text, link_url, whatsapp_text, meta_json, display_order, is_enabled
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $sid, $title, $in['subtitle'] ?? '', $in['badge'] ?? '', $in['description'] ?? '',
                    $in['image_url'] ?? '', $in['image_alt'] ?? '', $in['icon'] ?? '',
                    $in['link_text'] ?? '', $in['link_url'] ?? '', $in['whatsapp_text'] ?? '',
                    json_encode(is_array($in['meta_json'] ?? null) ? $in['meta_json'] : []),
                    (int)($in['display_order'] ?? 0), isset($in['is_enabled']) ? (int)$in['is_enabled'] : 1
                ]);
                http_response_code(201);
                echo json_encode(['id' => (int)$pdo->lastInsertId(), 'section_id' => $sid, 'title' => $title]);
                return true;
            }
            if (($method === 'PUT' || $method === 'PATCH') && $subResource) {
                $stmt = $pdo->prepare("SELECT * FROM service_section_blocks WHERE id = ?");
                $stmt->execute([(int)$subResource]);
                $existing = $stmt->fetch();
                if (!$existing) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Block not found']);
                    return true;
                }
                $in = getJsonInput();
                $oldImg = (string)$existing['image_url'];
                $pdo->prepare("UPDATE service_section_blocks SET
                    title = ?, subtitle = ?, badge = ?, description = ?, image_url = ?, image_alt = ?,
                    icon = ?, link_text = ?, link_url = ?, whatsapp_text = ?, meta_json = ?, display_order = ?, is_enabled = ?
                    WHERE id = ?")->execute([
                    $in['title'] ?? $existing['title'],
                    $in['subtitle'] ?? $existing['subtitle'],
                    $in['badge'] ?? $existing['badge'],
                    $in['description'] ?? $existing['description'],
                    $in['image_url'] ?? $existing['image_url'],
                    $in['image_alt'] ?? $existing['image_alt'],
                    $in['icon'] ?? $existing['icon'],
                    $in['link_text'] ?? $existing['link_text'],
                    $in['link_url'] ?? $existing['link_url'],
                    $in['whatsapp_text'] ?? $existing['whatsapp_text'],
                    isset($in['meta_json']) ? json_encode($in['meta_json']) : $existing['meta_json'],
                    isset($in['display_order']) ? (int)$in['display_order'] : (int)$existing['display_order'],
                    isset($in['is_enabled']) ? (int)$in['is_enabled'] : (int)$existing['is_enabled'],
                    (int)$existing['id']
                ]);
                if ($oldImg && $oldImg !== ($in['image_url'] ?? $oldImg)) cleanupUnusedServiceImage($pdo, $oldImg);
                echo json_encode(['success' => true]);
                return true;
            }
            if ($method === 'DELETE' && $subResource) {
                $stmt = $pdo->prepare("SELECT image_url FROM service_section_blocks WHERE id = ?");
                $stmt->execute([(int)$subResource]);
                $oldImg = $stmt->fetchColumn();
                $pdo->prepare("DELETE FROM service_section_blocks WHERE id = ?")->execute([(int)$subResource]);
                if ($oldImg) cleanupUnusedServiceImage($pdo, (string)$oldImg);
                echo json_encode(['success' => true]);
                return true;
            }
        }

        // 5. PAGE & SERVICE SEO
        if ($resource === 'service-seo') {
            if ($method === 'GET') {
                $entityType = $_GET['entity_type'] ?? 'page';
                $entityId = (int)($_GET['entity_id'] ?? 0);
                $stmt = $pdo->prepare("SELECT * FROM service_seo WHERE entity_type = ? AND entity_id = ?");
                $stmt->execute([$entityType, $entityId]);
                echo json_encode($stmt->fetch() ?: ['entity_type' => $entityType, 'entity_id' => $entityId]);
                return true;
            }
            if ($method === 'PUT' || $method === 'POST') {
                $in = getJsonInput();
                $entityType = $in['entity_type'] ?? 'page';
                $entityId = (int)($in['entity_id'] ?? 0);
                $pdo->prepare("INSERT OR REPLACE INTO service_seo (entity_type, entity_id, seo_title, meta_description, canonical_url, og_title, og_description, og_image, structured_data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)")->execute([
                    $entityType,
                    $entityId,
                    $in['seo_title'] ?? '',
                    $in['meta_description'] ?? '',
                    $in['canonical_url'] ?? '',
                    $in['og_title'] ?? '',
                    $in['og_description'] ?? '',
                    $in['og_image'] ?? '',
                    $in['structured_data_json'] ?? ''
                ]);
                echo json_encode(['success' => true]);
                return true;
            }
        }

        // 6. SERVICES MEDIA UPLOAD & DELETE (validated, max 5MB, real image check)
        if ($resource === 'services-upload') {
            if ($method === 'POST' && isset($_FILES['image'])) {
                $file = $_FILES['image'];
                if (function_exists('validateUploadedImage')) {
                    $check = validateUploadedImage($file);
                    if (!$check['ok']) {
                        http_response_code($check['code']);
                        echo json_encode(['error' => $check['error']]);
                        return true;
                    }
                    $ext = $check['ext'];
                } else {
                    if ($file['error'] !== UPLOAD_ERR_OK) {
                        http_response_code(400);
                        echo json_encode(['error' => 'Upload error code: ' . $file['error']]);
                        return true;
                    }
                    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'webp');
                }
                $filename = 'svc_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                $targetDir = dirname(__DIR__) . '/uploads/services';
                if (!is_dir($targetDir)) {
                    @mkdir($targetDir, 0755, true);
                }
                $targetFile = $targetDir . '/' . $filename;
                if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                    echo json_encode([
                        'success' => true,
                        'url' => '/uploads/services/' . $filename,
                        'filename' => $filename,
                        'size' => (int)$file['size']
                    ]);
                    return true;
                }
                http_response_code(500);
                echo json_encode(['error' => 'Failed to save uploaded image.']);
                return true;
            }

            if ($method === 'DELETE') {
                $in = getJsonInput();
                $url = (string)($in['url'] ?? $_GET['url'] ?? '');
                if (strpos($url, '/uploads/services/') !== 0) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid upload path.']);
                    return true;
                }
                $filePath = dirname(__DIR__) . '/uploads/services/' . basename($url);
                if (is_file($filePath)) {
                    @unlink($filePath);
                }
                echo json_encode(['success' => true]);
                return true;
            }

            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            return true;
        }

        return false;
    }
}
