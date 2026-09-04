/**
 * Логотип Diority — монограмма D.
 * Растровый файл public/logo.png: тот же знак, что стоит аватаркой
 * в Telegram, чтобы сайт и канал не расходились.
 */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt="Diority"
      className="flex-shrink-0 rounded-[22%]"
      style={{ width: size, height: size }}
    />
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} />
      <span className="text-lg font-semibold tracking-[-0.02em]">Diority</span>
    </div>
  );
}
