<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminPermission;
use App\Models\AdminRole;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index()
    {
        $this->seedDefaultsIfEmpty();

        $roles = AdminRole::orderBy('id')->get()->map(function ($r) {
            return [
                'id' => $r->role_code,
                'db_id' => $r->id,
                'name' => $r->name,
                'slug' => $r->slug,
                'description' => $r->description,
                'color' => $r->color,
                'permissions' => $r->permissions ?? [],
                'isSystem' => $r->is_system,
                'isActive' => $r->is_active,
            ];
        });

        $permissions = AdminPermission::orderBy('id')->get()->map(function ($p) {
            return [
                'id' => 'PERM-' . $p->id,
                'db_id' => $p->id,
                'key' => $p->key,
                'label' => $p->label,
                'module' => $p->module,
                'description' => $p->description,
                'isSystem' => $p->is_system,
            ];
        });

        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function storeRole(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'description' => 'nullable|string|max:500',
            'color' => 'nullable|string|max:40',
            'permissions' => 'nullable|array',
            'isActive' => 'nullable|boolean',
        ]);

        $code = $request->input('id') ?: ('RL-' . rand(100, 9999));
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug ?: ('role-' . strtolower(Str::random(5)));

        $existing = AdminRole::where('role_code', $code)->first();
        if (!$existing && AdminRole::where('slug', $slug)->exists()) {
            $slug .= '-' . rand(10, 99);
        }

        $role = AdminRole::updateOrCreate(
            ['role_code' => $code],
            [
                'name' => $validated['name'],
                'slug' => $existing ? $existing->slug : $slug,
                'description' => $validated['description'] ?? '',
                'color' => $validated['color'] ?? 'cyan',
                'permissions' => $validated['permissions'] ?? [],
                'is_system' => (bool) ($existing?->is_system ?? $request->input('isSystem', false)),
                'is_active' => $request->has('isActive') ? (bool) $request->input('isActive') : true,
            ]
        );

        return response()->json([
            'id' => $role->role_code,
            'db_id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'description' => $role->description,
            'color' => $role->color,
            'permissions' => $role->permissions ?? [],
            'isSystem' => $role->is_system,
            'isActive' => $role->is_active,
        ], 201);
    }

    public function updateRole(Request $request, string $id)
    {
        $role = AdminRole::where('role_code', $id)->orWhere('id', $id)->firstOrFail();

        $role->update([
            'name' => $request->input('name', $role->name),
            'description' => $request->input('description', $role->description),
            'color' => $request->input('color', $role->color),
            'permissions' => $request->input('permissions', $role->permissions),
            'is_active' => $request->has('isActive') ? (bool) $request->input('isActive') : $role->is_active,
        ]);

        return response()->json([
            'id' => $role->role_code,
            'name' => $role->name,
            'permissions' => $role->permissions ?? [],
            'isActive' => $role->is_active,
        ]);
    }

    public function destroyRole(string $id)
    {
        $role = AdminRole::where('role_code', $id)->orWhere('id', $id)->first();
        if ($role && !$role->is_system) {
            $role->delete();
        }

        return response()->json(['deleted' => true]);
    }

    public function storePermission(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:120',
            'label' => 'required|string|max:160',
            'module' => 'nullable|string|max:80',
            'description' => 'nullable|string|max:300',
        ]);

        $cleanKey = Str::of($validated['key'])->lower()->replace(' ', '_')->toString();

        $perm = AdminPermission::updateOrCreate(
            ['key' => $cleanKey],
            [
                'label' => $validated['label'],
                'module' => $validated['module'] ?? 'Custom',
                'description' => $validated['description'] ?? '',
                'is_system' => (bool) $request->input('isSystem', false),
            ]
        );

        return response()->json([
            'id' => 'PERM-' . $perm->id,
            'db_id' => $perm->id,
            'key' => $perm->key,
            'label' => $perm->label,
            'module' => $perm->module,
            'description' => $perm->description,
            'isSystem' => $perm->is_system,
        ], 201);
    }

    public function destroyPermission(string $id)
    {
        $numericId = str_starts_with($id, 'PERM-') ? substr($id, 5) : $id;
        $perm = AdminPermission::where('id', $numericId)->orWhere('key', $id)->first();

        if ($perm && !$perm->is_system) {
            $key = $perm->key;
            $perm->delete();

            // Clean removed permission key from all saved roles
            AdminRole::all()->each(function ($role) use ($key) {
                $perms = collect($role->permissions ?? [])->reject(fn ($p) => $p === $key)->values()->all();
                $role->update(['permissions' => $perms]);
            });
        }

        return response()->json(['deleted' => true]);
    }

    private function seedDefaultsIfEmpty(): void
    {
        if (AdminPermission::count() === 0) {
            $defaults = [
                ['key' => 'dashboard.view', 'label' => 'View Executive Dashboard', 'module' => 'Dashboard', 'description' => 'Access analytics overview and summary cards', 'is_system' => true],
                ['key' => 'leads.view', 'label' => 'View Leads & Inquiries', 'module' => 'Leads & CRM', 'description' => 'Browse incoming client inquiries and CRM pipeline', 'is_system' => true],
                ['key' => 'leads.create', 'label' => 'Create Walk-in / Manual Leads', 'module' => 'Leads & CRM', 'description' => 'Log phone and walk-in client inquiries', 'is_system' => true],
                ['key' => 'leads.edit', 'label' => 'Update Lead Status & Notes', 'module' => 'Leads & CRM', 'description' => 'Change lead stage and priority', 'is_system' => true],
                ['key' => 'leads.delete', 'label' => 'Delete Leads', 'module' => 'Leads & CRM', 'description' => 'Permanently remove lead records', 'is_system' => true],
                ['key' => 'rates.view', 'label' => 'View Live Market Rates', 'module' => 'Live Rates', 'description' => 'View plot, flat, and solar rates matrix', 'is_system' => true],
                ['key' => 'rates.edit', 'label' => 'Update & Publish Live Rates', 'module' => 'Live Rates', 'description' => 'Modify society plot and installment pricing', 'is_system' => true],
                ['key' => 'properties.view', 'label' => 'View Properties Inventory', 'module' => 'Properties', 'description' => 'Access property listings catalog', 'is_system' => true],
                ['key' => 'properties.create', 'label' => 'Add New Properties', 'module' => 'Properties', 'description' => 'Publish plots, houses, or commercial properties', 'is_system' => true],
                ['key' => 'properties.edit', 'label' => 'Edit Properties & Location Pin', 'module' => 'Properties', 'description' => 'Modify listing details, photos, and map coordinates', 'is_system' => true],
                ['key' => 'properties.delete', 'label' => 'Delete Properties', 'module' => 'Properties', 'description' => 'Remove listings from public and admin catalog', 'is_system' => true],
                ['key' => 'team.view', 'label' => 'View CEOs, Agents & Engineers', 'module' => 'Owner & Team', 'description' => 'Inspect leadership and field team directory', 'is_system' => true],
                ['key' => 'team.manage', 'label' => 'Add, Edit & Delete Team Members', 'module' => 'Owner & Team', 'description' => 'Full control over leadership and employee profiles', 'is_system' => true],
                ['key' => 'roles.view', 'label' => 'View Roles & Permissions', 'module' => 'Roles & Access', 'description' => 'Inspect portal roles and permission assignments', 'is_system' => true],
                ['key' => 'roles.manage', 'label' => 'Create & Edit Roles / Permissions', 'module' => 'Roles & Access', 'description' => 'Manage access control roles and create custom permissions', 'is_system' => true],
            ];

            foreach ($defaults as $perm) {
                AdminPermission::firstOrCreate(['key' => $perm['key']], $perm);
            }
        }

        if (AdminRole::count() === 0) {
            $allKeys = AdminPermission::pluck('key')->values()->all();

            $starterRoles = [
                [
                    'role_code' => 'RL-SUPER',
                    'name' => 'Super Admin',
                    'slug' => 'super-admin',
                    'description' => 'Full unrestricted access across CRM leads, live market rates, properties, team directory, and role governance.',
                    'color' => 'navy',
                    'permissions' => $allKeys,
                    'is_system' => true,
                    'is_active' => true,
                ],
                [
                    'role_code' => 'RL-CRM',
                    'name' => 'CRM & Sales Manager',
                    'slug' => 'crm-sales-manager',
                    'description' => 'Manages walk-in leads, client follow-ups, pipeline stages, and views property inventory & market rates.',
                    'color' => 'cyan',
                    'permissions' => ['dashboard.view', 'leads.view', 'leads.create', 'leads.edit', 'rates.view', 'properties.view', 'team.view'],
                    'is_system' => false,
                    'is_active' => true,
                ],
                [
                    'role_code' => 'RL-INV',
                    'name' => 'Inventory & Listings Editor',
                    'slug' => 'inventory-listings-editor',
                    'description' => 'Creates and updates property listings, coordinates, multi-image galleries, and live society rate sheets.',
                    'color' => 'emerald',
                    'permissions' => ['dashboard.view', 'properties.view', 'properties.create', 'properties.edit', 'rates.view', 'rates.edit'],
                    'is_system' => false,
                    'is_active' => true,
                ],
                [
                    'role_code' => 'RL-HR',
                    'name' => 'HR & Team Coordinator',
                    'slug' => 'hr-team-coordinator',
                    'description' => 'Maintains owner profiles, senior real estate agents, and PEC engineers directory.',
                    'color' => 'amber',
                    'permissions' => ['dashboard.view', 'team.view', 'team.manage'],
                    'is_system' => false,
                    'is_active' => true,
                ],
            ];

            foreach ($starterRoles as $role) {
                AdminRole::firstOrCreate(['role_code' => $role['role_code']], $role);
            }
        }
    }
}
