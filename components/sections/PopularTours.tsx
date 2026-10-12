"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import { localizedText, localizedHref, formatPrice } from "@/lib/utils";
import { TourImagePlaceholder } from "@/components/tours/TourImagePlaceholder";
import type { Tour } from "@/types";
import { Button } from "../ui/button";

export function PopularTours({ tours }: { tours: Tour[] }) {
    const { t } = useT("home");
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";
    const scrollerRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const wasDragged = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    function scroll(direction: "left" | "right") {
        const el = scrollerRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }

    function onMouseDown(e: React.MouseEvent) {
        const el = scrollerRef.current;
        if (!el) return;
        isDragging.current = true;
        wasDragged.current = false;
        setIsMouseDown(true);
        startX.current = e.pageX - el.offsetLeft;
        startScrollLeft.current = el.scrollLeft;
    }

    function endDrag() {
        isDragging.current = false;
        setIsMouseDown(false);
    }

    function onMouseMove(e: React.MouseEvent) {
        const el = scrollerRef.current;
        if (!el || !isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > 5) wasDragged.current = true;
        el.scrollLeft = startScrollLeft.current - walk;
    }

    function onCardClick(e: React.MouseEvent) {
        if (wasDragged.current) {
            e.preventDefault();
        }
    }

    return (
        <section className="py-20 md:py-28 bg-muted/60 border-y border-border">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="eyebrow mb-4">{t("popular.eyebrow")}</div>
                        <h2 className="text-4xl md:text-6xl leading-[1.05] text-foreground max-w-2xl">
                            {t("popular.title")}
                        </h2>
                    </div>

                    <div className="hidden sm:flex items-center gap-0 shrink-0">
                        <Button
                            onClick={() => scroll("left")}
                            aria-label="Chapga"
                            className="h-12 w-12 rounded-none border border-foreground bg-transparent flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={() => scroll("right")}
                            aria-label="O'ngga"
                            className="h-12 w-12 rounded-none border border-l-0 border-foreground bg-transparent flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollerRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                className={`flex gap-8 overflow-x-auto pb-4 px-4 md:px-[max(1rem,calc((100vw-80rem)/2+1rem))] snap-x snap-mandatory scroll-smooth select-none [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden ${isMouseDown ? "cursor-grabbing scroll-auto" : "cursor-grab"
                    }`}
            >
                {tours.map((tour) => {
                    const title = localizedText(tour.title, lng);
                    const shortDescription = localizedText(tour.short_description, lng);
                    const countryName = tour.countries?.[0]
                        ? localizedText(tour.countries[0].name, lng)
                        : "";
                    const imageUrl = getMediaUrl(tour.cover_image ?? tour.images?.[0]);

                    return (
                        <Link
                            key={tour.id}
                            href={localizedHref(lng, `/tours/${tour.slug}`)}
                            onClick={onCardClick}
                            draggable={false}
                            className="group snap-start shrink-0 w-72 md:w-85"
                        >
                            <div className="img-zoom relative aspect-4/5 bg-muted overflow-hidden">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        draggable={false}
                                        className="h-full w-full object-cover pointer-events-none"
                                    />
                                ) : (
                                    <TourImagePlaceholder className="h-full w-full" />
                                )}
                                <div className="absolute left-0 bottom-0 z-10 bg-background text-foreground px-4 py-2.5 font-display text-xl">
                                    {formatPrice(tour.price, tour.currency)}
                                </div>
                            </div>

                            <div className="pt-5">
                                {countryName && (
                                    <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                                        <MapPin className="h-3 w-3" />
                                        {countryName}
                                    </div>
                                )}
                                <h3 className="font-display text-2xl leading-snug text-foreground mb-2 group-hover:text-accent transition-colors">
                                    {title}
                                </h3>
                                {shortDescription && (
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {shortDescription}
                                    </p>
                                )}
                                <span className="link-underline inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                                    {t("popular.view")}
                                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    );
                })}

                <Link
                    href={localizedHref(lng, "/tours")}
                    onClick={onCardClick}
                    draggable={false}
                    className="group snap-start shrink-0 w-72 md:w-85 aspect-4/5 bg-primary text-primary-foreground flex flex-col justify-between p-8 hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
                >
                    <ArrowUpRight className="h-10 w-10 self-end group-hover:rotate-45 transition-transform duration-500" />
                    <span className="font-display text-4xl leading-tight">{t("popular.view_all")}</span>
                </Link>
            </div>
        </section>
    );
}
