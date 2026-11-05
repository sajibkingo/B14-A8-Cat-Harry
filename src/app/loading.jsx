export default function Loading() {
    return (
        <div className="min-h-[80vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center justify-center mb-12 space-y-3">
                <div className="skeleton h-8 w-64 rounded-full bg-base-300"></div>
                <div className="skeleton h-4 w-96 rounded-full bg-base-300"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="rounded-2xl bg-base-200 border border-base-300 overflow-hidden flex flex-col justify-between h-[430px] p-4 space-y-4"
                    >
                        <div className="skeleton h-56 w-full rounded-xl bg-base-300"></div>
                        <div className="space-y-2">
                            <div className="skeleton h-4 w-1/3 rounded-full bg-base-300"></div>
                            <div className="skeleton h-6 w-3/4 rounded-full bg-base-300"></div>
                        </div>
                        <div className="pt-4 border-t border-base-300 flex items-center justify-between">
                            <div className="skeleton h-6 w-20 rounded-full bg-base-300"></div>
                            <div className="skeleton h-8 w-28 rounded-lg bg-base-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}