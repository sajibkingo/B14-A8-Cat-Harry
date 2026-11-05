"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error(error.message || "Failed to logout");
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Studios", href: "/studios" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "About Us", href: "/#about-us" },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/90 border-b border-base-300">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow-2xl border border-base-300"
                        >
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={pathname === link.href ? "text-primary font-bold" : ""}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-2.5">
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
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${isActive
                                                ? "text-primary font-semibold bg-primary/10 shadow-sm"
                                                : "text-base-content/80 hover:text-primary hover:bg-base-200"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    <ThemeToggle />

                    {session?.user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                            >
                                <div className="w-9 rounded-full">
                                    <img
                                        alt={session.user.name || "User Avatar"}
                                        src={
                                            session.user.image ||
                                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                                        }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-200 rounded-xl z-50 mt-3 w-60 p-2 shadow-2xl border border-base-300"
                            >
                                <li className="px-4 py-2 border-b border-base-300 mb-1">
                                    <span className="font-bold text-base text-base-content px-0">
                                        {session.user.name}
                                    </span>
                                    <span className="text-xs text-base-content/60 px-0 truncate">
                                        {session.user.email}
                                    </span>
                                </li>
                                <li>
                                    <Link href="/add-studio" className="py-2.5">
                                        Add New Studio
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my-listings" className="py-2.5">
                                        My Studio Listings
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my-bookings" className="py-2.5">
                                        My Bookings
                                    </Link>
                                </li>
                                <li className="border-t border-base-300 mt-1 pt-1">
                                    <button
                                        onClick={handleLogout}
                                        className="py-2.5 text-error font-medium hover:bg-error/10"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="btn btn-ghost btn-sm font-semibold">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-primary btn-sm rounded-lg text-white font-semibold shadow-sm"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}