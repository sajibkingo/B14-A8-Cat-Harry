import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-base-100 text-center">
            <div className="max-w-lg mx-auto flex flex-col items-center">
                <div className="w-40 h-40 mb-6 rounded-3xl bg-base-200 border border-base-300 flex items-center justify-center relative shadow-xl">
                    <svg
                        className="w-20 h-20 text-primary animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="absolute -top-3 -right-3 badge badge-primary font-black px-3 py-3 text-white shadow-md">
                        404
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    Stage Not Found
                </h1>
                <p className="text-sm text-base-content/70 mt-3 leading-relaxed max-w-sm">
                    The creative studio, production stage, or schedule link you are looking for has been moved, wrapped up, or does not exist.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/"
                        className="btn btn-primary px-8 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        Return to Home
                    </Link>
                    <Link
                        href="/studios"
                        className="btn btn-outline border-base-300 rounded-xl font-bold hover:bg-base-300 transition-all"
                    >
                        Explore Studios
                    </Link>
                </div>
            </div>
        </div>
    );
}