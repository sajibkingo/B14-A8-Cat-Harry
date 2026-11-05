"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const body = new FormData();
        body.append("image", file);

        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "6d207e02198a847aa5ad3ac2222c8252";
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: body,
            });
            const data = await res.json();
            if (data.success) {
                setFormData((prev) => ({ ...prev, image: data.data.url }));
                toast.success("Profile photo uploaded!");
            } else {
                toast.error("ImgBB upload failed. Provide a direct image URL instead.");
            }
        } catch {
            toast.error("Failed to upload image.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (formData.image.startsWith("data:image")) {
            toast.error("Base64 image is too large. Please upload the file or use a web image URL.");
            return;
        }

        setLoading(true);

        try {
            const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400";
            const photoToUse = formData.image.trim() || defaultAvatar;

            await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: photoToUse,
                fetchOptions: {
                    onSuccess: async () => {
                        // Live backend JWT cookie issuance
                        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://b14-a8-cat-harry-server.vercel.app/api";
                        try {
                            await fetch(`${backendUrl}/auth/jwt`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                                body: JSON.stringify({ email: formData.email, name: formData.name }),
                            });
                        } catch (err) {
                            console.error("JWT sync issue:", err);
                        }

                        toast.success("Account created successfully!");
                        router.push("/");
                        router.refresh();
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message || "Registration failed");
                        setLoading(false);
                    },
                },
            });
        } catch (err) {
            toast.error(err.message || "An unexpected error occurred");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-16 px-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-base-200 border border-base-300 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-base-content tracking-tight">Create an Account</h1>
                    <p className="text-xs text-base-content/60 mt-2">
                        Join StudioSpace as a creator or workspace host
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="label py-1">
                            <span className="label-text font-semibold text-xs">Full Name</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Sajib Saha"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-primary"
                        />
                    </div>

                    <div>
                        <label className="label py-1">
                            <span className="label-text font-semibold text-xs">Email Address</span>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-primary"
                        />
                    </div>

                    <div>
                        <label className="label py-1">
                            <span className="label-text font-semibold text-xs">Photo URL / Upload</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-primary mb-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="file-input file-input-bordered file-input-xs w-full bg-base-100"
                        />
                        {uploadingImage && <span className="text-[10px] text-primary">Uploading to cloud...</span>}
                    </div>

                    <div>
                        <label className="label py-1">
                            <span className="label-text font-semibold text-xs">Password</span>
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input input-bordered w-full bg-base-100 text-sm focus:outline-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg mt-4"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
                    </button>
                </form>

                <p className="text-center text-xs text-base-content/60 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}