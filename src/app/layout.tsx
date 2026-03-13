import type { Metadata } from "next";
import { Golos_Text, Anton } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "LollaCL Inspector",
  description: "Buscador de shows Lollapalooza Santiago 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${golosText.variable} ${anton.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
