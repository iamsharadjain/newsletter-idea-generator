import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isIdeaSaved, removeIdea, saveIdea } from "@/lib/storage";

export interface Idea {
    topic: string;
    hook: string;
    keyPoints: string[];
    format: string;
}

interface IdeaCardProps {
    idea: Idea;
    index: number;
}

// Temporary simple badge since I didn't verify if it's installed
function SimpleBadge({ children }: { children: React.ReactNode }) {
    return <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">{children}</span>
}

export default function IdeaCard({ idea, index }: IdeaCardProps) {
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setSaved(isIdeaSaved(idea.topic));

        // Listen for global changes (e.g. if removed from dashboard)
        const handleStorageChange = () => {
            setSaved(isIdeaSaved(idea.topic));
        };

        window.addEventListener("saved-ideas-changed", handleStorageChange);
        return () => window.removeEventListener("saved-ideas-changed", handleStorageChange);
    }, [idea.topic]);

    const handleCopy = async () => {
        const text = `Topic: ${idea.topic}\n\nHook: ${idea.hook}\n\nKey Points:\n${idea.keyPoints.map(p => `- ${p}`).join('\n')}`;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleToggleSave = () => {
        if (saved) {
            removeIdea(idea.topic);
        } else {
            saveIdea(idea);
        }
        setSaved(!saved);
    };

    return (
        <Card className="h-full hover:shadow-md transition-shadow group relative">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1 pr-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-slate-500">Idea #{index + 1}</span>
                        <SimpleBadge>{idea.format}</SimpleBadge>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight text-slate-900">
                        {idea.topic}
                    </CardTitle>
                </div>
                <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-slate-400 hover:text-purple-600 transition-colors">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleToggleSave} className={`h-8 w-8 transition-colors ${saved ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-red-500"}`}>
                        <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">🪝 The Hook</h4>
                    <p className="text-sm text-slate-600 italic">"{idea.hook}"</p>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">🔑 Key Points</h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        {idea.keyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
