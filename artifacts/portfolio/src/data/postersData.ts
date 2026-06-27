export type PosterItem = {
  id: number;
  title: string;
  category: string;
  gradient: string;   // CSS gradient string used as inline style
  src?: string;       // your poster image, e.g. '/posters/midnight-frequency.jpg'
};

export const postersData: PosterItem[] = [
  { id: 1, title: 'Fan Art', category: 'Re-Visualised', gradient: 'linear-gradient(135deg, #4c1d95, #3730a3, #1e1b4b)', src:'/Posters/Champagini.png' },
  { id: 2, title: 'Instagram Poster',    category: 'Customized Poster',  gradient: 'linear-gradient(135deg, #b45309, #c2410c, #7c2d12)', src: '/Posters/Disco_Poster.png' },
  { id: 3, title: 'Fan Art',          category: 'Identity',  gradient: 'linear-gradient(135deg, #0e7490, #0f766e, #134e4a)', src:'Posters/Gukesh_poster2.jpg.jpeg' },
  { id: 4, title: 'Fan Art',        category: 'Brutalism',      gradient: 'linear-gradient(135deg, #c2410c, #9a3412, #431407)', src: 'Posters/Breaking_bad_dc.jpg.jpeg' },
  { id: 5, title: 'Fan Art',    category: 'Character Poster',    gradient: 'linear-gradient(135deg, #1d4ed8, #4338ca, #1e1b4b)', src: 'Posters/TLOU_Joel.png' },
  { id: 6, title: 'Fan Art',    category: 'Minimalism',     gradient: 'linear-gradient(135deg, #be123c, #9f1239, #4c0519)', src: 'Posters/Nayakan_main.png' },
  
];
