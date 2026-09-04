"use client";

/**
 * Утилиты для определения, открыт ли сайт внутри Telegram Mini App.
 * Используется чтобы менять CTA, цвета, аккорды кнопок и т.п.
 */
export const isTelegramMiniApp = (): boolean => {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { Telegram?: { WebApp?: { initData?: string } } };
  return Boolean(w.Telegram?.WebApp?.initData);
};

export const tgWebApp = () => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { Telegram?: { WebApp?: TelegramWebApp } };
  return w.Telegram?.WebApp ?? null;
};

type TelegramWebApp = {
  initData?: string;
  ready: () => void;
  expand: () => void;
  close: () => void;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
  };
};

/**
 * Безопасно открыть TG-ссылку — если внутри Mini App то через нативный метод,
 * иначе обычный window.open
 */
export const openBuy = (url: string) => {
  const tg = tgWebApp();
  if (tg && url.startsWith("https://t.me/")) {
    tg.HapticFeedback?.impactOccurred("medium");
    tg.openTelegramLink(url);
  } else if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
};
