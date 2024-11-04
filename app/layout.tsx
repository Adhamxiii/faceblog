import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeContextProvider } from "@/components/context/ThemeContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FaceBlog",
  description:
    "FaceBlog is a social media platform for sharing your thoughts and ideas with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="min-h-screen bg-[var(--bg)] text-[var(--textColor)]">
                <div className="container mx-auto px-5 max-md:px-3">
                  <Navbar />
                  {children}
                  <Toaster position="top-center" />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
