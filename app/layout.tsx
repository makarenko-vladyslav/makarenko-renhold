
import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makarenko Renhold | Profesjonell Renholdstjeneste i Notodden",
  description: "Privat profesjonell renholdstjeneste i Notodden. Fast pris, personlig ansvar og premium kvalitet. Bestill prisoverslag på 5 minutter.",
  keywords: ["renhold", "vaskehjelp", "Notodden", "flyttevask", "hovedrengjøring", "Makarenko Renhold"],
  openGraph: {
    title: "Makarenko Renhold | Profesjonell Renhold i Notodden",
    description: "Premium renholdstjenester med fast pris og personlig garanti.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-bg-light text-text-main flex flex-col min-h-screen">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
