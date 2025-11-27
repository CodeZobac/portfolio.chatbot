import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Afonso Caboz - Full-Stack Solutions Architect",
  description: "Interactive AI-powered portfolio showcasing full-stack development experience, projects, and technical skills. Chat with AI to explore my work in web development, mobile apps, and AI solutions.",
  keywords: [
    "Full-Stack Developer",
    "Solutions Architect",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AI Development",
    "Web Development",
    "Mobile Development",
    "Afonso Caboz",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Afonso Caboz" }],
  creator: "Afonso Caboz",
  publisher: "Afonso Caboz",
  metadataBase: new URL('https://afonsocaboz.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://afonsocaboz.com',
    siteName: 'Afonso Caboz Portfolio',
    title: 'Afonso Caboz - Full-Stack Solutions Architect',
    description: 'Interactive AI-powered portfolio showcasing full-stack development experience, projects, and technical skills. Chat with AI to explore my work.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Afonso Caboz - Full-Stack Solutions Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afonso Caboz - Full-Stack Solutions Architect',
    description: 'Interactive AI-powered portfolio showcasing full-stack development experience, projects, and technical skills.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Afonso Caboz",
    "jobTitle": "Full-Stack Solutions Architect",
    "description": "Full-Stack Solutions Architect specializing in React, Next.js, TypeScript, and AI-powered applications. Experience in web development, mobile apps, and system architecture.",
    "url": "https://afonsocaboz.com",
    "sameAs": [
      "https://www.linkedin.com/in/afonsocaboz",
      "https://github.com/afonsocaboz"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "AI Development",
      "Full-Stack Development",
      "System Architecture",
      "Web Development",
      "Mobile Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "ETIC Algarve"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
