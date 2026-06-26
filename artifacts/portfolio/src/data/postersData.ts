export type PosterItem = {
  id: number;
  title: string;
  category: string;
  gradient: string;   // fallback gradient shown when no image is set
  src?: string;       // your poster image, e.g. '/posters/midnight-frequency.jpg'
};

export const postersData: PosterItem[] = [
  { id: 1, title: 'Midnight Frequency', category: 'Concert Poster', gradient: 'from-purple-900 to-black', src: undefined },
  { id: 2, title: 'Solstice Rising',    category: 'Cultural Event',  gradient: 'from-amber-900 to-stone-900', src: undefined },
  { id: 3, title: 'Neon Noir',          category: 'Brand Identity',  gradient: 'from-cyan-900 to-black', src: undefined },
  { id: 4, title: 'Ember & Ash',        category: 'Film Promo',      gradient: 'from-orange-900 to-black', src: undefined },
  { id: 5, title: 'The Quiet Hours',    category: 'Social Media',    gradient: 'from-slate-800 to-black', src: undefined },
  { id: 6, title: 'Crimson Horizon',    category: 'Event Promo',     gradient: 'from-red-900 to-zinc-900', src: undefined },
];
