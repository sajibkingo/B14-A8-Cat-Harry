"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";

export default function MyListingsPage() {
    const { data: session } = useSession();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudio, setSelectedStudio] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchListings = async () => {
        if (!session?.user?.email) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios/my-listings?email=${encodeURIComponent(
                    session.user.email
                )}`
            );
            const data = await res.json();
            setListings(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load your listings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [session]);

    const handleDelete = async () => {
        if (!selectedStudio) return;
        setDeleting(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/studios/${selectedStudio._id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Delete failed");

            toast.success("Studio deleted successfully");
            setSelectedStudio(null);
            fetchListings();
        } catch (error) {
            toast.error(error.message || "Could not delete studio");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-base-content tracking-tight">
                            My Studio Listings
                        </h1>
                        <p className="text-xs text-base-content/60 mt-1">
                            Manage, update specifications, or remove your hosted production spaces
                        </p>
                    </div>
                    <Link href="/add-studio" className="btn btn-primary btn-sm rounded-xl text-white font-bold">
                        + Add New Studio
                    </Link>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : listings.length > 0 ? (
                    <div className="overflow-x-auto bg-base-200 border border-base-300 rounded-3xl shadow-xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b border-base-300 text-xs text-base-content/60">
                                    <th>Studio</th>
                                    <th>Category</th>
                                    <th>Hourly Rate</th>
                                    <th>Deposit</th>
                                    <th>Location</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map((item) => (
                                    <tr key={item._id} className="border-b border-base-300/50 hover:bg-base-300/30">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-300 shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-sm text-base-content line-clamp-1">{item.title}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-sm badge-outline text-xs">{item.category}</span>
                                        </td>
                                        <td className="font-extrabold text-primary">${item.hourlyRate}/hr</td>
                                        <td>${item.securityDeposit}</td>
                                        <td className="text-xs text-base-content/70">{item.location}</td>
                                        <td className="text-right space-x-2">
                                            <Link
                                                href={`/studios/edit/${item._id}`}
                                                className="btn btn-xs btn-outline rounded-lg"
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => setSelectedStudio(item)}
                                                className="btn btn-xs btn-error btn-outline rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-base-200 border border-base-300 rounded-3xl">
                        <h3 className="text-lg font-bold text-base-content">No studios listed yet</h3>
                        <p className="text-xs text-base-content/60 mt-2">
                            You have not posted any creative workspaces under this account.
                        </p>
                        <Link href="/add-studio" className="btn btn-primary btn-sm mt-6 text-white rounded-xl">
                            List Your First Space
                        </Link>
                    </div>
                )}

                {selectedStudio && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-base-200 border border-base-300 rounded-3xl max-w-sm w-full p-6 shadow-2xl">
                            <h3 className="text-lg font-bold text-base-content">Confirm Deletion</h3>
                            <p className="text-xs text-base-content/70 mt-2">
                                Are you sure you want to delete <span className="font-bold text-base-content">&quot;{selectedStudio.title}&quot;</span>? This listing will be permanently removed from MongoDB.
                            </p>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setSelectedStudio(null)}
                                    className="btn btn-ghost btn-sm flex-1 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="btn btn-error btn-sm flex-1 text-white font-bold rounded-xl"
                                >
                                    {deleting ? <span className="loading loading-spinner loading-xs"></span> : "Confirm Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
}