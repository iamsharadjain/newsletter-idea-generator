
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
    niche: z.string().min(2, "Niche is required (e.g. 'SaaS Marketing')"),
    audience: z.string().optional(),
    count: z.coerce.number().min(1).max(30).default(5),
    pastTopics: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface GeneratorFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    isLoading: boolean;
}

export default function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            count: 5,
            audience: "",
            pastTopics: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-4">
                {/* Niche Input */}
                <div className="space-y-2">
                    <Label htmlFor="niche">Newsletter Niche <span className="text-red-500">*</span></Label>
                    <Input
                        id="niche"
                        placeholder="e.g. Sustainable Gardening, Crypto for Beginners..."
                        {...register("niche")}
                        className={errors.niche ? "border-red-500" : ""}
                    />
                    {errors.niche && <p className="text-sm text-red-500">{errors.niche.message}</p>}
                </div>

                {/* Audience Input */}
                <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience (Optional)</Label>
                    <Textarea
                        id="audience"
                        placeholder="e.g. Busy urban professionals, Stay-at-home moms..."
                        {...register("audience")}
                    />
                </div>

                {/* Count Selection (Simple Native Select for MVP) */}
                <div className="space-y-2">
                    <Label htmlFor="count">Number of Ideas</Label>
                    <select
                        {...register("count")}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="5">5 Ideas</option>
                        <option value="10">10 Ideas</option>
                        <option value="20">20 Ideas</option>
                        <option value="30">30 Ideas</option>
                    </select>
                </div>

                {/* Past Topics */}
                <div className="space-y-2">
                    <Label htmlFor="pastTopics">Past Successful Topics (Optional)</Label>
                    <Textarea
                        id="pastTopics"
                        placeholder="e.g. The 5-step guide to composting..."
                        {...register("pastTopics")}
                        className="h-20"
                    />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Ideas...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Ideas
                    </>
                )}
            </Button>
        </form>
    );
}
