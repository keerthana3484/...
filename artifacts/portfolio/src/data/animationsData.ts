export type AnimationItem = {
  id: number;
  title: string;
  category: string;
  type: '9:16' | '16:9';
  src?: string;       // e.g. '/videos/morphic-dreamscape.mp4'
  thumbnail?: string; // e.g. '/thumbnails/morphic-dreamscape.jpg'
};

export const twoDAnimations: AnimationItem[] = [
  { id: 1, title: 'Morphic Dreamscape', category: '2D Animation', type: '16:9', src: undefined },
  { id: 2, title: 'Liquid Geometry', category: '2D Animation', type: '16:9', src: undefined },
];

export const titleAnimations: AnimationItem[] = [
  { id: 3, title: 'Cinematic Opening', category: 'Title Animation', type: '9:16', src: undefined },
];

export const textAnimations: AnimationItem[] = [
  { id: 4, title: 'Glitch Type', category: 'Text Animation', type: '9:16', src: undefined },
  { id: 5, title: 'Kinetic Words', category: 'Text Animation', type: '9:16', src: undefined },
  { id: 6, title: 'Fade Reveal', category: 'Text Animation', type: '9:16', src: undefined },
];
