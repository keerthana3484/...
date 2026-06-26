export type PosterItem = {
  id: number;
  title: string;
  category: string;
  gradient: string;   // CSS gradient string used as inline style
  src?: string;       // your poster image, e.g. '/posters/midnight-frequency.jpg'
};

export const postersData: PosterItem[] = [
  { id: 1, title: 'Midnight Frequency', category: 'Concert Poster', gradient: 'linear-gradient(135deg, #4c1d95, #3730a3, #1e1b4b)', src: undefined },
  { id: 2, title: 'Solstice Rising',    category: 'Cultural Event',  gradient: 'linear-gradient(135deg, #b45309, #c2410c, #7c2d12)', src: undefined },
  { id: 3, title: 'Neon Noir',          category: 'Brand Identity',  gradient: 'linear-gradient(135deg, #0e7490, #0f766e, #134e4a)', src: undefined },
  { id: 4, title: 'Ember & Ash',        category: 'Film Promo',      gradient: 'linear-gradient(135deg, #c2410c, #9a3412, #431407)', src: undefined },
  { id: 5, title: 'The Quiet Hours',    category: 'Social Media',    gradient: 'linear-gradient(135deg, #1d4ed8, #4338ca, #1e1b4b)', src: undefined },
  { id: 6, title: 'Crimson Horizon',    category: 'Event Promo',     gradient: 'linear-gradient(135deg, #be123c, #9f1239, #4c0519)', src: undefined },
];
