// app/layout.tsx
import { ToastContainer } from "react-toastify";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dress Wave - Buy Stylish Dresses Online",
  description:
    "Discover the latest fashion trends and buy stylish dresses for every occasion from Dress Wave.",
  keywords: [
    "dresses",
    "fashion",
    "online shopping",
    "dress wave",
    "stylish outfits",
  ],
  authors: [
    { name: "Prosenjit Dhar Uzzal", url: "https://dresswave.onrender.com" },
  ],
  creator: "Dress Wave",

  // 🟦 Open Graph for social media (Facebook, LinkedIn)
  openGraph: {
    title: "Dress Wave - Stylish Dresses for You",
    description:
      "Shop from our wide collection of trendy and comfortable dresses.",
    url: "https://dresswave.onrender.com",
    siteName: "DressWave",
    images: [
      {
        url: "https://dresswave.onrender.com/metalogo.png",
        width: 1200,
        height: 630,
        alt: "Dress Wave Online Shop",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🐦 Twitter card for sharing
  twitter: {
    card: "summary_large_image",
    title: "Dress Wave - Buy Stylish Dresses Online",
    description: "Explore trending fashion and shop your favorite outfits.",
    images: ["https://dresswave.onrender.com/metalogo.png"],

    creator: "@pro_d_uzzal",
  },

  // 💻 Optional for better browser control
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main>
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
