<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $members = TeamMember::orderBy('id')->get()->map(function ($m) {
            return [
                'id' => $m->member_code,
                'db_id' => $m->id,
                'name' => $m->name,
                'role' => $m->role,
                'category' => $m->category,
                'tag' => $m->tag,
                'experience' => $m->experience,
                'phone' => $m->phone,
                'whatsapp' => $m->whatsapp,
                'email' => $m->email,
                'photo' => $m->photo,
                'bio' => $m->bio,
                'quote' => $m->quote,
                'address' => $m->address,
                'instagram' => $m->instagram,
                'facebook' => $m->facebook,
                'linkedin' => $m->linkedin,
                'isActive' => $m->is_active,
            ];
        });

        return response()->json($members)
            ->header('Cache-Control', 'public, max-age=180, stale-while-revalidate=900');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'category' => 'nullable|string|in:ceo,founder,agent,engineer,owner,partner,employee',
            'tag' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:100',
            'whatsapp' => 'nullable|string|max:100',
            'email' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'bio' => 'nullable|string',
            'quote' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:500',
            'facebook' => 'nullable|string|max:500',
            'linkedin' => 'nullable|string|max:500',
        ]);

        $code = $request->input('id') ?: ('TM-' . rand(100, 9999));

        $member = TeamMember::updateOrCreate(
            ['member_code' => $code],
            [
                'name' => $validated['name'],
                'role' => $validated['role'],
                'category' => $validated['category'] ?? 'employee',
                'tag' => $validated['tag'] ?? null,
                'experience' => $validated['experience'] ?? '5+ Years',
                'phone' => $validated['phone'] ?? '0323-5963375',
                'whatsapp' => $validated['whatsapp'] ?? preg_replace('/[^0-9]/', '', $validated['phone'] ?? '923235963375'),
                'email' => $validated['email'] ?? 'toplinkers12@gmail.com',
                'photo' => $validated['photo'] ?? null,
                'bio' => $validated['bio'] ?? '',
                'quote' => $validated['quote'] ?? '',
                'address' => $validated['address'] ?? '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad',
                'instagram' => $validated['instagram'] ?? null,
                'facebook' => $validated['facebook'] ?? null,
                'linkedin' => $validated['linkedin'] ?? null,
                'is_active' => true,
            ]
        );

        return response()->json([
            'id' => $member->member_code,
            'db_id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'category' => $member->category,
            'instagram' => $member->instagram,
            'facebook' => $member->facebook,
            'linkedin' => $member->linkedin,
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $member = TeamMember::where('member_code', $id)->orWhere('id', $id)->firstOrFail();

        $member->update([
            'name' => $request->input('name', $member->name),
            'role' => $request->input('role', $member->role),
            'category' => $request->input('category', $member->category),
            'tag' => $request->input('tag', $member->tag),
            'experience' => $request->input('experience', $member->experience),
            'phone' => $request->input('phone', $member->phone),
            'whatsapp' => $request->input('whatsapp', $member->whatsapp),
            'email' => $request->input('email', $member->email),
            'photo' => $request->input('photo', $member->photo),
            'bio' => $request->input('bio', $member->bio),
            'quote' => $request->input('quote', $member->quote),
            'address' => $request->input('address', $member->address),
            'instagram' => $request->input('instagram', $member->instagram),
            'facebook' => $request->input('facebook', $member->facebook),
            'linkedin' => $request->input('linkedin', $member->linkedin),
        ]);

        return response()->json(['success' => true, 'member' => $member]);
    }

    public function destroy(string $id)
    {
        $member = TeamMember::where('member_code', $id)->orWhere('id', $id)->first();
        if ($member) {
            $member->delete();
        }
        return response()->json(['success' => true]);
    }
}
