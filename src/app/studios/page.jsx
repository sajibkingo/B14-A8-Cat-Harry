import StudioCard from "@/components/StudioCard";
import Link from "next/link";

const CATEGORIES = [
    "All",
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Art Workshop",
];

async function getStudios(category) {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios`);
        if (category && category !== "All") {
            url.searchParams.set("category", category);
        }
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export default async function StudiosPage({ searchParams }) {
    const currentCategory = searchParams?.category || "All";
    const studios = await getStudios(currentCategory);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10 text-center max-w-3xl mx-auto">
                <span className="text-primary font-bold tracking-wider uppercase text-xs">
                    Creative Infrastructure
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-base-content mt-2">
                    Explore Studio Spaces
                </h1>
                <p className="text-base-content/70 text-sm mt-3">
                    Discover certified soundproof film stages, vocal booths, and daylight photo lofts with dynamic rates.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    return (
                        <Link
                            key={cat}
                            href={`/studios?category=${encodeURIComponent(cat)}`}
                            className={`btn btn-sm rounded-xl font-bold transition-all ${isActive
                                    ? "btn-primary text-white shadow-md shadow-primary/20"
                                    : "btn-ghost border border-base-300 text-base-content/70 hover:border-primary/50"
                                }`}
                        >
                            {cat}
                        </Link>
                    );
                })}
            </div>

            {studios.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {studios.map((studio) => (
                        <StudioCard key={studio._id} studio={studio} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-base-200 border border-base-300 rounded-3xl">
                    <h3 className="text-lg font-bold text-base-content">No studios found in this category</h3>
                    <p className="text-xs text-base-content/60 mt-2">
                        Try switching categories or list a new studio in this workspace classification.
                    </p>
                    <Link href="/add-studio" className="btn btn-primary btn-sm mt-6 text-white rounded-xl">
                        List a Space
                    </Link>
                </div>
            )}
        </div>
    );
}