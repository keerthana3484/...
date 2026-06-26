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
    { id: 1, title: 'Velocity Cuts', category: 'Reel', type: '9:16', src: undefined },
    { id: 2, title: 'Neon Dusk', category: 'Reel', type: '9:16', src: undefined },
    { id: 3, title: 'Golden Hour', category: 'Reel', type: '9:16', src: undefined },
  ],
  'PROMOTIONAL VIDEOS': [
    { id: 4, title: 'Luminary Launch', category: 'Promo', type: '9:16', src: undefined },
    { id: 5, title: 'Pulse Campaign', category: 'Promo', type: '9:16', src: undefined },
    { id: 6, title: 'Ethereal Brand Film', category: 'Promo', type: '9:16', src: undefined },
  ],
  'CONCERT EDITS': [
    { id: 7, title: 'Sana-The One', category: 'Concert', type: '16:9', src: '/videos/Sana 1.mp4' },
    { id: 8, title: 'Amplify Sessions', category: 'Concert', type: '9:16', src: undefined },
    { id: 9, title: 'Stage Odyssey', category: 'Concert', type: '9:16', src: undefined },
  ],
  'CULTURAL PROMOS': [
    { id: 10, title: 'Heritage Unveiled', category: 'Cultural', type: '9:16', src: undefined },
    { id: 11, title: 'Festival of Light', category: 'Cultural', type: '9:16', src: undefined },
    { id: 12, title: 'Roots & Rhythm', category: 'Cultural', type: '16:9', src: undefined },
  ],
  'MASHUPS':[
    { id: 13, title: 'Atharva Murali', category: 'Mashup', type: '16:9', src: '/videos/Mashup 1.mp4'},
    { id: 14, title: 'Mashup 2', category: 'Mashup', type: '16:9', src: '/videos/Mashup 2.mp4'},
    { id: 15, title: 'Mashup 3', category: 'Mashup', type: '16:9', src: '/videos/Mashup 3.mp4'},
  ],
  'LYRICAL VIDEO':[
    { id: 16, title: 'Lyric Video', category: 'Lyric Video', type: '16:9', src: '/videos/Lyric Video.mp4'}
  ]
};
