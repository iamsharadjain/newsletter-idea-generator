
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function EmailCapture() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
        setIsSuccess(true);
        setEmail("");
    };

    return (
        <section className="py-24 bg-slate-900 text-white">
            <div className="container px-4 md:px-6 mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    Join the waitlist
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                    Get early access to the idea generator and start writing consistently.
                </p>

                {isSuccess ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-lg inline-block">
                        <p className="font-semibold">You're in! Watch your inbox.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 h-10"
                        />
                        <Button type="submit" disabled={isLoading} className="bg-white text-slate-900 hover:bg-slate-100 h-10 px-8">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Joining..." : "Join Waitlist"}
                        </Button>
                    </form>
                )}
            </div>
        </section>
    );
}
