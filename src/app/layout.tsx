import type { Metadata } from "next";
import { Playfair_Display, Outfit, Exo, Stardos_Stencil } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "@/components/LoaderProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const stardos = Stardos_Stencil({
  weight: ["400", "700"],
  variable: "--font-stardos",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan B | Premium Tattoo Booking",
  description: "Book your next tattoo session. Explore our portfolio, find your style, and schedule an appointment online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${exo.variable} ${stardos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-noise">
        <LoaderProvider>
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}
