import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { config } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${config.brand.name} — ${config.brand.tagline}`,
    template: `%s · ${config.brand.name}`,
  },
  description: config.brand.description,
  keywords: ["ChatGPT", "Claude", "Steam", "Discord Nitro", "Telegram Premium", "цифровые товары", "подписки", "купить дёшево"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: config.brand.name,
    description: config.brand.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      {/*
        suppressHydrationWarning нужен потому, что некоторые браузерные
        расширения (Bybit Wallet, Telegram Web, MetaMask и т.п.) инжектируют
        свои атрибуты в <body> и <html> до того, как React успевает гидратировать
        страницу. Без этого флага Next.js валит ошибку Hydration mismatch.
        Это ОФИЦИАЛЬНЫЙ паттерн из доки Next.js — никакого скрытия багов.
      */}
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[var(--color-bg)] text-white antialiased"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
