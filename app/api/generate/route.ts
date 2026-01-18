
import { NextResponse } from 'next/server';
import { openai, GENERATION_SYSTEM_PROMPT, generateUserPrompt } from '@/lib/openai';
import { z } from 'zod';

// Schema for input validation
const bodySchema = z.object({
    niche: z.string().min(1, "Niche is required"),
    audience: z.string().optional().default(""),
    count: z.number().min(1).max(30).default(5),
    pastTopics: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { niche, audience, count, pastTopics } = bodySchema.parse(body);

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: GENERATION_SYSTEM_PROMPT },
                { role: "user", content: generateUserPrompt(niche, audience, count, pastTopics) },
            ],
            model: process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4",
            temperature: 0.7,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error("No content generated");
        }

        // Parse the JSON array from the response
        // The model might wrap it in a key like { "ideas": [...] } or just return [...]
        // We added "response_format: { type: "json_object" }" so it returns an object.
        // Our logic handles extracting the array.
        let ideas = [];
        try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                ideas = parsed;
            } else if (parsed.topics && Array.isArray(parsed.topics)) {
                ideas = parsed.topics;
            } else if (parsed.ideas && Array.isArray(parsed.ideas)) {
                ideas = parsed.ideas;
            } else {
                // Fallback: try to find the first array in the values
                const values = Object.values(parsed);
                const foundArray = values.find(v => Array.isArray(v));
                if (foundArray) {
                    ideas = foundArray as any[];
                }
            }
        } catch (e) {
            console.error("Failed to parse JSON", e);
            return NextResponse.json({ error: "Failed to parse generation results" }, { status: 500 });
        }

        return NextResponse.json({ ideas });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json({ error: "Failed to generate ideas" }, { status: 500 });
    }
}
