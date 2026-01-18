
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the AI know my niche?",
        answer: "You describe your audience and niche in the input form. Our AI engine uses this context to generate highly specific topics, avoiding generic advice.",
    },
    {
        question: "Can I edit the ideas?",
        answer: "Absolutely. Use the ideas as a starting point. You can copy them to your clipboard and refine them in your favorite writing tool.",
    },
    {
        question: "Is it really free?",
        answer: "Yes, you can generate 5 batches of ideas for free. We may introduce premium features later for power users.",
    },
    {
        question: "Do I need technical skills?",
        answer: "None at all. If you can fill out a simple form, you can generate months of content in minutes.",
    },
];

export default function FAQ() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium text-slate-800">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
