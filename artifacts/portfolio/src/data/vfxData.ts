import { animations } from "framer-motion";

export type VFXItem = {
  id: number;
  title: string;
  category: string;
  type: '16:9';
  src?: string;       // e.g. '/videos/particle-storm.mp4'
  thumbnail?: string; // e.g. '/thumbnails/particle-storm.jpg'
};

export const vfxData: VFXItem[] = [
  { id: 1, title: 'Smooth Animations', category: 'VFX', type: '16:9', src: '/videos/2d Animation.mp4' },
  { id: 2, title: 'Digital Glitch', category: 'VFX', type: '16:9', src: undefined },
];
