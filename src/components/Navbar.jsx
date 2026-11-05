"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );
      } catch (err) {
        console.warn("Backend cookie clear skipped:", err);
      }

      await signOut();
      toast.success("Signed out successfully");
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    ...(session?.user
      ? [
          { label: "My Listings", href: "/my-listings" },
          { label: "My Bookings", href: "/my-bookings" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <svg
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
          <span className="text-2xl font-black tracking-tight text-base-content">
            Studio<span className="text-primary">Space</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-base-content/70 hover:text-base-content"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session?.user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full border border-primary/30">
                  <img
                    src={
                      session.user.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    }
                    alt={session.user.name || "User Avatar"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-200 border border-base-300 rounded-2xl w-64 space-y-1"
              >
                <li className="px-3 py-2 border-b border-base-300">
                  <p className="font-bold text-sm text-base-content">{session.user.name}</p>
                  <p className="text-xs text-base-content/60 truncate">{session.user.email}</p>
                </li>
                <li>
                  <Link href="/add-studio">Host a Studio</Link>
                </li>
                <li>
                  <Link href="/my-listings">My Listings</Link>
                </li>
                <li>
                  <Link href="/my-bookings">My Bookings</Link>
                </li>
                <li className="pt-1 border-t border-base-300">
                  <button onClick={handleLogout} className="text-error font-semibold">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="btn btn-ghost btn-sm rounded-xl font-bold text-xs"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm rounded-xl font-bold text-white shadow-md shadow-primary/20 text-xs"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}