import { brandIcons } from "@/data/brandIcons";

/**
 * Логотип бренда по categorySlug.
 * Рисуется инлайн-SVG — нет лишних запросов, чёткий на любом экране,
 * корректно работает со статическим экспортом (GitHub Pages).
 */
export function BrandIcon({
  slug,
  size = 24,
  className = "",
  title,
}: {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
}) {
  const icon = brandIcons[slug];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      role="img"
      aria-label={title ?? slug}
    >
      {icon.multi
        ? icon.multi.map(([d, fill], i) => <path key={i} d={d} fill={fill} />)
        : icon.paths?.map((d, i) => (
            <path key={i} d={d} fill={icon.color} fillRule={icon.fillRule} />
          ))}
    </svg>
  );
}

/**
 * Логотип в круглой «плашке» — подложка окрашена в цвет бренда с малой
 * прозрачностью, поэтому карточки выглядят единообразно, а бренд узнаётся.
 */
export function BrandBadge({
  slug,
  size = 44,
  className = "",
  title,
}: {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
}) {
  const icon = brandIcons[slug];
  const accent = icon?.multi ? "#FFFFFF" : (icon?.color ?? "#8C9BB5");

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl border ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
        borderColor: `color-mix(in srgb, ${accent} 24%, transparent)`,
      }}
    >
      <BrandIcon slug={slug} size={Math.round(size * 0.55)} title={title} />
    </span>
  );
}

/** Есть ли у категории нарисованный логотип */
export const hasBrandIcon = (slug: string) => Boolean(brandIcons[slug]);
