<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * List all portal login users
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'permissions', 'is_active', 'created_at', 'updated_at')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($users);
    }

    /**
     * Create a new login user with email, password, and assigned permissions
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string|max:100',
            'permissions' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower(trim($validated['email'])),
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'Editor',
            'permissions' => $validated['permissions'] ?? [],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'permissions' => $user->permissions,
            'is_active' => $user->is_active,
            'created_at' => $user->created_at,
        ], 201);
    }

    /**
     * Update an existing login user (password, role, permissions, active status)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|max:100',
            'permissions' => 'nullable|array',
            'is_active' => 'nullable|boolean',
        ]);

        $user->name = $validated['name'];
        $user->email = strtolower(trim($validated['email']));

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if (isset($validated['role'])) {
            $user->role = $validated['role'];
        }

        if (array_key_exists('permissions', $validated)) {
            $user->permissions = $validated['permissions'];
        }

        if (array_key_exists('is_active', $validated)) {
            // Cannot deactivate the root master admin
            if ($user->email !== 'admin@toplinkers.com') {
                $user->is_active = $validated['is_active'];
            }
        }

        $user->save();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'permissions' => $user->permissions,
            'is_active' => $user->is_active,
            'updated_at' => $user->updated_at,
        ]);
    }

    /**
     * Delete a login user
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Safeguard primary root administrator account
        if ($user->email === 'admin@toplinkers.com' || $user->id == 1) {
            return response()->json([
                'message' => 'Primary system administrator account cannot be deleted.'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User login account deleted successfully.'
        ]);
    }
}
