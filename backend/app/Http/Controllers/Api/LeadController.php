<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::orderByDesc('created_at')->get()->map(function ($lead) {
            return [
                'id' => $lead->lead_code ?: 'LD-' . $lead->id,
                'db_id' => $lead->id,
                'name' => $lead->name,
                'phone' => $lead->phone,
                'email' => $lead->email,
                'city' => $lead->city,
                'division' => $lead->division,
                'project' => $lead->project,
                'budget' => $lead->budget,
                'status' => $lead->status,
                'priority' => $lead->priority,
                'source' => $lead->source,
                'date' => $lead->created_at ? $lead->created_at->format('Y-m-d H:i') : date('Y-m-d H:i'),
                'notes' => $lead->notes,
            ];
        });

        return response()->json($leads);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:100',
            'email' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'division' => 'nullable|string|max:100',
            'project' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:100',
            'priority' => 'nullable|string|max:50',
            'source' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $lead = Lead::create([
            'lead_code' => $request->input('id') ?: ('LD-' . rand(100, 999)),
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'city' => $validated['city'] ?? 'Islamabad',
            'division' => $validated['division'] ?? 'Plots',
            'project' => $validated['project'] ?? 'General Consultation',
            'budget' => $validated['budget'] ?? 'Open',
            'status' => $validated['status'] ?? 'New',
            'priority' => $validated['priority'] ?? 'Medium',
            'source' => $validated['source'] ?? 'Website',
            'notes' => $validated['notes'] ?? '',
        ]);

        return response()->json([
            'id' => $lead->lead_code,
            'db_id' => $lead->id,
            'name' => $lead->name,
            'phone' => $lead->phone,
            'status' => $lead->status,
            'date' => $lead->created_at->format('Y-m-d H:i'),
        ], 201);
    }

    public function updateStatus(Request $request, string $id)
    {
        $request->validate(['status' => 'required|string']);

        $lead = Lead::where('lead_code', $id)->orWhere('id', $id)->first();
        if (!$lead) {
            return response()->json(['message' => 'Lead not found'], 404);
        }

        $lead->status = $request->status;
        $lead->save();

        return response()->json(['success' => true, 'status' => $lead->status]);
    }

    public function destroy(string $id)
    {
        $lead = Lead::where('lead_code', $id)->orWhere('id', $id)->first();
        if ($lead) {
            $lead->delete();
        }
        return response()->json(['success' => true]);
    }
}
