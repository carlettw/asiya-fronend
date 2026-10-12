"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, ArrowUpRight } from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import { localizedText, localizedHref, formatPrice } from "@/lib/utils";
import type { Tour } from "@/types";
import { TourImagePlaceholder } from "@/components/tours/TourImagePlaceholder";

export function TourCard({ tour, viewLabel }: { tour: Tour; viewLabel: string }) {
    const params = useParams<{ lng: string }>();
    const lng = params.lng ?? "en";
    const imageUrl = getMediaUrl(tour.cover_image ?? tour.images?.[0]);

    const title = localizedText(tour.title, lng);
    const shortDescription = localizedText(tour.short_description, lng);
    const countryName = tour.countries?.[0] ? localizedText(tour.countries[0].name, lng) : "";

    return (
        <Link
            href={localizedHref(lng, `/tours/${tour.slug}`)}
            className="group block h-full"
        >
            <div className="img-zoom relative aspect-4/5 bg-muted overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
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
                    {viewLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
            </div>
        </Link>
    );
}