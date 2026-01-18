
import Link from 'next/link';
import { Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-12">
            <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-slate-900">IdeaGen</span>
                    <span className="text-slate-500 text-sm">© 2024</span>
                </div>

                <div className="flex gap-6 text-sm text-slate-500">
                    <Link href="#" className="hover:text-slate-900">Privacy</Link>
                    <Link href="#" className="hover:text-slate-900">Terms</Link>
                    <Link href="#" className="hover:text-slate-900">Contact</Link>
                </div>

                <div className="flex gap-4 text-slate-400">
                    <Link href="#" className="hover:text-slate-900 transition-colors">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="hover:text-slate-900 transition-colors">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
