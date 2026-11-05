import Link from "next/link";

export default function StudioCard({ studio }) {
    const { _id, title, category, hourlyRate, rating = 4.9, location, image } = studio;

    return (
        <div className="group rounded-2xl bg-base-200 border border-base-300 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-[430px]">
            <div className="relative h-56 w-full overflow-hidden bg-base-300">
                <img
                    src={image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="badge badge-primary text-xs font-bold uppercase tracking-wider py-3 px-3 shadow-md">
                        {category}
                    </span>
                </div>
                <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-xs font-bold text-base-content">{rating}</span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-1.5 text-xs text-base-content/60 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h3>
                </div>

                <div className="pt-4 border-t border-base-300 flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-xl font-extrabold text-primary">${hourlyRate}</span>
                        <span className="text-xs text-base-content/60 font-medium"> / hr</span>
                    </div>

                    <Link
                        href={`/studios/${_id}`}
                        className="btn btn-primary btn-sm rounded-lg text-white font-semibold shadow hover:shadow-primary/30 transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}