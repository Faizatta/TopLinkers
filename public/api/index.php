<?php
/**
 * TopLinkers Central SQLite Database API Engine
 * Powers multi-browser, multi-device live data synchronization for:
 * Properties, Live Market Rates, Promo Strip, Team Members, Client Reviews,
 * Blog Articles, CRM Leads, Roles, Permissions, and Users.
 */

declare(strict_types=1);

// Set strict JSON and security headers
if (!headers_sent()) header('Content-Type: application/json; charset=utf-8');
if (!headers_sent()) header('X-Content-Type-Options: nosniff');
if (!headers_sent()) header('X-Frame-Options: SAMEORIGIN');

// CORS Headers for API flexibility
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
if (!headers_sent()) header("Access-Control-Allow-Origin: $origin");
if (!headers_sent()) header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
if (!headers_sent()) header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
if (!headers_sent()) header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Secret key for HMAC token signing (compatible with admin_auth.php)
$secretKey = getenv('TL_ADMIN_SECRET') ?: 'toplinkers_secure_executive_hmac_2026_x7a9k2!';

// Locate SQLite Database
$dbPath = __DIR__ . '/data/database.sqlite';
if (!file_exists($dbPath)) {
    // Fallback if not found in data/
    $dbPath = dirname(__DIR__, 2) . '/backend/database/database.sqlite';
}

if (!file_exists($dbPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Database file not found', 'path' => $dbPath]);
    exit;
}

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    // Enable WAL mode and 5 second busy timeout for high concurrency
    $pdo->exec('PRAGMA journal_mode = WAL;');
    $pdo->exec('PRAGMA busy_timeout = 5000;');
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed', 'details' => $e->getMessage()]);
    exit;
}

// Helper: Parse URI path
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
// Strip /api prefix if present
$apiPath = preg_replace('#^/api/?#i', '', $requestUri);
$apiPath = trim($apiPath, '/');
$segments = $apiPath === '' ? [] : explode('/', $apiPath);
$resource = strtolower($segments[0] ?? '');
$subResource = $segments[1] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

// Helper: Read JSON payload
if (!function_exists('getJsonInput')) {
    function getJsonInput(): array {
        $raw = file_get_contents('php://input');
        if (empty($raw)) return $_POST;
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }
}

// Helper: Generate & Verify HMAC Tokens
if (!function_exists('verifyAuthToken')) {
    function verifyAuthToken(string $secret): bool {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
        $token = null;
        if (preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
            $token = $matches[1];
        } elseif (isset($_COOKIE['tl_admin_session'])) {
            $token = $_COOKIE['tl_admin_session'];
        }

        if (!$token) return false;
        $parts = explode('.', $token);
        if (count($parts) !== 2) return false;
        [$data, $sig] = $parts;
        $expected = hash_hmac('sha256', $data, $secret);
        if (!hash_equals($expected, $sig)) return false;
        $payload = json_decode(base64_decode($data), true);
        return is_array($payload) && isset($payload['exp']) && $payload['exp'] >= time();
    }
}

// Helper: Generate slug
if (!function_exists('slugify')) {
    function slugify(string $text): string {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        return strtolower($text) ?: 'property-' . time();
    }
}

// -------------------------------------------------------------
// ROUTING ENGINE
// -------------------------------------------------------------

switch ($resource) {

    // 1. Health Check
    case 'health':
        $count = (int)$pdo->query("SELECT count(*) FROM properties")->fetchColumn();
        echo json_encode([
            'status' => 'ok',
            'service' => 'TopLinkers Central SQLite Database API Engine',
            'database' => 'sqlite',
            'properties_count' => $count,
            'timestamp' => date('c')
        ]);
        break;

    // 2. Admin Login
    case 'login':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            exit;
        }
        $input = getJsonInput();
        $email = strtolower(trim((string)($input['email'] ?? '')));
        $password = (string)($input['password'] ?? '');

        // Master executive logins or database user
        $valid = false;
        $matchedUser = null;

        if ($email === 'toplinkers@gmail.com' && $password === 'lock5816') {
            $valid = true;
            $matchedUser = [
                'name' => 'Syed Usman Hammad',
                'email' => 'toplinkers@gmail.com',
                'role' => 'Chief Executive & Super Admin',
                'permissions' => ['all']
            ];
        } elseif ($email === 'admin@toplinkers.com' && $password === 'admin123') {
            $valid = true;
            $matchedUser = [
                'name' => 'TopLinkers Administrator',
                'email' => 'admin@toplinkers.com',
                'role' => 'Super Admin',
                'permissions' => ['all']
            ];
        } else {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = ? AND is_active = 1 LIMIT 1");
            $stmt->execute([$email]);
            $u = $stmt->fetch();
            if ($u && password_verify($password, $u['password'])) {
                $valid = true;
                $matchedUser = [
                    'name' => $u['name'],
                    'email' => $u['email'],
                    'role' => $u['role'],
                    'permissions' => json_decode($u['permissions'] ?? '["all"]', true) ?: ['all']
                ];
            }
        }

        if (!$valid) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
            exit;
        }

        $tokenPayload = [
            'email' => $matchedUser['email'],
            'role' => $matchedUser['role'],
            'exp' => time() + (86400 * 7)
        ];
        $dataStr = base64_encode(json_encode($tokenPayload));
        $sig = hash_hmac('sha256', $dataStr, $secretKey);
        $token = $dataStr . '.' . $sig;

        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => $matchedUser
        ]);
        break;

    // 3. Live Market Rates
    case 'rates':
        if ($method === 'GET') {
            $stmt = $pdo->prepare("SELECT payload FROM market_rates WHERE key = 'live_rates' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if (!headers_sent()) header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
            echo $row ? $row['payload'] : json_encode((object)[]);
        } elseif ($method === 'POST') {
            $payload = json_encode(getJsonInput());
            $stmt = $pdo->prepare("INSERT INTO market_rates (key, payload, created_at, updated_at) 
                VALUES ('live_rates', :payload, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ON CONFLICT(key) DO UPDATE SET payload = :payload, updated_at = CURRENT_TIMESTAMP");
            $stmt->execute([':payload' => $payload]);
            echo $payload;
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    // 4. Promo Strip
    case 'promo-strip':
        if ($method === 'GET') {
            $stmt = $pdo->prepare("SELECT payload FROM market_rates WHERE key = 'promo_strip' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if (!headers_sent()) header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
            echo $row ? $row['payload'] : json_encode((object)[]);
        } elseif ($method === 'POST') {
            $payload = json_encode(getJsonInput());
            $stmt = $pdo->prepare("INSERT INTO market_rates (key, payload, created_at, updated_at) 
                VALUES ('promo_strip', :payload, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ON CONFLICT(key) DO UPDATE SET payload = :payload, updated_at = CURRENT_TIMESTAMP");
            $stmt->execute([':payload' => $payload]);
            echo $payload;
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    // 5. Properties Manager
    case 'properties':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM properties ORDER BY created_at DESC, id DESC");
            $props = $stmt->fetchAll();
            $formatted = array_map(function ($p) {
                return [
                    'id' => (int)$p['id'],
                    'slug' => $p['slug'],
                    'title' => $p['title'],
                    'price' => (int)$p['price'],
                    'type' => $p['type'],
                    'purpose' => $p['purpose'],
                    'location' => $p['location'],
                    'area' => $p['area'],
                    'bedrooms' => (int)$p['bedrooms'],
                    'bathrooms' => (int)$p['bathrooms'],
                    'image' => $p['image'],
                    'featured' => (bool)$p['featured'],
                    'description' => $p['description'],
                    'offer_enabled' => (bool)$p['offer_enabled'],
                    'offer_label' => $p['offer_label'],
                    'offer_price' => $p['offer_price'] ? (int)$p['offer_price'] : null,
                    'offer_expires_at' => $p['offer_expires_at'],
                    'created_at' => $p['created_at'],
                    'updated_at' => $p['updated_at'],
                ];
            }, $props);
            if (!headers_sent()) header('Cache-Control: public, max-age=120, stale-while-revalidate=600');
            echo json_encode($formatted);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $title = trim((string)($in['title'] ?? ''));
            if ($title === '') {
                http_response_code(400);
                echo json_encode(['error' => 'Title is required']);
                exit;
            }
            $slug = !empty($in['slug']) ? slugify((string)$in['slug']) : (slugify($title) . '-' . time());

            $stmt = $pdo->prepare("INSERT INTO properties 
                (slug, title, price, type, purpose, location, area, bedrooms, bathrooms, image, featured, description, offer_enabled, offer_label, offer_price, offer_expires_at, created_at, updated_at)
                VALUES (:slug, :title, :price, :type, :purpose, :location, :area, :bedrooms, :bathrooms, :image, :featured, :description, :offer_enabled, :offer_label, :offer_price, :offer_expires_at, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ON CONFLICT(slug) DO UPDATE SET
                    title = :title,
                    price = :price,
                    type = :type,
                    purpose = :purpose,
                    location = :location,
                    area = :area,
                    bedrooms = :bedrooms,
                    bathrooms = :bathrooms,
                    image = :image,
                    featured = :featured,
                    description = :description,
                    offer_enabled = :offer_enabled,
                    offer_label = :offer_label,
                    offer_price = :offer_price,
                    offer_expires_at = :offer_expires_at,
                    updated_at = CURRENT_TIMESTAMP");

            $stmt->execute([
                ':slug' => $slug,
                ':title' => $title,
                ':price' => (int)($in['price'] ?? 0),
                ':type' => $in['type'] ?? 'plot',
                ':purpose' => $in['purpose'] ?? 'for-sale',
                ':location' => $in['location'] ?? 'Islamabad',
                ':area' => $in['area'] ?? '10 Marla',
                ':bedrooms' => (int)($in['bedrooms'] ?? 0),
                ':bathrooms' => (int)($in['bathrooms'] ?? 0),
                ':image' => $in['image'] ?? null,
                ':featured' => !empty($in['featured']) ? 1 : 0,
                ':description' => $in['description'] ?? null,
                ':offer_enabled' => !empty($in['offer_enabled']) ? 1 : 0,
                ':offer_label' => $in['offer_label'] ?? null,
                ':offer_price' => !empty($in['offer_price']) ? (int)$in['offer_price'] : null,
                ':offer_expires_at' => $in['offer_expires_at'] ?? null,
            ]);

            $id = $pdo->lastInsertId();
            http_response_code(201);
            echo json_encode(array_merge($in, ['id' => (int)$id, 'slug' => $slug]));
        } elseif ($method === 'PUT' && $subResource) {
            $in = getJsonInput();
            $fields = [];
            $params = [':target' => $subResource];
            $allowed = ['title', 'price', 'type', 'purpose', 'location', 'area', 'bedrooms', 'bathrooms', 'image', 'featured', 'description', 'offer_enabled', 'offer_label', 'offer_price', 'offer_expires_at'];

            foreach ($allowed as $k) {
                if (array_key_exists($k, $in)) {
                    $fields[] = "$k = :$k";
                    $params[":$k"] = $in[$k];
                }
            }
            if (!empty($fields)) {
                $fields[] = "updated_at = CURRENT_TIMESTAMP";
                $sql = "UPDATE properties SET " . implode(', ', $fields) . " WHERE id = :target OR slug = :target";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
            }
            $stmt = $pdo->prepare("SELECT * FROM properties WHERE id = ? OR slug = ? LIMIT 1");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode($stmt->fetch() ?: ['success' => true]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM properties WHERE id = ? OR slug = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
        }
        break;

    // 6. Owner, Partners & Team Employees Manager
    case 'team':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM team_members ORDER BY id ASC");
            $rows = $stmt->fetchAll();
            $formatted = array_map(function ($m) {
                return [
                    'id' => $m['member_code'] ?: ('TM-' . $m['id']),
                    'db_id' => (int)$m['id'],
                    'name' => $m['name'],
                    'role' => $m['role'],
                    'category' => $m['category'],
                    'tag' => $m['tag'],
                    'experience' => $m['experience'],
                    'phone' => $m['phone'],
                    'whatsapp' => $m['whatsapp'],
                    'email' => $m['email'],
                    'photo' => $m['photo'],
                    'bio' => $m['bio'],
                    'quote' => $m['quote'],
                    'address' => $m['address'],
                    'instagram' => $m['instagram'],
                    'facebook' => $m['facebook'],
                    'linkedin' => $m['linkedin'],
                    'isActive' => (bool)$m['is_active'],
                ];
            }, $rows);
            echo json_encode($formatted);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $code = $in['id'] ?? ('TM-' . time());

            // Check if member already exists by member_code or id (UPSERT)
            $checkStmt = $pdo->prepare("SELECT id FROM team_members WHERE member_code = ? OR id = ? LIMIT 1");
            $checkStmt->execute([$code, $code]);
            $existingId = $checkStmt->fetchColumn();

            if ($existingId) {
                $stmt = $pdo->prepare("UPDATE team_members SET 
                    name = :name, role = :role, category = :category, tag = :tag,
                    experience = :experience, phone = :phone, whatsapp = :whatsapp,
                    email = :email, photo = :photo, bio = :bio, quote = :quote,
                    address = :address, instagram = :instagram, facebook = :facebook,
                    linkedin = :linkedin, is_active = :is_active, updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id");
                $stmt->execute([
                    ':name' => $in['name'] ?? '',
                    ':role' => $in['role'] ?? '',
                    ':category' => $in['category'] ?? 'agent',
                    ':tag' => $in['tag'] ?? '',
                    ':experience' => $in['experience'] ?? '',
                    ':phone' => $in['phone'] ?? '',
                    ':whatsapp' => $in['whatsapp'] ?? '',
                    ':email' => $in['email'] ?? '',
                    ':photo' => $in['photo'] ?? '',
                    ':bio' => $in['bio'] ?? '',
                    ':quote' => $in['quote'] ?? '',
                    ':address' => $in['address'] ?? '',
                    ':instagram' => $in['instagram'] ?? null,
                    ':facebook' => $in['facebook'] ?? null,
                    ':linkedin' => $in['linkedin'] ?? null,
                    ':is_active' => isset($in['isActive']) ? ($in['isActive'] ? 1 : 0) : 1,
                    ':id' => $existingId
                ]);
                $in['db_id'] = (int)$existingId;
            } else {
                $stmt = $pdo->prepare("INSERT INTO team_members 
                    (member_code, name, role, category, tag, experience, phone, whatsapp, email, photo, bio, quote, address, instagram, facebook, linkedin, is_active, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
                $stmt->execute([
                    $code, $in['name'] ?? '', $in['role'] ?? '', $in['category'] ?? 'agent', $in['tag'] ?? '',
                    $in['experience'] ?? '', $in['phone'] ?? '', $in['whatsapp'] ?? '', $in['email'] ?? '',
                    $in['photo'] ?? '', $in['bio'] ?? '', $in['quote'] ?? '', $in['address'] ?? '',
                    $in['instagram'] ?? null, $in['facebook'] ?? null, $in['linkedin'] ?? null,
                    isset($in['isActive']) ? ($in['isActive'] ? 1 : 0) : 1
                ]);
                $in['db_id'] = (int)$pdo->lastInsertId();
            }
            echo json_encode($in);
        } elseif ($method === 'PUT' && $subResource) {
            $in = getJsonInput();
            $stmt = $pdo->prepare("UPDATE team_members SET 
                name = COALESCE(:name, name),
                role = COALESCE(:role, role),
                category = COALESCE(:category, category),
                tag = COALESCE(:tag, tag),
                experience = COALESCE(:experience, experience),
                phone = COALESCE(:phone, phone),
                whatsapp = COALESCE(:whatsapp, whatsapp),
                email = COALESCE(:email, email),
                photo = COALESCE(:photo, photo),
                bio = COALESCE(:bio, bio),
                quote = COALESCE(:quote, quote),
                address = COALESCE(:address, address),
                instagram = COALESCE(:instagram, instagram),
                facebook = COALESCE(:facebook, facebook),
                linkedin = COALESCE(:linkedin, linkedin),
                is_active = COALESCE(:is_active, is_active),
                updated_at = CURRENT_TIMESTAMP
                WHERE member_code = :target OR id = :target");
            $stmt->execute([
                ':name' => $in['name'] ?? null,
                ':role' => $in['role'] ?? null,
                ':category' => $in['category'] ?? null,
                ':tag' => $in['tag'] ?? null,
                ':experience' => $in['experience'] ?? null,
                ':phone' => $in['phone'] ?? null,
                ':whatsapp' => $in['whatsapp'] ?? null,
                ':email' => $in['email'] ?? null,
                ':photo' => $in['photo'] ?? null,
                ':bio' => $in['bio'] ?? null,
                ':quote' => $in['quote'] ?? null,
                ':address' => $in['address'] ?? null,
                ':instagram' => $in['instagram'] ?? null,
                ':facebook' => $in['facebook'] ?? null,
                ':linkedin' => $in['linkedin'] ?? null,
                ':is_active' => isset($in['isActive']) ? ($in['isActive'] ? 1 : 0) : null,
                ':target' => $subResource
            ]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM team_members WHERE member_code = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 7. Client Reviews & Testimonials
    case 'reviews':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM reviews ORDER BY id ASC");
            $rows = $stmt->fetchAll();
            $formatted = array_map(function ($r) {
                return [
                    'id' => $r['review_code'] ?: ('REV-' . $r['id']),
                    'db_id' => (int)$r['id'],
                    'name' => $r['name'],
                    'role' => $r['role'],
                    'location' => $r['location'],
                    'project' => $r['project'],
                    'quote' => $r['quote'],
                    'rating' => (int)$r['rating'],
                    'isActive' => (bool)$r['is_active'],
                ];
            }, $rows);
            echo json_encode($formatted);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $code = $in['id'] ?? ('REV-' . time());
            $stmt = $pdo->prepare("INSERT INTO reviews 
                (review_code, name, role, location, project, quote, rating, is_active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([
                $code, $in['name'] ?? '', $in['role'] ?? '', $in['location'] ?? '',
                $in['project'] ?? '', $in['quote'] ?? '', (int)($in['rating'] ?? 5),
                isset($in['isActive']) ? ($in['isActive'] ? 1 : 0) : 1
            ]);
            $in['db_id'] = (int)$pdo->lastInsertId();
            echo json_encode($in);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM reviews WHERE review_code = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 8. Lead Generation & CRM
    case 'leads':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC, id DESC");
            $leads = $stmt->fetchAll();
            $formatted = array_map(function ($l) {
                return [
                    'id' => $l['lead_code'] ?: ('LD-' . $l['id']),
                    'db_id' => (int)$l['id'],
                    'name' => $l['name'],
                    'phone' => $l['phone'],
                    'email' => $l['email'],
                    'city' => $l['city'],
                    'division' => $l['division'],
                    'project' => $l['project'],
                    'budget' => $l['budget'],
                    'status' => $l['status'] ?: 'New',
                    'priority' => $l['priority'] ?: 'Medium',
                    'source' => $l['source'] ?: 'Direct Website',
                    'notes' => $l['notes'],
                    'date' => $l['created_at'],
                    'created_at' => $l['created_at']
                ];
            }, $leads);
            echo json_encode($formatted);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $code = $in['id'] ?? ('LD-' . time());
            $stmt = $pdo->prepare("INSERT INTO leads 
                (lead_code, name, phone, email, city, division, project, budget, status, priority, source, notes, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([
                $code, $in['name'] ?? 'Inquiry Lead', $in['phone'] ?? '', $in['email'] ?? '',
                $in['city'] ?? 'Islamabad', $in['division'] ?? 'Real Estate', $in['project'] ?? '',
                $in['budget'] ?? '', $in['status'] ?? 'New', $in['priority'] ?? 'Medium',
                $in['source'] ?? 'Direct Website', $in['notes'] ?? ''
            ]);
            $in['db_id'] = (int)$pdo->lastInsertId();
            echo json_encode($in);
        } elseif ($method === 'PATCH' && $subResource) {
            $in = getJsonInput();
            $status = $in['status'] ?? 'Contacted';
            $stmt = $pdo->prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_code = ? OR id = ?");
            $stmt->execute([$status, $subResource, $subResource]);
            echo json_encode(['success' => true]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM leads WHERE lead_code = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 9. Roles & Permissions Manager
    case 'roles':
        if ($method === 'GET') {
            $roles = $pdo->query("SELECT * FROM admin_roles ORDER BY id ASC")->fetchAll();
            $permissions = $pdo->query("SELECT * FROM admin_permissions ORDER BY id ASC")->fetchAll();

            $formattedRoles = array_map(function ($r) {
                return [
                    'id' => $r['role_code'] ?: ('role-' . $r['id']),
                    'name' => $r['name'],
                    'slug' => $r['slug'],
                    'description' => $r['description'],
                    'color' => $r['color'] ?: '#0F2A44',
                    'permissions' => json_decode($r['permissions'] ?? '[]', true) ?: [],
                    'isSystem' => (bool)$r['is_system'],
                    'isActive' => (bool)$r['is_active'],
                ];
            }, $roles);

            $formattedPerms = array_map(function ($p) {
                return [
                    'id' => $p['key'],
                    'label' => $p['label'],
                    'module' => $p['module'],
                    'description' => $p['description'],
                    'isSystem' => (bool)$p['is_system']
                ];
            }, $permissions);

            echo json_encode([
                'roles' => $formattedRoles,
                'permissions' => $formattedPerms
            ]);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $code = $in['id'] ?? ('role-' . time());
            $stmt = $pdo->prepare("INSERT INTO admin_roles 
                (role_code, name, slug, description, color, permissions, is_system, is_active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([
                $code, $in['name'] ?? '', slugify($in['name'] ?? ''), $in['description'] ?? '',
                $in['color'] ?? '#0F2A44', json_encode($in['permissions'] ?? []),
                !empty($in['isSystem']) ? 1 : 0, !empty($in['isActive']) ? 1 : 1
            ]);
            echo json_encode(['success' => true, 'id' => $code]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM admin_roles WHERE role_code = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    case 'permissions':
        if ($method === 'POST') {
            $in = getJsonInput();
            $key = $in['id'] ?? slugify($in['label'] ?? '');
            $stmt = $pdo->prepare("INSERT INTO admin_permissions (key, label, module, description, is_system, created_at, updated_at)
                VALUES (?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([$key, $in['label'] ?? '', $in['module'] ?? 'general', $in['description'] ?? '']);
            echo json_encode(['success' => true, 'id' => $key]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM admin_permissions WHERE key = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 10. Portal Users Manager
    case 'users':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT id, name, email, role, permissions, is_active, created_at FROM users ORDER BY id ASC");
            $users = $stmt->fetchAll();
            $formatted = array_map(function ($u) {
                return [
                    'id' => (int)$u['id'],
                    'name' => $u['name'],
                    'email' => $u['email'],
                    'role' => $u['role'],
                    'permissions' => json_decode($u['permissions'] ?? '["all"]', true) ?: ['all'],
                    'isActive' => (bool)$u['is_active'],
                    'createdAt' => $u['created_at']
                ];
            }, $users);
            echo json_encode($formatted);
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $pwd = password_hash($in['password'] ?? 'admin123', PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, permissions, is_active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([
                $in['name'] ?? '', strtolower(trim((string)($in['email'] ?? ''))), $pwd,
                $in['role'] ?? 'Admin', json_encode($in['permissions'] ?? ['all']),
                isset($in['isActive']) ? ($in['isActive'] ? 1 : 0) : 1
            ]);
            echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 11. Blog Articles & Market Insights
    case 'blogs':
        if ($method === 'GET') {
            if ($subResource) {
                $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? OR id = ? LIMIT 1");
                $stmt->execute([$subResource, $subResource]);
                $blog = $stmt->fetch();
                if (!$blog) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Blog article not found']);
                    exit;
                }
                // Increment view count
                $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE id = ?")->execute([$blog['id']]);
                echo json_encode($blog);
            } else {
                $isAdmin = isset($_GET['admin']) || isset($_GET['all']);
                $sql = $isAdmin ? "SELECT * FROM blogs ORDER BY created_at DESC" : "SELECT * FROM blogs WHERE is_published = 1 ORDER BY created_at DESC";
                $stmt = $pdo->query($sql);
                if (!headers_sent()) header('Cache-Control: public, max-age=120, stale-while-revalidate=600');
                echo json_encode($stmt->fetchAll());
            }
        } elseif ($method === 'POST') {
            $in = getJsonInput();
            $title = trim((string)($in['title'] ?? ''));
            $slug = !empty($in['slug']) ? slugify((string)$in['slug']) : (slugify($title) . '-' . time());
            $stmt = $pdo->prepare("INSERT INTO blogs 
                (title, slug, category, author, author_role, author_photo, image, read_time, summary, content, tags, is_published, views, published_at, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            $stmt->execute([
                $title, $slug, $in['category'] ?? 'Real Estate', $in['author'] ?? 'TopLinkers',
                $in['author_role'] ?? 'Specialist', $in['author_photo'] ?? null, $in['image'] ?? null,
                $in['read_time'] ?? '5 min read', $in['summary'] ?? '', $in['content'] ?? '',
                json_encode($in['tags'] ?? []), !empty($in['is_published']) ? 1 : 1, 0
            ]);
            $in['id'] = (int)$pdo->lastInsertId();
            $in['slug'] = $slug;
            http_response_code(201);
            echo json_encode($in);
        } elseif ($method === 'DELETE' && $subResource) {
            $stmt = $pdo->prepare("DELETE FROM blogs WHERE slug = ? OR id = ?");
            $stmt->execute([$subResource, $subResource]);
            echo json_encode(['success' => true]);
        }
        break;

    // 12. Image File Upload
    case 'upload':
        if ($method === 'POST' && isset($_FILES['image'])) {
            $file = $_FILES['image'];
            if ($file['error'] === UPLOAD_ERR_OK) {
                $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg');
                $allowed = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'];
                if (!in_array($ext, $allowed, true)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid image file type.']);
                    exit;
                }
                $filename = 'upload_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                $targetDir = dirname(__DIR__) . '/uploads/blogs';
                if (!is_dir($targetDir)) {
                    @mkdir($targetDir, 0755, true);
                }
                $targetFile = $targetDir . '/' . $filename;
                if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                    echo json_encode([
                        'success' => true,
                        'url' => '/uploads/blogs/' . $filename,
                        'filename' => $filename
                    ]);
                    exit;
                }
            }
            http_response_code(400);
            echo json_encode(['error' => 'File upload failed.']);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Upload requires POST with multipart file.']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode([
            'error' => 'Not Found',
            'resource' => $resource,
            'message' => 'API endpoint does not exist.'
        ]);
        break;
}
