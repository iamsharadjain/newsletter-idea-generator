
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const bodySchema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = bodySchema.parse(body);

        // Graceful fallback for demo/build mode
        if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy")) {
            console.warn("Mock Subscription (Supabase keys missing):", email);
            return NextResponse.json({ success: true });
        }

        const { error } = await supabase
            .from('emails')
            .insert([{ email }]);

        if (error) {
            // If duplicate email, we typically just proceed as success for UX, 
            // using ON CONFLICT DO NOTHING if enforced in DB, or checking error code.
            // For MVP, we'll log it and let user proceed.
            console.error("Supabase error:", error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}
