import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Archit Taneja | Developer Portfolio",
  description: "Full-Stack Developer, UI/UX Designer, and Product Builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Layout structure - UI removed - see Content.md for portfolio content */}
        {children}
      </body>
    </html>
  );
}