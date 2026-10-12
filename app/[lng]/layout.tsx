import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from "next-i18next/server";
import NextTopLoader from "nextjs-toploader";
import { I18nProvider } from "next-i18next/client";
import { Toaster } from "@/components/ui/sonner";
import i18nConfig from "../../i18n.config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Playfair_Display({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

initServerI18next(i18nConfig);

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://asiyatravel.uz"),
    title: {
      default: "Asiya Travel — O'zbekiston va Ipak yo'li bo'ylab sayohat",
      template: "%s | Asiya Travel",
    },

    description:
      "Asiya Travel orqali O'zbekiston va Ipak yo'li bo'ylab eng qiziqarli joylar, sayohat yo'nalishlari va turistik imkoniyatlarni kashf eting.",

    keywords: [
      "Asiya Travel",
      "O'zbekiston sayohat",
      "O'zbekiston turizm",
      "Markaziy Osiyo sayohat",
      "Samarqand tur",
      "Buxoro tur",
      "Xiva tur",
      "Toshkent tur",
      "Farg'ona vodiysi sayohat",
      "Ipak yo'li sayohat",
      "Silk Road tour Uzbekistan",
      "Central Asia travel",
      "Uzbekistan travel agency",
      "Uzbekistan guided tours",
      "Uzbekistan tourism",
      "arzon sayohat paketlari O'zbekiston",
      "guruh bilan sayohat O'zbekiston",
      "individual tur O'zbekiston",
      "O'zbekiston turistik joylari",
      "sayohat turlari Samarqand",
    ],

    authors: [
      {
        name: "Asiya Travel",
        url: "https://asiyatravel.uz",
      },
    ],

    creator: "Asiya Travel",
    publisher: "Asiya Travel",

    category: "travel",

    alternates: {
      canonical: "https://asiyatravel.uz/",
      languages: {
        uz: "https://asiyatravel.uz/uz",
        ru: "https://asiyatravel.uz/ru",
        en: "https://asiyatravel.uz/",
      },
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,

      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: "Asiya Travel — O'zbekiston va Ipak yo'li bo'ylab sayohat",
      description:
        "O'zbekiston va Ipak yo'lining eng qiziqarli joylari, sayohat yo'nalishlari va turistik imkoniyatlarini Asiya Travel bilan kashf eting.",
      url: "https://asiyatravel.uz/",
      siteName: "Asiya Travel",
      locale: "uz_UZ",
      type: "website",

      images: [
        {
          url: "/images/hero_image.png",
          width: 1200,
          height: 630,
          alt: "Asiya Travel — O'zbekiston va Ipak yo'li sayohatlari",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Asiya Travel — O'zbekiston va Ipak yo'li bo'ylab sayohat",
      description:
        "O'zbekiston va Ipak yo'lining eng qiziqarli joylari va sayohat yo'nalishlarini Asiya Travel bilan kashf eting.",
      images: ["/images/hero_image.png"],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { i18n } = await getT();

  if (process.env.NODE_ENV === "development") {
    await i18n.reloadResources(
      i18nConfig.supportedLngs,
      i18nConfig.ns
    );
  }

  const resources = getResources(i18n);

  return (
    <html lang={lng}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}>
        <NextTopLoader color="var(--primary)" showSpinner={false} height={3} />
        <I18nProvider
          fallbackLng={i18nConfig.fallbackLng}
          language={lng}
          resources={resources}
        >
          <AuthProvider>{children}</AuthProvider>

          <Toaster
            richColors
            position="top-center"
          />
        </I18nProvider>
      </body>
    </html>
  );
}