import Link from "next/link";
import { categories } from "@/data/catalog";
import { BrandIcon } from "@/components/BrandIcon";

/**
 * Лента логотипов брендов под первым экраном.
 * Сразу показывает, что именно продаётся, до того как человек
 * долистает до каталога.
 */
export function BrandStrip() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="mb-4 text-center text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          Работаем с сервисами
        </p>
        <div className="no-scrollbar flex items-center justify-start gap-3 overflow-x-auto md:flex-wrap md:justify-center">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              title={c.name}
              className="flex flex-shrink-0 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-xs text-[var(--color-text-muted)] opacity-75 transition hover:border-[var(--color-mint)]/30 hover:text-white hover:opacity-100"
            >
              <BrandIcon slug={c.slug} size={18} title={c.name} />
              <span className="whitespace-nowrap">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
