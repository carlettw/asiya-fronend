export const siteConfig = {
    logo: {
        src: "/images/logo.png",
        alt: "AsiyaTravel",
        useImage: false,
        name: "Asiya",
        nameHighlight: "Travel",
        initials: "AT",
    },

    description: {
        uz: "Ipak yo'li bo'ylab unutilmas sayohatlar - Samarqand, Buxoro, Xiva va butun O'zbekiston tarixi, hunarmandchiligi va mehmondo'stligi bir joyda.",
        ru: "Незабываемые путешествия по Великому шёлковому пути - история, ремёсла и гостеприимство Самарканда, Бухары, Хивы и всего Узбекистана.",
        en: "Unforgettable journeys along the Silk Road - the history, craftsmanship, and hospitality of Samarkand, Bukhara, Khiva, and all of Uzbekistan.",
    },

    companyName: {
        uz: "Asiya Travel sayohat agentligi",
        ru: "Туристическое агентство Asiya Travel",
        en: "Asiya Travel Agency",
    },

    operator: {
        name: "Asiya Travel Team",
    },

    // Direktor ismini shu yerga yozing (bo'sh bo'lsa, faqat lavozim ko'rinadi)
    director: {
        name: "",
        photo: "/images/director.jpg",
    },

    contact: {
        email: "info@asiyatravel.uz",
        phone: "+998 99 592 37 29",
        phoneSecondary: "",
        address: {
            uz: "Samarqand, O'zbekiston",
            ru: "Самарканд, Узбекистан",
            en: "Samarkand, Uzbekistan",
        },
    },

    social: {
        instagram: "https://instagram.com/asiyatravel",
        facebook: "https://facebook.com/asiyatravel",
        telegram: "https://t.me/asiyatravel",
        youtube: "",
        tiktok: "",
        whatsapp: "https://wa.me/998995923729",
    },
};

export type SiteConfig = typeof siteConfig;
export type SupportedLocale = "uz" | "ru" | "en";

export function getLocalizedSiteField(
    field: Record<SupportedLocale, string>,
    lng: string
): string {
    return field[lng as SupportedLocale] ?? field.uz;
}