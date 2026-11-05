import Link from "next/link";

export default function CategoryCards() {
    const categories = [
        {
            name: "Photo Studio",
            slug: "Photo Studio",
            icon: "📸",
            description: "Infinity cyc walls, profoto strobes, and natural light daylight lofts.",
        },
        {
            name: "Sound Stages",
            slug: "Film Stage",
            icon: "🎬",
            description: "Acoustically soundproof film stages with drive-in roll-up doors.",
        },
        {
            name: "Podcast Rooms",
            slug: "Podcast Lounge",
            icon: "🎙️",
            description: "Multi-mic podcast sets equipped with Shure SM7B mics and 4K cameras.",
        },
        {
            name: "Music Suites",
            slug: "Music Suite",
            icon: "🎧",
            description: "Vocal recording booths and control rooms treated for master monitoring.",
        },
        {
            name: "Art Workshops",
            slug: "Art Workshop",
            icon: "🎨",
            description: "Open floor creative atelier spaces for canvas painting, resin, and crafts.",
        },
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-primary font-bold tracking-wider uppercase text-xs">
                        Diverse Production Spaces
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mt-2">
                        Browse by Studio Categories
                    </h2>
                    <p className="text-base-content/70 text-sm mt-3">
                        Find the exact environment tailored to your shoot, recording, or creative production requirement.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/studios?category=${encodeURIComponent(cat.slug)}`}
                            className="group p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </span>
                                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-base-content/60 mt-2 leading-relaxed">
                                    {cat.description}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center text-xs font-semibold text-primary gap-1">
                                <span>Explore Spaces</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}