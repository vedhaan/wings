"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";

type Tab = "kids" | "professionals" | "women";

const TABS: { id: Tab; label: string; short: string; activeClass: string }[] = [
    {
        id: "kids",
        label: "Kids",
        short: "Kids",
        activeClass: "bg-wing-cyan text-wing-navy",
    },
    {
        id: "professionals",
        label: "Professionals",
        short: "Pros",
        activeClass: "bg-wing-violet text-white",
    },
    {
        id: "women",
        label: "Women",
        short: "Women",
        activeClass: "bg-wing-rose text-white",
    },
];

export default function Navbar() {
    const [active, setActive] = useState<Tab | null>(null);
    const [scrolled, setScrolled] = useState(false);
    

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);

            const kids = document.getElementById("kids");
            const women = document.getElementById("women");

            // above the course sections
            if (kids && kids.getBoundingClientRect().top > window.innerHeight * 0.6) {
                setActive(null);
            }
            // below the course sections
            if (women && women.getBoundingClientRect().bottom < window.innerHeight * 0.4) {
                setActive(null);
            }
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const els = TABS.map((t) => document.getElementById(t.id)).filter(
            Boolean
        ) as HTMLElement[];
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id as Tab);
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled
                ? "border-b-2 border-wing-navy bg-wing-cream/90 backdrop-blur"
                : "border-b-2 border-transparent bg-transparent"
                }`}
        >
            <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6">
                <Logo />

                <div
                    role="tablist"
                    aria-label="Choose your audience"
                    className="flex items-center gap-1 rounded-full border-2 border-wing-navy bg-white p-1 shadow-pop-sm"
                >
                    {TABS.map((t) => {
                        const isActive = active === t.id;
                        return (
                            <a
                                key={t.id}
                                href={`#${t.id}`}
                                role="tab"
                                aria-selected={isActive}
                                className="relative rounded-full px-2.5 py-1.5 font-display text-xs font-bold sm:px-4 sm:text-sm"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="audience-pill"
                                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                        className={`absolute inset-0 rounded-full ${t.activeClass}`}
                                    />
                                )}
                                <span
                                    className={`relative ${isActive && t.id !== "kids" ? "text-white" : ""}`}
                                >
                                    <span className="sm:hidden">{t.short}</span>
                                    <span className="hidden sm:inline">{t.label}</span>
                                </span>
                            </a>
                        );
                    })}
                </div>

                <WhatsAppButton
                    audience={active ?? "general"}
                    label="Chat on WhatsApp"
                    compact
                />
            </nav>
        </motion.header>
    );
}