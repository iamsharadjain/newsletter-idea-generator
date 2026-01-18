
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

interface UnlockFormProps {
    onUnlock: () => void;
}

export default function UnlockForm({ onUnlock }: UnlockFormProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Failed to subscribe");
            }

            onUnlock();
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-slate-200">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Unlock all 30 ideas</h3>
            <p className="text-slate-600 mb-6">
                Enter your email to see the rest of your tailored newsletter topics. It's free!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-lg"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Unlock Now"}
                </Button>
            </form>
            <p className="text-xs text-slate-400 mt-4">
                We respect your inbox. Unsubscribe at any time.
            </p>
        </div>
    );
}
