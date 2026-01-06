import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import EmotionCacheProvider from "./emotion-cache";
import ThemeProvider from "./ThemeProvider";
import Header from "./components/Header/Header";
import "./globals.css";
import { FloatingChat } from "./components/FloatingChat/FloatingChat";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Yakeline Contadora - Asesoría Financiera",
  description: "Asesoría contable y tributaria para el bienestar de tus finanzas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <EmotionCacheProvider>
          <ThemeProvider>
            <Header />
            {children}
            <FloatingChat />
          </ThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
