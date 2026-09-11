import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Choru Vaari Kodukkam", description: "A completely necessary vaari calibration instrument." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
