import { getT } from "next-i18next/server";
import { Compass, ShieldCheck, Heart, Users, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { cn, localizedHref } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lng } = await params;
    const { t } = await getT("about", { lng });

    const title = t("title");
    const description = t("story");

    return {
        title,
        description,
        alternates: { canonical: "/about" },
        openGraph: {
            title,
            description,
            url: "/about",
            images: [{ url: "/images/about_image.png", width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/images/about_image.png"],
        },
    };
}

const VALUE_ICONS = [Compass, ShieldCheck, Heart, Users];

export default async function AboutPage({ params }: Props) {
    const { lng } = await params;
    const { t } = await getT("about", { lng });

    const values = [1, 2, 3, 4].map((i) => ({
        title: t(`values.item_${i}_title`),
        text: t(`values.item_${i}_text`),
    }));

    return (
        <section className="min-h-screen bg-background pb-10">
            <div className="relative min-h-screen flex items-end overflow-hidden mb-16">
                <img
                    src="/images/about_image.png"
                    alt={t("title")}
                    className="absolute inset-0 h-full w-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                <div className="relative z-10 w-full mx-auto max-w-7xl px-4 pb-20 md:pb-28">
                    <div className="flex items-center gap-2 text-white/80 text-sm font-bold tracking-wide uppercase mb-4">
                        <Compass className="h-4 w-4" />
                        {t("eyebrow")}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
                        {t("title")}
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
                        {t("story")}
                    </p>
                </div>
            </div>
            <div className="mx-auto max-w-4xl px-4">
                <div className="text-center mb-16">
                    <p className="text-lg text-foreground/80 leading-relaxed">{t("story")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {values.map((value, i) => {
                        const Icon = VALUE_ICONS[i];
                        return (
                            <div key={i} className="rounded-sm bg-muted/50 p-6">
                                <div className="h-11 w-11 rounded-none bg-primary/10 flex items-center justify-center mb-4">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-primary mb-1.5">{value.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{value.text}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="mb-16 grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-8 md:gap-12 items-center rounded-sm bg-muted/50 p-6 md:p-10">
                    <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-sm bg-white ring-1 ring-border">
                        <img
                            src={siteConfig.director.photo}
                            alt={siteConfig.director.name || t("director.title")}
                            className="aspect-square w-full object-cover object-top"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-accent text-sm font-bold tracking-wide uppercase mb-2">
                            {t("director.title")}
                        </div>
                        {siteConfig.director.name && (
                            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                                {siteConfig.director.name}
                            </h2>
                        )}
                        <h3 className="text-xl font-bold text-primary mb-2">{t("director.heading")}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">{t("director.text")}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <a
                                href={"tel:" + siteConfig.contact.phone.replace(/\s+/g, "")}
                                className="inline-flex items-center gap-2 rounded-none bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                {siteConfig.contact.phone}
                            </a>
                            {siteConfig.social.whatsapp && (
                                <a
                                    href={siteConfig.social.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-none border border-primary text-primary px-5 py-3 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="rounded-sm bg-primary text-white p-8 md:p-10 text-center">
                    <h2 className="text-2xl font-bold mb-2">{t("cta_title")}</h2>
                    <p className="text-white/80 mb-6 max-w-md mx-auto">{t("cta_subtitle")}</p>
                    <Link
                        href={localizedHref(lng, "/tours")}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-none bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors"
                        )}
                    >
                        <Compass className="h-4 w-4" />
                        {t("cta_button")}
                    </Link>
                </div>
            </div>
        </section>
    );
}