export default function HostGuarantee() {
    const assurances = [
        {
            title: "Comprehensive Liability Protection",
            desc: "Up to $10,000 in coverage for verified host facilities against accidental equipment and property damage.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: "Verified Creator Profiles",
            desc: "Every renter and host submits identity and background validation before executing high-capacity bookings.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            title: "Audio & Lighting Safety",
            desc: "Standardized electrical load safety, acoustic checkups, and verified power backup at all studio listings.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            title: "24/7 Creator Concierge Support",
            desc: "Our on-call support team assists with instant rescheduling, access issues, and emergency production inquiries.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section id="about-us" className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-primary font-bold tracking-wider uppercase text-xs">
                            StudioSpace Trust & Safety
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mt-2 leading-tight">
                            Host Guarantee & Complete Creator Support
                        </h2>
                        <p className="text-base-content/70 text-sm mt-4 leading-relaxed">
                            We ensure every studio exchange is protected by reliable industry standards, verified equipment safety checklists, and uninterrupted operational assistance.
                        </p>

                        <div className="mt-8 space-y-6">
                            {assurances.map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-base-content">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-base-content/70 mt-1 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden border border-base-300 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                                alt="Production Assurance"
                                className="w-full h-[480px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-base-200 border border-base-300 p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                            <div className="text-2xl font-black text-primary">100% Verified</div>
                            <p className="text-xs text-base-content/70 mt-1">
                                Every space inspected for acoustics, power distribution, and production standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}