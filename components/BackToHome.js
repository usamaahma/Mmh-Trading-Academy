import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// Top bar for pages that hide the main Navbar (login, signup) so users can get back to the site.
export default function BackToHome() {
    return (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-6 sm:px-10">
            <Link
                href="/"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
                <ArrowLeft size={14} /> Back to Home
            </Link>
            <Link href="/" aria-label="MMH Trading Academy home">
                <Image src="/mmhlogo.png" alt="MMH Trading Academy" width={110} height={40} className="h-auto w-[90px] sm:w-[110px]" />
            </Link>
        </div>
    );
}
