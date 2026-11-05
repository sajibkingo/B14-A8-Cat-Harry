"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function StudioDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [studio, setStudio] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("13:00");
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        async function fetchStudio() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios/${id}`);
                if (!res.ok) throw new Error("Studio not found");
                const data = await res.json();
                setStudio(data);
            } catch (err) {
                toast.error("Failed to load studio details");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchStudio();
    }, [id]);

    const calculateHours = () => {
        if (!startTime || !endTime) return 0;
        const [startH] = startTime.split(":").map(Number);
        const [endH] = endTime.split(":").map(Number);
        const diff = endH - startH;
        return diff > 0 ? diff : 0;
    };

    const hours = calculateHours();
    const totalPrice = hours * (studio?.hourlyRate || 0);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user) {
            toast.error("You must be logged in to book a studio");
            router.push("/login");
            return;
        }

        if (hours <= 0) {
            toast.error("End time must be after start time");
            return;
        }

        setBookingLoading(true);
        try {
            const payload = {
                studioId: studio._id,
                studioTitle: studio.title,
                userEmail: session.user.email,
                userName: session.user.name,
                bookingDate,
                startTime,
                endTime,
                totalPrice,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Booking failed");
            }

            toast.success("Studio booking created successfully!");
            setIsModalOpen(false);
            router.push("/my-bookings");
        } catch (error) {
            toast.error(error.message || "Reservation failed");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!studio) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold">Studio workspace not found</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-8">
                    <div className="rounded-3xl overflow-hidden border border-base-300 shadow-xl h-[450px] bg-base-300">
                        <img
                            src={studio.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000"}
                            alt={studio.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="badge badge-primary font-bold text-xs py-3 px-3">
                                {studio.category}
                            </span>
                            <span className="text-xs text-base-content/60">★ {studio.rating || 4.9} (Verified Space)</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                            {studio.title}
                        </h1>
                        <p className="text-sm text-base-content/70 mt-2 flex items-center gap-1.5">
                            <span>📍</span> {studio.location}
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
                        <h3 className="font-bold text-lg text-base-content">Workspace Overview</h3>
                        <p className="text-sm text-base-content/80 leading-relaxed whitespace-pre-line">
                            {studio.description}
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
                        <h3 className="font-bold text-lg text-base-content">Included Amenities & Production Gear</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {studio.amenities?.map((amenity) => (
                                <div
                                    key={amenity}
                                    className="p-3 rounded-xl bg-base-100 border border-base-300 text-xs font-semibold flex items-center gap-2"
                                >
                                    <span className="text-primary">✓</span>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-6">
                        <div>
                            <span className="text-3xl font-black text-primary">${studio.hourlyRate}</span>
                            <span className="text-xs text-base-content/60 font-medium"> / hour</span>
                        </div>

                        <div className="space-y-3 border-y border-base-300 py-4 text-xs text-base-content/80">
                            <div className="flex justify-between">
                                <span>Security Deposit:</span>
                                <span className="font-bold text-base-content">${studio.securityDeposit}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Capacity:</span>
                                <span className="font-bold text-base-content">Up to {studio.maxCapacity} creators</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Host:</span>
                                <span className="font-bold text-base-content">{studio.ownerName || "Certified Host"}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                        >
                            Book Workspace Now
                        </button>
                    </div>
                </div>

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-base-200 border border-base-300 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                        <h3 className="text-xl font-bold text-base-content mb-4">
                            Book {studio.title}
                        </h3>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs">Booking Date</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-xs">Start Time</span>
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                    />
                                </div>
                                <div>
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-xs">End Time</span>
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="input input-bordered w-full bg-base-100 focus:outline-primary"
                                    />
                                </div>
                            </div>

                            <div className="bg-base-100 p-4 rounded-xl border border-base-300 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span>Reserved Duration:</span>
                                    <span className="font-bold">{hours} Hours</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-base-300">
                                    <span>Estimated Total:</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-ghost flex-1 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={bookingLoading || hours <= 0}
                                    className="btn btn-primary flex-1 text-white font-bold rounded-xl"
                                >
                                    {bookingLoading ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}