export type AnimationItem = {
  id: number;
  title: string;
  category: string;
  type: '9:16' | '16:9' | '1:1';
  src?: string;       // e.g. '/videos/morphic-dreamscape.mp4'
  thumbnail?: string; // e.g. '/thumbnails/morphic-dreamscape.jpg'
};

export const twoDAnimations: AnimationItem[] = [
  { id: 1, title: 'Recreations', category: '2D Animation', type: '1:1', src: '/videos/2d Animation 1.mp4'},
  { id: 2, title: 'Smooth Loops', category: '2D Animation', type: '16:9', src:'/videos/2d Animation.mp4'},
  { id: 3, title: 'Invitations', category: '2D Animation', type: '16:9', src:'/videos/Invitation-1.mp4'},
];

export const titleAnimations: AnimationItem[] = [
  { id: 3, title: 'Cinematic Opening', category: 'Title Animation', type: '9:16', src: '/videos/VSR_1.mp4' },
];

export const Motionposter: AnimationItem[] = [
  { id: 4, title: 'Trophy Event', category: 'Motion Poster', type: '9:16', src: '/videos/CCL.mp4' },
  { id: 5, title: 'After Video', category: 'Motion Poster', type: '9:16', src:'/videos/Motion.mp4'},
  { id: 6, title: 'Event Promo Poster', category: 'Motion Poster', type: '16:9', src: '/videos/Comp 1.mp4' },
];
