import Link from "next/link";

export default function StudioCard({ studio }) {
    const getRating = () => {
        if (studio?.rating) return studio.rating;
        const categoryRatings = {
            "Photo Studio": 4.9,
            "Film Stage": 4.8,
            "Podcast Lounge": 4.7,
            "Music Suite": 4.95,
            "Art Workshop": 4.65,
        };
        if (studio?.category && categoryRatings[studio.category]) {
            return categoryRatings[studio.category];
        }
        return 4.85;
    };

    const currentRating = getRating();

    return (
        <div className="card w-full bg-base-200 border border-base-300 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-[450px] group">

            {/* Fixed Height Uniform Image Banner */}
            <div className="relative h-56 w-full overflow-hidden bg-base-300 shrink-0">
                <img
                    src={
                        studio?.image ||
                        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800"
                    }
                    alt={studio?.title || "Studio workspace"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="badge badge-primary text-xs font-bold uppercase tracking-wider py-2.5 px-3 shadow-md">
                        {studio?.category || "Workspace"}
                    </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-amber-300 flex items-center gap-1 border border-white/10 shadow-sm">
                    <span>★</span>
                    <span>{currentRating}</span>
                </div>
            </div>

            {/* Card Content with balanced spacing */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-1.5 text-xs text-base-content/60 mb-2">
                        <svg
                            className="w-3.5 h-3.5 text-primary shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="line-clamp-1">{studio?.location || "Dhaka, Bangladesh"}</span>
                    </div>

                    <h3 className="font-bold text-lg text-base-content line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
                        {studio?.title}
                    </h3>
                    <p className="text-xs text-base-content/60 line-clamp-2 mt-2 leading-relaxed">
                        {studio?.description ||
                            "Dedicated creative facility tailored for commercial shoots and professional media production."}
                    </p>
                </div>

                {/* Pricing & Action Button */}
                <div className="pt-4 border-t border-base-300/80 flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-2xl font-black text-primary">${studio?.hourlyRate}</span>
                        <span className="text-xs text-base-content/60 font-medium"> / hr</span>
                    </div>
                    <Link
                        href={`/studios/${studio?._id}`}
                        className="btn btn-primary btn-sm rounded-xl font-bold text-white shadow-md shadow-primary/20 hover:scale-105 transition-all text-xs"
                    >
                        View Details
                    </Link>
                </div>
            </div>

        </div>
    );
}