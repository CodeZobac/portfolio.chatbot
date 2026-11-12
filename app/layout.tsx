import type { Metadata } from "next";
import { Syne } from "next/font/google";

import { DESCRIPTION, SITE_URL, TITLE, jsonLd } from "@/lib/seo";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "especialista em IA Algarve",
    "programador full-stack Algarve",
    "programador web Faro",
    "criação de websites Faro",
    "chatbot para empresas",
    "AI engineer Portugal",
    "Full-Stack Developer Faro",
    "Next.js",
    "TypeScript",
    "LLM",
    "Afonso Caboz",
  ],
  authors: [{ name: "Afonso Caboz" }],
  creator: "Afonso Caboz",
  publisher: "Afonso Caboz",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Afonso Caboz Portfolio",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
