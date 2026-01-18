"use client";

import { useState, useEffect } from "react";
import GeneratorForm, { FormData } from "@/components/generator/GeneratorForm";
import ResultsGrid from "@/components/generator/ResultsGrid";
import { Idea } from "@/components/generator/IdeaCard";
import Link from "next/link";
import { ArrowLeft, BookHeart } from "lucide-react";

export default function GeneratePage() {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Check storage on mount
    useEffect(() => {
        const unlocked = localStorage.getItem("ideaGen.unlocked") === "true";
        if (unlocked) setIsUnlocked(true);
    }, []);

    const handleUnlock = () => {
        setIsUnlocked(true);
        localStorage.setItem("ideaGen.unlocked", "true");
    };

    const handleGenerate = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        setIdeas([]); // Clear previous results

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to generate ideas");
            }

            const result = await response.json();
            setIdeas(result.ideas);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please check your API keys and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto py-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Idea Generator
                        </h1>
                    </div>

                    <Link href="/dashboard">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-md border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <BookHeart className="h-4 w-4 text-red-500" />
                            View Saved
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-4 sticky top-8">
                        <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
                        {error && (
                            <div className="mt-4 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-8 min-h-[500px]">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center space-y-4 text-slate-400">
                                <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-purple-600 animate-spin" />
                                <p className="animate-pulse">Brewing fresh ideas...</p>
                            </div>
                        ) : ideas.length > 0 ? (
                            <ResultsGrid
                                ideas={ideas}
                                isLocked={!isUnlocked}
                                onUnlock={handleUnlock}
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                                <p className="text-lg mb-2">Ready to write?</p>
                                <p className="text-sm">Fill out the form to unlock 30 days of content.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
