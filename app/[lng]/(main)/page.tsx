import { Hero } from "@/components/sections/Hero";
import { PopularTours } from "@/components/sections/PopularTours";
import { Destinations } from "@/components/sections/Destinations";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { getHomePageData } from "@/lib/home-data";
import { Reveal } from "@/components/shared/Reveal";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Home({ params }: Props) {
  const { lng } = await params;
  const { featuredTours, totalTours, countries, reviews, siteStats } = await getHomePageData(lng);

  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {featuredTours.length > 0 && <Reveal><PopularTours tours={featuredTours} /></Reveal>}
        <Reveal delay={100}><Stats totalTours={totalTours} reviews={reviews} siteStats={siteStats} /></Reveal>
        {countries.length > 0 && <Reveal><Destinations countries={countries} /></Reveal>}
        {reviews.length > 0 && <Reveal><Testimonials reviews={reviews} /></Reveal>}
      </div>
    </>
  );
}