import HeroSlider from "@/components/HeroSlider";
import CategoryCards from "@/components/CategoryCards";
import HowItWorks from "@/components/HowItWorks";
import HostGuarantee from "@/components/HostGuarantee";
import StudioCard from "@/components/StudioCard";
import Link from "next/link";

async function getFeaturedStudios() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios?limit=6`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredStudios = await getFeaturedStudios();

  return (
    <div className="space-y-24 pb-20">
      <HeroSlider />

      {/* 1. Featured Studio Spaces (Ekhon Categories er upore) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-xs">
              Prime Workspaces
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight mt-2">
              Featured Studio Spaces
            </h2>
            <p className="text-base-content/70 text-sm mt-3 max-w-xl leading-relaxed">
              Explore our highest-rated soundstages, photo lofts, and audio suites ready for immediate booking.
            </p>
          </div>
          <Link
            href="/studios"
            className="btn btn-outline border-base-300 rounded-xl font-bold text-xs hover:bg-base-200 self-start md:self-auto"
          >
            View All Workspaces
          </Link>
        </div>

        {featuredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStudios.map((studio) => (
              <div key={studio._id} className="w-full">
                <StudioCard studio={studio} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-base-200 border border-base-300 rounded-3xl">
            <p className="text-sm text-base-content/60">No featured studios currently listed.</p>
          </div>
        )}
      </section>

      {/* 2. Browse Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryCards />
      </section>

      {/* 3. How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HowItWorks />
      </section>

      {/* 4. Host Protection Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HostGuarantee />
      </section>
    </div>
  );
}