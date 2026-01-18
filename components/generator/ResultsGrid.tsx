import { Idea } from "./IdeaCard";
import IdeaCard from "./IdeaCard";
import { Button } from "@/components/ui/button";
import UnlockForm from "./UnlockForm";

interface ResultsGridProps {
    ideas: Idea[];
    isLocked?: boolean;
    onUnlock: () => void;
}

export default function ResultsGrid({ ideas, isLocked = false, onUnlock }: ResultsGridProps) {
    if (!ideas || ideas.length === 0) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Generated Topics ({ideas.length})
                </h2>
                {!isLocked && <Button variant="outline" onClick={() => window.print()}>Save as PDF</Button>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {ideas.map((idea, index) => {
                    // If locked, we blur items after the first 3
                    const shouldBlur = isLocked && index >= 3;

                    return (
                        <div key={index} className={shouldBlur ? "blur-md pointer-events-none select-none opacity-50" : ""}>
                            <IdeaCard idea={idea} index={index} />
                        </div>
                    )
                })}

                {/* Unlocking Overlay */}
                {isLocked && ideas.length > 3 && (
                    <div className="absolute inset-0 top-[200px] z-10 flex items-center justify-center p-4">
                        <UnlockForm onUnlock={onUnlock} />
                    </div>
                )}
            </div>

            {/* Bottom Action (Only visible if unlocked) */}
            {!isLocked && (
                <div className="flex justify-center pt-8">
                    <p className="text-slate-500 text-sm">Want more? Tweak your inputs and generate again!</p>
                </div>
            )}
        </div>
    );
}
