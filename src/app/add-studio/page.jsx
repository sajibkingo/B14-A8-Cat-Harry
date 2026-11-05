"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";

const AVAILABLE_AMENITIES = [
    "Air Conditioned",
    "Soundproof",
    "Cyclorama Wall",
    "High Speed WiFi",
    "Natural Light",
    "Audio Recording Desk",
    "Hair & Makeup Station",
    "Free Parking",
    "Green Screen",
    "Strobe Lighting Gear",
];

const CATEGORIES = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Art Workshop",
];

export default function AddStudioPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: CATEGORIES[0],
        hourlyRate: "",
        securityDeposit: "",
        maxCapacity: "",
        location: "",
        image: "",
        amenities: [],
        description: "",
    });

    const handleAmenityToggle = (amenity) => {
        setFormData((prev) => {
            const exists = prev.amenities.includes(amenity);
            return {
                ...prev,
                amenities: exists
                    ? prev.amenities.filter((item) => item !== amenity)
                    : [...prev.amenities, amenity],
            };
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
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
                toast.success("Image uploaded successfully");
            } else {
                toast.error("ImgBB upload failed. Provide a direct URL instead.");
            }
        } catch (err) {
            toast.error("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error("Please provide or upload a studio image");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                ownerEmail: session?.user?.email,
                ownerName: session?.user?.name,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to create studio listing");
            }

            toast.success("Studio listed successfully!");
            router.push("/my-listings");
        } catch (error) {
            toast.error(error.message || "Submission failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-base-200 border border-base-300 rounded-3xl p-8 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-base-content tracking-tight">
                            Add New Studio Space
                        </h1>
                        <p className="text-xs text-base-content/60 mt-2">
                            List your studio workspace for filmmakers, photographers, and audio engineers
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Host Name</span>
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={session?.user?.name || ""}
                                    className="input input-bordered w-full bg-base-300/50 cursor-not-allowed font-medium text-sm"
                                />
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Host Email</span>
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    value={session?.user?.email || ""}
                                    className="input input-bordered w-full bg-base-300/50 cursor-not-allowed font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Studio Title</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Lumina Daylight Soundstage"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Category</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="select select-bordered w-full bg-base-100 focus:outline-primary"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Hourly Rate ($)</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    placeholder="85"
                                    value={formData.hourlyRate}
                                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Security Deposit ($)</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    required
                                    placeholder="150"
                                    value={formData.securityDeposit}
                                    onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Max Capacity</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    placeholder="12"
                                    value={formData.maxCapacity}
                                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Location / Address</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 42 Gulshan Avenue, Dhaka"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full bg-base-100 focus:outline-primary"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Direct Image URL</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Or Upload Image (ImgBB)</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="file-input file-input-bordered file-input-primary w-full bg-base-100"
                                />
                            </div>
                        </div>

                        {formData.image && (
                            <div className="w-full h-48 rounded-2xl overflow-hidden border border-base-300">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div>
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Amenities & Equipment Available</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-2">
                                {AVAILABLE_AMENITIES.map((amenity) => {
                                    const checked = formData.amenities.includes(amenity);
                                    return (
                                        <label
                                            key={amenity}
                                            className={`cursor-pointer border rounded-xl p-3 flex items-center justify-between transition-all ${checked
                                                    ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                                                    : "border-base-300 bg-base-100 text-base-content/70 hover:border-base-content/40"
                                                }`}
                                        >
                                            <span className="text-xs">{amenity}</span>
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => handleAmenityToggle(amenity)}
                                                className="checkbox checkbox-primary checkbox-xs"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Detailed Studio Overview</span>
                            </label>
                            <textarea
                                required
                                rows="4"
                                placeholder="Describe lighting setups, ceiling heights, power outputs, and rules..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="textarea textarea-bordered w-full bg-base-100 focus:outline-primary text-sm"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || uploading}
                            className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg"
                        >
                            {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Publish Studio Space"}
                        </button>
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
}