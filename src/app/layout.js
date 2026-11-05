import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
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
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}