import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// The Express API (cat-harry-server) guards mutations with its own JWT cookie
// named `token`, issued by POST /api/auth/jwt. better-auth's session cookie is
// a different cookie and is NOT accepted there, so without this exchange every
// protected call fails with 401 "Unauthorized access: No token provided".
// Await this right before any protected request. Pass the session user if you
// already have it; otherwise it fetches the session itself.
export async function ensureBackendToken(user) {
    let target = user;
    if (!target?.email) {
        const { data } = await authClient.getSession();
        target = data?.user;
    }
    if (!target?.email) return;

    try {
        await fetch(`${API_URL}/auth/jwt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: target.email,
                name: target.name,
                image: target.image,
            }),
        });
    } catch (err) {
        console.warn("Backend token sync failed:", err);
    }
}
