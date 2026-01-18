
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ListOrdered, Calendar, MousePointerClick } from "lucide-react";

const features = [
    {
        title: "Instant Topic Ideas",
        description: "Get 30 unique, tailored newsletter topics in seconds. No more brainstorming sessions.",
        icon: Zap,
    },
    {
        title: "Compelling Hooks",
        description: "Each idea comes with a pre-written hook to grab your reader's attention immediately.",
        icon: MousePointerClick,
    },
    {
        title: "Structured Outlines",
        description: "Don't just get a title. Get bullet points and key takeaways for every topic.",
        icon: ListOrdered,
    },
    {
        title: "Content Calendar",
        description: "Visualize your month of content. Drag and drop to plan your publishing schedule.",
        icon: Calendar,
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything you need to write consistently
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Stop worrying about what to write and focus on creating great content.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
