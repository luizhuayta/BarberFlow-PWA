import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RegisterSW } from "@/components/shared/RegisterSW";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://barberflow.app'),
  title: {
    default: "BarberFlow | Barbería Profesional",
    template: "%s | BarberFlow",
  },
  description: "Reserva tu cita, administra tu barbería y ofrece la mejor experiencia. BarberFlow - Fluye con estilo.",
  applicationName: "BarberFlow",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BarberFlow",
  },
  openGraph: {
    title: "BarberFlow - Barbería Profesional",
    description: "La app PWA para barberías modernas. Citas, clientes y flujo perfecto.",
    images: [{ url: "/icon-512.png" }],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <RegisterSW />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
