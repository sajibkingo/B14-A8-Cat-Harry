import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Missing MONGO_URI / MONGODB_URI in environment variables.");
}

const client = new MongoClient(uri);
const db = client.db("studiospace_db");

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://b14-a8-cat-harry-beryl.vercel.app",
        /\.vercel\.app$/,
    ],
    secret: process.env.BETTER_AUTH_SECRET || "super_secret_jwt_key_studiospace_2026",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});