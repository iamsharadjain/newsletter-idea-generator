
"use client";

import { useEffect, useState } from "react";
import { Idea } from "@/components/generator/IdeaCard";
import IdeaCard from "@/components/generator/IdeaCard";
import { getSavedIdeas } from "@/lib/storage";
import Link from "next/link";
import { ArrowLeft, BookHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadIdeas = () => {
        setSavedIdeas(getSavedIdeas());
        setIsLoaded(true);
    };

    useEffect(() => {
        loadIdeas();

        // Listen for updates (renders reactive if item removed via card)
        window.addEventListener("saved-ideas-changed", loadIdeas);
        return () => window.removeEventListener("saved-ideas-changed", loadIdeas);
    }, []);

    if (!isLoaded) return null; // Prevent hydration mismatch

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                            <BookHeart className="h-8 w-8 text-red-500" />
                            Saved Ideas
                        </h1>
                    </div>
                    <Link href="/generate">
                        <Button>Generate New</Button>
                    </Link>
                </div>

                {savedIdeas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-xl">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <BookHeart className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No saved ideas yet</h3>
                        <p className="text-slate-500 mb-6 max-w-md">
                            You haven't saved any topics. Go to the generator and click the heart icon to save your favorites!
                        </p>
                        <Link href="/generate">
                            <Button size="lg">Start Generating</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedIdeas.map((idea, index) => (
                            <IdeaCard key={`${idea.topic}-${index}`} idea={idea} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
