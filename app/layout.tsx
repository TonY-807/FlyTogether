import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlyTogether - Premium Flight Booking",
  description: "Experience the next generation of flight booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
