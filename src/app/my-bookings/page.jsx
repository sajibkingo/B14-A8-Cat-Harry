"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import EmptyState from "@/components/EmptyState";
import { ensureBackendToken } from "@/lib/backend-token";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        if (!session?.user?.email) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/user?email=${encodeURIComponent(
                    session.user.email
                )}`
            );
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load your reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load via a local async function — calling a setState-containing
        // function directly inside an effect trips react-hooks/set-state-in-effect.
        async function load() {
            await fetchBookings();
        }
        load();
    }, [session]);

    const handleCancelBooking = async (bookingId) => {
        try {
            await ensureBackendToken(session?.user);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${bookingId}/cancel`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );
            if (!res.ok) throw new Error("Could not cancel reservation");

            toast.success("Reservation cancelled successfully");
            fetchBookings();
        } catch (error) {
            toast.error(error.message || "Failed to cancel");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Confirmed":
                return <span className="badge badge-success text-white text-xs font-bold py-2">Confirmed</span>;
            case "Cancelled":
                return <span className="badge badge-error text-white text-xs font-bold py-2">Cancelled</span>;
            case "Completed":
                return <span className="badge badge-neutral text-xs font-bold py-2">Completed</span>;
            default:
                return <span className="badge badge-warning text-black text-xs font-bold py-2">Pending</span>;
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-base-content tracking-tight">
                        My Studio Bookings
                    </h1>
                    <p className="text-xs text-base-content/60 mt-1">
                        Track your reserved production slots, schedule timing, and booking confirmations
                    </p>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl shadow-xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b border-base-300 text-xs text-base-content/60">
                                    <th>Studio Name</th>
                                    <th>Reserved Date</th>
                                    <th>Time Slot</th>
                                    <th>Total Cost</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((item) => (
                                    <tr key={item._id} className="border-b border-base-300/50 hover:bg-base-300/30">
                                        <td className="font-bold text-sm text-base-content">{item.studioTitle}</td>
                                        <td className="text-xs">{item.bookingDate}</td>
                                        <td className="text-xs font-medium">
                                            {item.startTime} - {item.endTime}
                                        </td>
                                        <td className="font-extrabold text-primary">${item.totalPrice}</td>
                                        <td>{getStatusBadge(item.status)}</td>
                                        <td className="text-right">
                                            {item.status === "Pending" ? (
                                                <button
                                                    onClick={() => handleCancelBooking(item._id)}
                                                    className="btn btn-xs btn-error btn-outline rounded-lg"
                                                >
                                                    Cancel Booking
                                                </button>
                                            ) : (
                                                <span className="text-xs text-base-content/40 font-semibold">No Action</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        title="No Active Reservations"
                        description="You haven't reserved any studio slots yet. Discover creative spaces, check hourly rates, and book your production session."
                        actionLabel="Explore Studios Now"
                        actionHref="/studios"
                    />
                )}
            </div>
        </PrivateRoute>
    );
}