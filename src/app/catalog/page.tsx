"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, getActiveProducts } from "@/data/catalog";
import { BrandIcon } from "@/components/BrandIcon";
import { Search, X } from "lucide-react";

export default function CatalogPage() {
  const all = useMemo(() => getActiveProducts(), []);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let res = all;
    if (activeCat) res = res.filter((p) => p.categorySlug === activeCat);
    if (search) {
      const q = search.toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return res;
  }, [all, activeCat, search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Каталог</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">{all.length} активных позиций — выбирай</p>
      </div>

      {/* Поиск */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти товар (например, ChatGPT, Brawl Pass, Steam)"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] py-3 pl-10 pr-10 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-mint)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]/20"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Фильтры по категориям */}
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCat(null)}
          className={`whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition ${
            activeCat === null
              ? "border-[var(--color-mint)] bg-[var(--color-mint)] text-black"
              : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-white"
          }`}
        >
          Все
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveCat(c.slug)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition ${
              activeCat === c.slug
                ? "border-[var(--color-mint)] bg-[var(--color-mint)] text-black"
                : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-white"
            }`}
          >
            <BrandIcon
              slug={c.slug}
              size={16}
              title={c.name}
              className={activeCat === c.slug ? "brightness-0" : ""}
            />
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 text-center text-[var(--color-text-muted)]">
          Ничего не найдено. Попробуй изменить запрос или сбросить фильтры.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
