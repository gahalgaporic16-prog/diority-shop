# Diority Shop

Магазин цифровых товаров. Next.js 15 + TypeScript + Tailwind v4. Работает как сайт **и** как Telegram Mini App из одного кодбейса.

## Быстрый старт (Windows cmd)

```cmd
cd diority-shop
npm install
npm run dev
```

Открой `http://localhost:3000`.

В PowerShell / cmd / Git Bash — всё работает одинаково. Команды `npm` кросс-платформенные.

## Структура

```
src/
├── app/                      # App Router страницы
│   ├── page.tsx              # Главная (hero, категории, топ-товары)
│   ├── catalog/              # Каталог
│   │   ├── page.tsx          # Все товары + поиск + фильтры
│   │   └── [category]/       # Страница категории
│   ├── product/[slug]/       # Карточка товара
│   ├── about/                # О сервисе
│   ├── faq/                  # Частые вопросы (аккордеон)
│   ├── reviews/              # Отзывы
│   ├── contacts/             # Контакты
│   ├── layout.tsx            # Корневой layout (Header + Footer)
│   └── globals.css           # Tailwind + цветовая палитра
├── components/
│   ├── Header.tsx            # Навигация + мобильное меню
│   ├── Footer.tsx
│   ├── Hero.tsx              # Главный экран
│   ├── Logo.tsx              # SVG-логотип под TG-аватарку
│   ├── CategoryCard.tsx      # Карточка категории
│   ├── ProductCard.tsx       # Карточка товара
│   └── BuyButton.tsx         # Кнопка "Купить" — открывает TG
├── data/
│   └── catalog.ts            # 167 позиций, 18 категорий (правь тут)
├── lib/
│   ├── config.ts             # ★ Контакты, бренд, юзернеймы
│   ├── telegram.ts           # Mini App SDK helpers
│   └── utils.ts
└── types/
    └── product.ts
```

## Что обязательно поменять перед запуском

В `src/lib/config.ts`:

```ts
telegram: {
  adminUsername: "diority_admin",     // ← твой реальный username
  channelUsername: "diority_shop",    // ← твой канал
  miniAppUrl: "...",                  // ← URL Mini App из @BotFather
},
contact: {
  email: "hello@diority.shop",        // ← твой email
},
```

## Как менять каталог

Файл `src/data/catalog.ts` — список из 167 товаров. Структура:

```ts
{
  id: 1,
  slug: "chatgpt-chatgpt-plus-mesyats",    // URL-часть
  category: "ChatGPT",
  categorySlug: "chatgpt",
  platform: "Web/App",
  name: "ChatGPT Plus — месяц",
  region: "США",
  priceUsd: 20.00,
  priceRub: 1726,                           // ← основная цена для клиента
  costRub: 1569,
  marginRub: 157,
  status: "Активна",                        // "Активна" / "Скрыта" / "Нет в наличии"
  note: "Самая популярная позиция",
}
```

Чтобы временно скрыть товар: меняешь `status` на `"Скрыта"` — пропадёт из каталога.

Чтобы добавить категорию: правь массив `categories` в начале файла.

## Деплой (Vercel — бесплатно)

1. Создай аккаунт на [vercel.com](https://vercel.com), привяжи GitHub
2. Залей репозиторий на GitHub: `git init && git add . && git commit -m "init" && git remote add origin <url> && git push -u origin main`
3. На Vercel: Import Project → выбираешь репо → Deploy
4. Через ~1 минуту получаешь URL вида `diority-shop.vercel.app`
5. (Опционально) подключаешь домен: REG.RU / Cloudflare → купи `diority.shop` → в Vercel: Settings → Domains → Add

## Превратить в Telegram Mini App

Когда сайт уже задеплоен:

1. Открой `@BotFather` в TG → `/newbot` → создай бота для магазина
2. `/newapp` → выбираешь созданного бота → даёшь название и URL твоего сайта на Vercel
3. BotFather выдаст `t.me/<bot_username>/<app_name>` — это ссылка на Mini App
4. Запиши её в `src/lib/config.ts` → `miniAppUrl`
5. В TG-канале добавляешь кнопку с этой ссылкой

Сайт автоматически определяет контекст (через `src/lib/telegram.ts`) и подстраивает UX: внутри TG жмёт `WebApp.expand()`, использует haptic feedback на кнопках, открывает чат с админом нативно.

## Tech stack

- **Next.js 15** (App Router, React 19, Turbopack)
- **TypeScript** strict mode
- **Tailwind CSS v4** (PostCSS plugin)
- **lucide-react** иконки
- **@telegram-apps/sdk-react** для Mini App
- **shadcn-style компоненты** (без отдельной библиотеки — встроены в `src/components`)

## Команды

```bash
npm run dev          # Запуск dev-сервера на :3000
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен билда
npm run typecheck    # Проверка типов
npm run lint         # ESLint
```

## TODO после первого запуска

- [ ] Подменить юзернеймы в `lib/config.ts`
- [ ] Добавить реальные отзывы в `app/reviews/page.tsx`
- [ ] Создать `public/favicon.ico` (можно сгенерить из логотипа)
- [ ] Создать `public/og-image.png` (1200×630, для шеринга)
- [ ] Купить домен и подключить
- [ ] Подключить Yandex.Metrika / Google Analytics
- [ ] (Опционально) подключить Google Sheets API для авто-обновления каталога