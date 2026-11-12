<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = strtolower(trim($request->email));
        $password = trim($request->password);

        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$email])->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        if (isset($user->is_active) && !$user->is_active) {
            return response()->json([
                'message' => 'This account has been deactivated by the administrator.'
            ], 403);
        }

        // Return user info and exact permissions matrix
        $userPermissions = $user->permissions;
        if (empty($userPermissions) && ($user->email === 'admin@toplinkers.com' || strtolower($user->role ?? '') === 'super admin' || strtolower($user->role ?? '') === 'admin')) {
            $userPermissions = ['all'];
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ?? 'Chief Administrator',
                'permissions' => $userPermissions ?: [],
            ],
            'token' => 'tl_api_' . Str::random(40),
        ]);
    }
}
