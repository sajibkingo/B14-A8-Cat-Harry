"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const res = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (res.error) {
                const errorText = res.error.message || "Invalid email or password";
                setErrorMsg(errorText);
                toast.error(errorText);
                setLoading(false);
                return;
            }

            toast.success("Logged in successfully!");
            router.push("/");
            router.refresh();
        } catch (error) {
            const errorText = error.message || "An unexpected error occurred";
            setErrorMsg(errorText);
            toast.error(errorText);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error(error.message || "Failed to initiate Google login");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="w-full max-w-md bg-base-200 border border-base-300 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-base-content tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-xs text-base-content/60 mt-2">
                        Sign in to access your listings and creative studio bookings
                    </p>
                </div>

                {errorMsg && (
                    <div className="p-3 mb-4 rounded-xl bg-error/10 border border-error/20 text-error text-xs font-semibold">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label py-1">
                            <span className="label-text font-semibold text-xs">Email Address</span>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="creator@studiospace.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input input-bordered w-full bg-base-100 focus:outline-primary"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between py-1">
                            <label className="label-text font-semibold text-xs">Password</label>
                            <button
                                type="button"
                                onClick={() =>
                                    toast("Password reset is disabled for evaluation purposes", {
                                        icon: "ℹ️",
                                    })
                                }
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input input-bordered w-full bg-base-100 focus:outline-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full text-white font-bold rounded-xl shadow-md mt-2"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
                    </button>
                </form>

                <div className="divider my-6 text-xs text-base-content/50">OR CONTINUE WITH</div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-outline border-base-300 bg-base-100 w-full rounded-xl hover:bg-base-300 font-semibold flex items-center justify-center gap-3"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    Google
                </button>

                <p className="text-center text-xs text-base-content/70 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}