"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditStudioPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        hourlyRate: "",
        securityDeposit: "",
        maxCapacity: "",
        location: "",
        image: "",
        amenities: [],
        description: "",
        ownerEmail: "",
        ownerName: "",
    });

    useEffect(() => {
        async function fetchStudioData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios/${id}`);
                if (!res.ok) throw new Error("Studio not found");
                const data = await res.json();
                setFormData({
                    title: data.title || "",
                    category: data.category || CATEGORIES[0],
                    hourlyRate: data.hourlyRate || "",
                    securityDeposit: data.securityDeposit || "",
                    maxCapacity: data.maxCapacity || "",
                    location: data.location || "",
                    image: data.image || "",
                    amenities: data.amenities || [],
                    description: data.description || "",
                    ownerEmail: data.ownerEmail || "",
                    ownerName: data.ownerName || "",
                });
            } catch (err) {
                toast.error("Failed to load studio details for editing");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchStudioData();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Update failed");

            toast.success("Studio details updated successfully!");
            router.push("/my-listings");
        } catch (error) {
            toast.error(error.message || "Failed to update studio");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <PrivateRoute>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-base-200 border border-base-300 rounded-3xl p-8 shadow-xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-base-content tracking-tight">
                            Update Studio Space
                        </h1>
                        <p className="text-xs text-base-content/60 mt-1">
                            Modify rates, location details, or equipment specs
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
                                    value={formData.ownerName}
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
                                    value={formData.ownerEmail}
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
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="input input-bordered w-full bg-base-100 focus:outline-primary"
                            />
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Image URL</span>
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="input input-bordered w-full bg-base-100 focus:outline-primary"
                            />
                        </div>

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
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="textarea textarea-bordered w-full bg-base-100 focus:outline-primary text-sm"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg"
                        >
                            {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
}