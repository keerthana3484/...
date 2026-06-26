export type VFXItem = {
  id: number;
  title: string;
  category: string;
  type: '16:9';
  src?: string;       // e.g. '/videos/particle-storm.mp4'
  thumbnail?: string; // e.g. '/thumbnails/particle-storm.jpg'
};

export const vfxData: VFXItem[] = [
  { id: 1, title: 'Particle Storm', category: 'VFX', type: '16:9', src: undefined },
  { id: 2, title: 'Digital Glitch', category: 'VFX', type: '16:9', src: undefined },
];
