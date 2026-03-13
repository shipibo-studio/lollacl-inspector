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
  title: {
    default: "LollaCL Inspector",
    template: "%s | Lollapalooza Chile 2026",
  },
  description: "Explora el lineup completo de Lollapalooza Chile 2026 (13-15 de Marzo). Encuentra horarios de artistas por stage, día y más.",
  keywords: ["Lollapalooza", "Chile", "2026", "festival", "música", " lineup", "artistas", "schedules", "stages"],
  authors: [{ name: "LollaCL" }],
  creator: "LollaCL",
  publisher: "LollaCL",
  metadataBase: new URL("https://lollacl-inspector.vercel.app/"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://lollacl-inspector.vercel.app/",
    siteName: "LollaCL Inspector",
    title: "LollaCL Inspector - Lollapalooza Chile 2026",
    description: "Explora el lineup completo de Lollapalooza Chile 2026 (13-15 de Marzo). Encuentra horarios de artistas por stage, día y más.",
    images: [
      {
        url: "/social.jpg",
        width: 1200,
        height: 630,
        alt: "Lollapalooza Chile 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LollaCL Inspector - Lollapalooza Chile 2026",
    description: "Explora el lineup completo de Lollapalooza Chile 2026 (13-15 de Marzo). Encuentra horarios de artistas por stage, día y más.",
    images: ["/social.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
