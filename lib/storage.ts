
import { Idea } from "@/components/generator/IdeaCard";

const STORAGE_KEY = "newsletter_gen_saved_ideas";

export const getSavedIdeas = (): Idea[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse saved ideas", e);
        return [];
    }
};

export const saveIdea = (idea: Idea) => {
    const current = getSavedIdeas();
    // Avoid duplicates based on topic/content
    const exists = current.some((i) => i.topic === idea.topic);
    if (!exists) {
        const updated = [idea, ...current];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        // Dispatch a custom event so other components can react (simple state sync)
        window.dispatchEvent(new Event("saved-ideas-changed"));
    }
};

export const removeIdea = (topic: string) => {
    const current = getSavedIdeas();
    const updated = current.filter((i) => i.topic !== topic);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("saved-ideas-changed"));
};

export const isIdeaSaved = (topic: string): boolean => {
    const current = getSavedIdeas();
    return current.some((i) => i.topic === topic);
};
