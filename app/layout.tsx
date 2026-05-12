import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Header } from "@/shared/components/layout/header";
import { GooeyToaster } from "@/shared/components/ui/goey-toaster";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Membok",
    template: "%s | Membok",
  },
  description: "Registra y organiza todas tus suscripciones y servicios en un solo lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>
          <Header />
          {children}
          <GooeyToaster position="top-center" />
        </NuqsAdapter>
      </body>
    </html>
  );
}
