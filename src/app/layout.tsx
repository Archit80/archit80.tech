import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ThemePresetsProvider } from "@/context/ThemeContext";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans selection:bg-neutral-200 selection:text-neutral-900 ">
        <ThemePresetsProvider>
          <Providers attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </Providers>
        </ThemePresetsProvider>
      </body>
    </html>
  );
}