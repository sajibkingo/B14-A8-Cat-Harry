"use client";
import Link from "next/link";

export default function Footer() {
    const handleSubscribe = (e) => {
        e.preventDefault();
    };

    return (
        <footer className="bg-base-200 border-t border-base-300 text-base-content mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    <div className="lg:col-span-2 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="flex items-center gap-2.5 mb-4 inline-flex">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                                        <path
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-black tracking-tight text-base-content">
                                    Studio<span className="text-primary">Space</span>
                                </span>
                            </Link>
                            <p className="text-sm text-base-content/70 max-w-sm leading-relaxed mb-6">
                                StudioSpace connects creators, filmmakers, photographers, and podcasters with high-performance creative production facilities worldwide. Seamless booking with complete transparency.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                                aria-label="X (formerly Twitter)"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg bg-base-300 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-sm text-base-content/70">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios" className="hover:text-primary transition-colors">
                                    Explore Studios
                                </Link>
                            </li>
                            <li>
                                <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about-us" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
                            Categories
                        </h4>
                        <ul className="space-y-2.5 text-sm text-base-content/70">
                            <li>
                                <Link href="/studios?category=Photo+Studio" className="hover:text-primary transition-colors">
                                    Photo Studios
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios?category=Film+Stage" className="hover:text-primary transition-colors">
                                    Sound & Film Stages
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios?category=Podcast+Lounge" className="hover:text-primary transition-colors">
                                    Podcast Lounges
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios?category=Music+Suite" className="hover:text-primary transition-colors">
                                    Music Recording Suites
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios?category=Art+Workshop" className="hover:text-primary transition-colors">
                                    Art Workshops
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-base-content mb-4">
                            Stay Updated
                        </h4>
                        <p className="text-sm text-base-content/70 mb-3">
                            Subscribe to get exclusive studio discounts and creator news.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="creator@studiospace.com"
                                className="input input-bordered input-sm w-full bg-base-100 focus:outline-primary"
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm w-full text-white font-semibold"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-base-300 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-content/60">
                    <p>© 2026 StudioSpace. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-primary cursor-pointer">Terms of Service</span>
                        <span className="hover:text-primary cursor-pointer">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}