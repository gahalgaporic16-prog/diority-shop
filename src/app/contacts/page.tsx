import { config } from "@/lib/config";
import { Send, Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Контакты",
  description: "Связь с Diority — Telegram, email",
};

export default function ContactsPage() {
  const items = [
    {
      icon: Send,
      title: "Telegram канал",
      desc: "Анонсы новых товаров, акции, обновления",
      href: `https://t.me/${config.telegram.channelUsername}`,
      label: `@${config.telegram.channelUsername}`,
      primary: true,
    },
    {
      icon: MessageCircle,
      title: "Связь с менеджером",
      desc: "Заказы, вопросы, поддержка после покупки",
      href: `https://t.me/${config.telegram.adminUsername}`,
      label: `@${config.telegram.adminUsername}`,
      primary: true,
    },
    {
      icon: Mail,
      title: "Email",
      desc: "Для деловой переписки",
      href: `mailto:${config.contact.email}`,
      label: config.contact.email,
      primary: false,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">Контакты</h1>
      <p className="mt-3 text-[var(--color-text-muted)]">
        Самый быстрый способ связаться — Telegram.
      </p>

      <div className="mt-10 space-y-3">
        {items.map((i) => (
          <a
            key={i.title}
            href={i.href}
            target={i.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 rounded-xl border p-5 transition ${
              i.primary
                ? "border-[var(--color-mint)]/30 bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-soft)]"
                : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-soft)]"
            }`}
          >
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${i.primary ? "bg-[var(--color-mint-soft)] text-[var(--color-mint)]" : "bg-[var(--color-bg-soft)] text-white"}`}>
              <i.icon size={22} />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{i.desc}</div>
            </div>
            <div className="text-sm font-medium text-[var(--color-mint)]">{i.label} →</div>
          </a>
        ))}
      </div>
    </div>
  );
}
