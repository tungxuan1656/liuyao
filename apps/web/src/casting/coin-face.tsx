export function CoinFace({ value, name }: { value: number; name?: string }) {
  const isHeads = Boolean(value);
  return (
    <span
      className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 transition-all select-none ${
        isHeads
          ? 'bg-neutral-900 border-neutral-900 text-white'
          : 'bg-white border-neutral-300 text-neutral-400'
      }`}
    >
      {name && (
        <span className="text-[9px] leading-none mb-0.5 font-medium opacity-70">{name}</span>
      )}
      <span className="text-xl leading-none" aria-hidden="true">
        {isHeads ? '☀' : '☾'}
      </span>
      <span className="sr-only">
        {name ? `${name}, ` : ''}
        {isHeads ? 'mặt trời' : 'mặt trăng'}
      </span>
    </span>
  );
}
