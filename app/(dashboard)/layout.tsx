import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "./components/layouts/sidebar";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SportOn Admin",
  description: "Admin Dashboard for SportOn Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="flex bg-[#F7F9FA] min-h-screen">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <main className="flex-1 ml-72 p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}