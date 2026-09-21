/**
 * «Вырезанные» предметы для коллажа на первом экране.
 * Плоская векторная графика в палитре сайта — чёрный, белый, красный.
 * Если положить свой PNG без фона в /public/stickers, он подменит объект
 * (см. src/content/collage.ts).
 */

export type ObjectName = 'gradebook' | 'coffee' | 'laptop' | 'headphones' | 'notes';

function Gradebook() {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true">
      <rect x="16" y="8" width="68" height="104" rx="7" fill="#000" />
      <rect x="23" y="8" width="7" height="104" fill="#ffffff" opacity="0.16" />
      <rect x="36" y="30" width="36" height="5" rx="2.5" fill="#fff" />
      <rect x="36" y="44" width="36" height="5" rx="2.5" fill="#fff" />
      <rect x="36" y="58" width="22" height="5" rx="2.5" fill="#fff" />
      <circle cx="62" cy="86" r="15" fill="#df030d" />
      <path d="M55 86.5l5 5 10-11" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Coffee() {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true">
      <path d="M45 18c0-6 9-6 9-13M60 18c0-6 9-6 9-13" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M26 36h48l-6 68a9 9 0 0 1-9 8H41a9 9 0 0 1-9-8z" fill="#fff" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
      <rect x="20" y="22" width="60" height="15" rx="5" fill="#000" />
      <rect x="31" y="58" width="38" height="22" rx="3" fill="#df030d" />
      <rect x="37" y="66" width="26" height="4" rx="2" fill="#fff" />
    </svg>
  );
}

function Laptop() {
  return (
    <svg viewBox="0 0 140 100" aria-hidden="true">
      <rect x="22" y="10" width="96" height="66" rx="6" fill="#000" />
      <rect x="29" y="17" width="82" height="52" rx="3" fill="#fff" />
      <rect x="37" y="27" width="44" height="6" rx="3" fill="#000" />
      <rect x="37" y="39" width="28" height="6" rx="3" fill="#df030d" />
      <rect x="37" y="51" width="60" height="6" rx="3" fill="#d8d8d8" />
      <path d="M8 80h124l-6 12H14z" fill="#000" />
      <rect x="58" y="83" width="24" height="4" rx="2" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function Headphones() {
  return (
    <svg viewBox="0 0 110 100" aria-hidden="true">
      <path d="M22 66V52a33 33 0 0 1 66 0v14" stroke="#000" strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="10" y="58" width="22" height="34" rx="10" fill="#000" />
      <rect x="78" y="58" width="22" height="34" rx="10" fill="#df030d" />
    </svg>
  );
}

function Notes() {
  return (
    <svg viewBox="0 0 110 110" aria-hidden="true">
      <rect x="10" y="14" width="86" height="84" rx="6" fill="#fff" stroke="#000" strokeWidth="5" />
      <rect x="10" y="14" width="86" height="16" rx="6" fill="#000" />
      <circle cx="30" cy="10" r="5" fill="#000" />
      <circle cx="55" cy="10" r="5" fill="#000" />
      <circle cx="80" cy="10" r="5" fill="#000" />
      <rect x="24" y="46" width="58" height="5" rx="2.5" fill="#000" />
      <rect x="24" y="60" width="58" height="5" rx="2.5" fill="#d8d8d8" />
      <rect x="24" y="74" width="34" height="5" rx="2.5" fill="#df030d" />
    </svg>
  );
}

const map: Record<ObjectName, () => React.JSX.Element> = {
  gradebook: Gradebook,
  coffee: Coffee,
  laptop: Laptop,
  headphones: Headphones,
  notes: Notes,
};

export function CollageObject({ name }: { name: ObjectName }) {
  const Component = map[name];
  return <Component />;
}
