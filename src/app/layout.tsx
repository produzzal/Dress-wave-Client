// app/layout.tsx
import { ToastContainer } from "react-toastify";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dress Wave",
  description: "Buy stylish dresses online",
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
