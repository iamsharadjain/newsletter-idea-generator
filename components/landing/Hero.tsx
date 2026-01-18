
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32 md:pt-32 md:pb-48">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center text-center space-y-8">

                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-800 shadow-sm">
                        <Sparkles className="mr-2 h-4 w-4 text-purple-600" />
                        <span>AI-Powered Newsletter Growth</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
                        Never Stare at a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Blank Page</span> Again
                    </h1>

                    <p className="max-w-[700px] text-lg text-slate-600 md:text-xl leading-relaxed">
                        Generate 30 days of newsletter topics in 5 minutes. Tailored to your niche, packed with hooks, and optimized for engagement.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link href="/generate">
                            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-slate-900 hover:bg-slate-800 transition-all">
                                Generate Ideas Free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                                How it Works
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                    {/* Placeholder avatars */}
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <p>Trusted by 1,000+ creators</p>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[500px] bg-purple-100/50 blur-[100px] rounded-full opacity-50 pointer-events-none" />
        </section>
    );
}
