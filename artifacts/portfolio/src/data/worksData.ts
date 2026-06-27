export type WorkItem = {
  id: number;
  title: string;
  category: string;
  type: '9:16' | '16:9';
  src?: string;       // Path to your video file, e.g. '/videos/my-reel.mp4'
  thumbnail?: string; // Optional thumbnail image, e.g. '/thumbnails/my-reel.jpg'
};

export const worksData: Record<string, WorkItem[]> = {
  REELS: [
    { id: 1, title: 'After Video', category: 'Reel', type: '9:16', src: '/videos/Irizz_final.mp4' },
    { id: 2, title: 'Celebration Videos', category: 'Reel', type: '9:16', src: '/videos/Pongal_2k25.mp4' },
    { id: 3, title: 'Moments to remember', category: 'Reel', type: '9:16', src: '/videos/nalangu.mp4' },
  ],
  'PROMOTIONAL VIDEOS': [
    { id: 4, title: 'Luminary Launch', category: 'Promo', type: '9:16', src: '/videos/Halloween_Aftervideo.mp4' },
    { id: 5, title: 'Pulse Campaign', category: 'Promo', type: '9:16', src: '/videos/Face Video.mp4' },
    { id: 6, title: 'Ethereal Brand Film', category: 'Promo', type: '9:16', src: undefined },
  ],
  'CONCERT EDITS': [
    { id: 7, title: 'Sana-The One', category: 'Concert', type: '16:9', src: '/videos/Sana 1.mp4' },
    { id: 8, title: 'Jonita Gandhi', category: 'Concert', type: '9:16', src: '/videos/Jonita_NIT.mp4' },
    { id: 9, title: 'Rare Piece Vanjaram', category: 'Concert', type: '9:16', src: '/videos/Rare Piece Vanjaram .mp4' },
  ],
  'CULTURAL PROMOS': [
    { id: 10, title: 'Concert Promo', category: 'Cultural', type: '9:16', src: '/videos/Sana_Pranesh.mp4' },
    { id: 11, title: 'Festival of Light', category: 'Cultural', type: '9:16', src: undefined },
    { id: 12, title: 'Roots & Rhythm', category: 'Cultural', type: '16:9', src: undefined },
  ],
  'MASHUPS':[
    { id: 13, title: 'Atharva Murali', category: 'Mashup', type: '16:9', src: '/videos/Mashup 1.mp4'},
    { id: 14, title: 'Chinna Kuyil Chitra', category: 'Mashup', type: '16:9', src: '/videos/Mashup 2.mp4'},
    { id: 15, title: 'Mashup 3', category: 'Mashup', type: '16:9', src: '/videos/Mashup 3.mp4'},
  ],
  'LYRICAL VIDEO':[
    { id: 16, title: 'Thoorigai-Short film', category: 'Lyric Video', type: '16:9', src: '/videos/Lyrical Video.mp4'}
  ]
};
