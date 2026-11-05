import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "StudioSpace | Creative Workspace & Production Studio Sharing",
  description:
    "Discover, inspect dynamic availability, and reserve creative studio spaces with transparent pricing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e1e24",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#6366f1",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}