import Link from "next/link";

export default function EmptyState({
    title = "No Workspaces Found",
    description = "We couldn't find any creative studios matching your selected criteria or search term.",
    actionLabel = "Browse All Workspaces",
    actionHref = "/studios",
    secondaryLabel,
    secondaryHref,
}) {
    return (
        <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6 bg-base-200/50 border border-dashed border-base-300 rounded-3xl my-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-inner">
                <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-base-content tracking-tight mb-2">
                {title}
            </h3>
            <p className="text-sm text-base-content/65 max-w-md leading-relaxed mb-8">
                {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
                {actionHref && (
                    <Link
                        href={actionHref}
                        className="btn btn-primary px-6 text-white font-bold rounded-xl shadow-md shadow-primary/20 hover:scale-105 transition-all text-xs"
                    >
                        {actionLabel}
                    </Link>
                )}
                {secondaryHref && (
                    <Link
                        href={secondaryHref}
                        className="btn btn-outline border-base-300 px-6 rounded-xl font-bold hover:bg-base-200 text-xs transition-all"
                    >
                        {secondaryLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}