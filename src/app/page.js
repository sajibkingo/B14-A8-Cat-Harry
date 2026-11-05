import HeroSlider from "@/components/HeroSlider";
import StudioCard from "@/components/StudioCard";
import CategoryCards from "@/components/CategoryCards";
import HowItWorks from "@/components/HowItWorks";
import HostGuarantee from "@/components/HostGuarantee";
import Link from "next/link";
import { Suspense } from "react";

async function getFeaturedStudios() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function FeaturedStudios() {
  const featuredStudios = await getFeaturedStudios();

  if (!featuredStudios || featuredStudios.length === 0) {
    return (
      <div className="text-center py-16 bg-base-200 rounded-2xl border border-base-300">
        <p className="text-base-content/60 text-sm">
          No featured studios found. Start by listing a studio or checking backend database connection.
        </p>
        <Link href="/add-studio" className="btn btn-primary btn-sm mt-4 text-white">
          List a Studio
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredStudios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

function FeaturedStudiosSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 rounded-2xl bg-base-200 animate-pulse" />
      ))}
    </div>
  );
}

function HeroSliderSkeleton() {
  return (
    <section className="relative w-full bg-black h-[540px] md:h-[620px] animate-pulse" aria-hidden="true" />
  );
}

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <Suspense fallback={<HeroSliderSkeleton />}>
        <HeroSlider />
      </Suspense>

      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-xs">
                Handpicked Workspaces
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mt-2">
                Featured Studios
              </h2>
            </div>
            <Link
              href="/studios"
              className="btn btn-outline btn-primary btn-sm rounded-lg font-bold"
            >
              View All Workspaces →
            </Link>
          </div>

          <Suspense fallback={<FeaturedStudiosSkeleton />}>
            <FeaturedStudios />
          </Suspense>
        </div>
      </section>

      <CategoryCards />
      <HowItWorks />
      <HostGuarantee />
    </div>
  );
}
