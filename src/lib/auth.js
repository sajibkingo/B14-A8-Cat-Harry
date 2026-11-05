import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is missing in environment variables");
}

const client = new MongoClient(uri);

export const auth = betterAuth({
    database: mongodbAdapter(client.db("Cat-Harry")),
    secret: process.env.BETTER_AUTH_SECRET || "super_secret_jwt_key_studiospace_2026",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
    },
});