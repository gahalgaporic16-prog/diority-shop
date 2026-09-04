import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Статический экспорт — генерирует готовые HTML-файлы в папке `out`.
  // Это нужно и для GitHub Pages, и для любого статического хостинга.
  output: "export",
  // Обязательно для static export — отключает серверную оптимизацию картинок.
  images: { unoptimized: true },
  // Добавляет завершающий слэш к URL — корректно работает с GitHub Pages
  // и предотвращает редиректы при переходах по внутренним ссылкам.
  trailingSlash: true,
};

export default nextConfig;
