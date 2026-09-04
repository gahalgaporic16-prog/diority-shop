import Link from "next/link";
import { products } from "@/data/catalog";
import type { Category } from "@/types/product";
import { BrandBadge } from "@/components/BrandIcon";

export function CategoryCard({ c }: { c: Category }) {
  const count = products.filter((p) => p.categorySlug === c.slug && p.status === "Активна").length;
  return (
    <Link
      href={`/catalog/${c.slug}`}
      className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition hover:border-[var(--color-mint)]/40 hover:bg-[var(--color-bg-soft)]"
    >
      <BrandBadge
        slug={c.slug}
        size={44}
        title={c.name}
        className="mb-1 transition group-hover:scale-105"
      />
      <h3 className="text-base font-semibold text-white">{c.name}</h3>
      <p className="text-xs text-[var(--color-text-muted)]">{c.description}</p>
      <div className="mt-auto text-xs font-medium text-[var(--color-mint)]">
        {count} {count === 1 ? "позиция" : count < 5 ? "позиции" : "позиций"} →
      </div>
    </Link>
  );
}
