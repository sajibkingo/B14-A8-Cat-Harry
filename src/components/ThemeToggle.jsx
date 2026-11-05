"use client";
import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "studiospace-theme";

function subscribe(onStoreChange) {
    window.addEventListener("storage", onStoreChange);
    return () => window.removeEventListener("storage", onStoreChange);
}

function getThemeSnapshot() {
    return localStorage.getItem(STORAGE_KEY) || "dark";
}

function getServerThemeSnapshot() {
    return "dark";
}

export default function ThemeToggle() {
    const theme = useSyncExternalStore(
        subscribe,
        getThemeSnapshot,
        getServerThemeSnapshot
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        localStorage.setItem(STORAGE_KEY, theme === "dark" ? "light" : "dark");
        // The "storage" event only fires in other tabs, so notify this one manually.
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm border border-base-300"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                // Sun Icon for Dark Mode
                <svg
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 4.5a1 1 0 011-1h0a1 1 0 011 1v1a1 1 0 011-1h0a1 1 0 01-1-1v-1zm0 14a1 1 0 011-1h0a1 1 0 011 1v1a1 1 0 011-1h0a1 1 0 01-1-1v-1zm8.5-7.5a1 1 0 01-1 1h-1a1 1 0 01-1-1h0a1 1 0 011-1h1a1 1 0 011 1zm-14 0a1 1 0 01-1 1h-1a1 1 0 01-1-1h0a1 1 0 011-1h1a1 1 0 011 1zm12.02-5.52a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zm-11.31 11.31a1 1 0 010 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71a1 1 0 011.41 0zm11.31 0a1 1 0 01-1.41 0l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 010 1.41zm-11.31-11.31a1 1 0 01-1.41 0l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 010 1.41zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
            ) : (
                // Moon Icon for Light Mode
                <svg
                    className="w-4 h-4 text-base-content fill-current"
                    viewBox="0 0 24 24"
                >
                    <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.45a8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1013.6 11.69 1 1 0 00.04-1.05z" />
                </svg>
            )}
        </button>
    );
}
