
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY || "dummy-key-for-build",
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY || "dummy-key-for-build" },
});

export const GENERATION_SYSTEM_PROMPT = `
You are a newsletter topic generator for content creators. Generate creative, 
engaging newsletter topic ideas based on the user's niche and audience.

For each topic, provide the following fields in JSON format:
- topic: A compelling, specific title
- hook: A one-sentence hook that explains why readers will care
- keyPoints: Array of 3-5 bullet points to cover (short strings)
- format: Content format (e.g., "How-to", "Listicle", "Case Study")

The output must be a valid JSON array of objects. Do not include any markdown formatting or explanation outside the JSON.
`;

export function generateUserPrompt(niche: string, audience: string, count: number, pastTopics?: string) {
  return `
Generate ${count} newsletter topic ideas.

Niche: ${niche}
Audience: ${audience}
${pastTopics ? `Past successful topics: ${pastTopics}` : ''}

Provide diverse topics that:
- Appeal to this specific audience
- Are fresh and not repetitive
- Mix educational, inspirational, and practical content
`;
}
