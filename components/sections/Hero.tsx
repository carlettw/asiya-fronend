"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalizedHref } from "@/hooks/use-localized-href";
import { HeroSearch } from "./HeroSearch";

const SLIDE_COUNT = 6;
const ROTATE_INTERVAL = 5000;

export function Hero() {
    const { t } = useT("home");
    const withLocale = useLocalizedHref();
    const [index, setIndex] = useState(0);

    const goTo = useCallback((next: number) => {
        setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
    }, []);

    useEffect(() => {
        const id = setInterval(() => setIndex((prev) => (prev + 1) % SLIDE_COUNT), ROTATE_INTERVAL);
        return () => clearInterval(id);
    }, [index]);

    return (
        <section className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/images/hero_image.png"
                    alt="Registon maydoni, Samarqand"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/20" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
            </div>

            {/* slide indicator (right edge) */}
            <div className="hidden md:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white">
                <span className="font-display text-sm tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1">
                    {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`${i + 1}-slayd`}
                            onClick={() => goTo(i)}
                            className="group py-1 cursor-pointer"
                        >
                            <span
                                className={cn(
                                    "block w-0.5 transition-all duration-500",
                                    i === index ? "h-8 bg-accent" : "h-4 bg-white/40 group-hover:bg-white/70"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <span className="font-display text-sm text-white/60 tabular-nums">{String(SLIDE_COUNT).padStart(2, "0")}</span>
            </div>

            <div className="relative z-10 flex-1 flex items-center pt-28">
                <div className="mx-auto max-w-7xl px-4 w-full">
                    <div className="eyebrow mb-6 text-white!">{t("hero.eyebrow")}</div>

                    <div key={index} className="animate-in fade-in slide-in-from-bottom-3 duration-700">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] max-w-4xl min-h-[2.1em] line-clamp-2">
                            {t(`hero.slide_${index + 1}_title`)}
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed min-h-14 line-clamp-2">
                            {t(`hero.slide_${index + 1}_subtitle`)}
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <Link
                            href={withLocale("/tours")}
                            className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-colors duration-300"
                        >
                            {t("hero.cta_primary")}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href={withLocale("/about")}
                            className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                        >
                            {t("hero.cta_secondary")}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 md:pb-16">
                <HeroSearch />
            </div>
        </section>
    );
}
