
import { ArrowRight, Pencil, Sparkles, Send } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Describe your audience",
        description: "Tell us your niche and who you're writing for. The more specific, the better.",
        icon: Pencil,
    },
    {
        number: "02",
        title: "AI generates topics",
        description: "Our engine analyzes your niche and creates 30 unique, engaging angles in seconds.",
        icon: Sparkles,
    },
    {
        number: "03",
        title: "Publish with confidence",
        description: "Pick your favorites, use the generated hooks, and send to your subscribers.",
        icon: Send,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        From blank page to "Sent" in 3 steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center relative">
                            <div className="h-24 w-24 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center mb-6 z-10">
                                <step.icon className="h-8 w-8 text-slate-800" />
                            </div>
                            {/* Step Number Badge */}
                            <div className="absolute top-0 right-[calc(50%-40px)] bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {step.number}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
