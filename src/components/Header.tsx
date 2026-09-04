"use client";

import Link from "next/link";
import { LogoMark } from "./Logo";
import { config } from "@/lib/config";
import { Send } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <LogoMark size={32} />
        </Link>

        <nav className="hidden gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-elevated)] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://t.me/${config.telegram.channelUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-[var(--color-mint)] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[var(--color-mint-hover)] md:flex"
        >
          <Send size={16} />
          Telegram
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <div className="space-y-1.5">
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`https://t.me/${config.telegram.channelUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-mint)] px-4 py-3 text-sm font-semibold text-black"
            >
              <Send size={16} /> Открыть в Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
