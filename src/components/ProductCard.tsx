import Link from "next/link";
import type { Product } from "@/types/product";
import { categories } from "@/data/catalog";
import { formatRub } from "@/lib/config";
import { BrandIcon } from "@/components/BrandIcon";

export function ProductCard({ p }: { p: Product }) {
  const cat = categories.find((c) => c.slug === p.categorySlug);
  const onRequest = p.status !== "Активна";

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group relative flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-soft)]"
    >
      <div className="mb-2.5 flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
        <BrandIcon slug={p.categorySlug} size={14} title={cat?.name} />
        <span className="truncate">{p.category}</span>
      </div>

      <h3 className="line-clamp-2 text-sm font-medium leading-snug text-white">{p.name}</h3>

      {p.platform && (
        <p className="mt-1 line-clamp-1 text-xs text-[var(--color-text-muted)]">{p.platform}</p>
      )}

      <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-[var(--color-border)] pt-3">
        <span className="text-[17px] font-semibold tracking-tight text-white">
          {formatRub(p.priceRub)}
        </span>
        <span
          className={
            onRequest
              ? "text-[11px] text-[var(--color-warning)]"
              : "text-[11px] text-[var(--color-mint)] opacity-0 transition group-hover:opacity-100"
          }
        >
          {onRequest ? "под заказ" : "купить →"}
        </span>
      </div>
    </Link>
  );
}
