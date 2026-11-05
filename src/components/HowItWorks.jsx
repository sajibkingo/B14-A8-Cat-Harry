export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Discover Spaces",
            desc: "Explore verified creative studios by category, lighting setups, gear inventory, and location.",
        },
        {
            num: "02",
            title: "Select Shoot Hours",
            desc: "Pick your production date and specify start and end hours with zero overlapping double-booking.",
        },
        {
            num: "03",
            title: "Book Instantly",
            desc: "Confirm your slot seamlessly with transparent hourly rates and clear security deposit terms.",
        },
        {
            num: "04",
            title: "Create & Produce",
            desc: "Check in on schedule, utilize high-performance studio gear, and bring your creative vision to life.",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-base-200 border-y border-base-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-xs">
                        Simple 4-Step Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mt-2">
                        How Booking Works
                    </h2>
                    <p className="text-base-content/70 text-sm mt-3">
                        Rent verified film sets, photo lofts, and podcast suites in minutes without lengthy paperwork.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.num}
                            className="relative p-6 rounded-2xl bg-base-100 border border-base-300 flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-4xl font-black text-primary/30 mb-4 block">
                                    {step.num}
                                </span>
                                <h3 className="font-bold text-lg text-base-content mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-base-content/70 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}