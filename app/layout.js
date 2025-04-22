import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pulse Times",
  description: "News that creates some impact",
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  openGraph: {
    title: "Pulse Times",
    description: "News that creates some impact",
    url: "https://pulsetimes.com",
    siteName: "Pulse Times",
    images: [
      {
        url: "https://res.cloudinary.com/dccbdekei/image/upload/v1729067177/statics/jmz61s1kg03jsukz5zl2.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <div className="max-w-full mx-auto text-white">
            <Navbar />
            <div className="min-h-screen h-full w-full bg-gradient-to-t from-[#12243c] to-[#0f1721]">
              {children}
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
