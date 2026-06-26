import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const tools = [
  {
    name: 'After Effects',
    description: 'Motion Graphics & VFX',
    svg: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect width="240" height="234" rx="26" fill="#00005B"/>
        <path d="M97.67 148.3H60.39L52.92 172H29L66.83 62h25.3L129.9 172h-24.72zm-31.73-18.97h26.18l-13.09-42.47z" fill="#9999FF"/>
        <path d="M148.34 97.36c2.44-10.15 9.48-17.54 21.62-17.54 13.73 0 20.09 8.08 20.09 22.5v3.95h-21.21v-1.75c0-6.15-2.24-9.28-7.18-9.28-5.46 0-8.38 3.44-8.38 11.08v27.65c0 7.64 2.92 11.08 8.38 11.08 4.94 0 7.18-3.13 7.18-9.28v-2.62h21.21v4.52c0 14.42-6.46 22.5-20.09 22.5-12.14 0-19.18-7.39-21.62-17.54z" fill="#9999FF"/>
      </svg>
    ),
    color: '#9999FF',
    bgColor: 'rgba(153,153,255,0.08)',
    borderColor: 'rgba(153,153,255,0.2)',
  },
  {
    name: 'Premiere Pro',
    description: 'Video Editing',
    svg: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect width="240" height="234" rx="26" fill="#00005B"/>
        <path d="M53.63 62h40.21c22.52 0 36.73 13.05 36.73 36.25 0 24.11-14.69 37.64-37.69 37.64H76.6V172H53.63zm23.27 55.4h14.74c9.82 0 15.82-5.54 15.82-18.9 0-12.64-5.69-18.11-15.82-18.11H76.9z" fill="#E0A0FF"/>
        <path d="M143.63 62h40.21c22.52 0 36.73 13.05 36.73 36.25 0 24.11-14.69 37.64-37.69 37.64h-16.28V172h-22.97zm23.27 55.4h14.74c9.82 0 15.82-5.54 15.82-18.9 0-12.64-5.69-18.11-15.82-18.11H166.9z" fill="#E0A0FF"/>
      </svg>
    ),
    color: '#E0A0FF',
    bgColor: 'rgba(224,160,255,0.08)',
    borderColor: 'rgba(224,160,255,0.2)',
  },
  {
    name: 'Photoshop',
    description: 'Design & Compositing',
    svg: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect width="240" height="234" rx="26" fill="#001E36"/>
        <path d="M53.63 62h40.21c22.52 0 36.73 13.05 36.73 36.25 0 24.11-14.69 37.64-37.69 37.64H76.6V172H53.63zm23.27 55.4h14.74c9.82 0 15.82-5.54 15.82-18.9 0-12.64-5.69-18.11-15.82-18.11H76.9zM143.44 107.9c-.39-2.24-.78-4.89-.78-7.93 0-7.15 3.02-13.49 8.38-17.83 5.4-4.4 12.95-6.7 22.32-6.7 15.65 0 27.03 6.04 30.91 16.7l-17.73 8.33c-1.56-5.38-6.19-9.19-12.36-9.19-4.8 0-7.93 2.14-7.93 5.79 0 3.31 2.97 5.16 10.29 7.64l4.79 1.56c15.75 5.21 23.88 13.05 23.88 26.1 0 16.95-12.95 26.49-32.44 26.49-9.62 0-17.93-2.24-24.01-6.65-5.98-4.21-9.91-10.46-10.79-18.77l19.7-5.65c.97 7.54 5.4 12.26 13.74 12.26 5.84 0 9.23-2.43 9.23-6.75 0-3.41-2.72-5.75-10.73-8.43l-4.89-1.65c-13.83-4.7-21.57-11.64-21.57-21.32z" fill="#31A8FF"/>
      </svg>
    ),
    color: '#31A8FF',
    bgColor: 'rgba(49,168,255,0.08)',
    borderColor: 'rgba(49,168,255,0.2)',
  },
  {
    name: 'Blender',
    description: '3D & Motion',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M12.51 13.214c.046-.8.438-1.538 1.063-2.04a3.21 3.21 0 0 1 2.068-.696 3.17 3.17 0 0 1 2.047.696c.609.511.99 1.247 1.02 2.04.045.812-.3 1.598-.93 2.14a3.23 3.23 0 0 1-2.137.78 3.2 3.2 0 0 1-2.117-.78c-.627-.54-.976-1.328-.917-2.14zm-5.934 5.716l-.002.003.363.22zm6.18-14.974a5.37 5.37 0 0 0-1.43.694c-.44.313-.809.72-1.07 1.19H8.233c-.69 0-1.37.19-1.963.548a4.02 4.02 0 0 0-1.418 1.478 3.91 3.91 0 0 0 .018 3.896 4.01 4.01 0 0 0 1.444 1.46 3.93 3.93 0 0 0 1.97.525l.013.002h.012c.025 0 .05-.003.074-.003v3.285l.069.042 3.237 1.97.095.058v-5.343a5.64 5.64 0 0 0 1.875.332 5.79 5.79 0 0 0 3.74-1.38 5.73 5.73 0 0 0 1.878-3.527 5.72 5.72 0 0 0-.822-3.853 5.76 5.76 0 0 0-3.16-2.423 5.8 5.8 0 0 0-3.927.249zM3.24 17.532A9.94 9.94 0 0 1 2 12.003C2 6.478 6.478 2 12.003 2c.753 0 1.487.084 2.195.244a9.96 9.96 0 0 1 5.618 3.538 9.94 9.94 0 0 1 2.169 5.821A9.98 9.98 0 0 1 20.5 16.4a10.02 10.02 0 0 1-3.978 3.97 9.97 9.97 0 0 1-5.406 1.188 9.97 9.97 0 0 1-5.187-1.739l-2.688 1.638-.4.245v-3.05l.399-.244z" fill="#E87D0D"/>
      </svg>
    ),
    color: '#E87D0D',
    bgColor: 'rgba(232,125,13,0.08)',
    borderColor: 'rgba(232,125,13,0.2)',
  },
  {
    name: 'Illustrator',
    description: 'Vector & Graphics',
    svg: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect width="240" height="234" rx="26" fill="#330000"/>
        <path d="M97.67 148.3H60.39L52.92 172H29L66.83 62h25.3L129.9 172h-24.72zm-31.73-18.97h26.18l-13.09-42.47zM152.93 72.25c0-7.06 5.06-11.51 11.7-11.51 6.85 0 11.7 4.65 11.7 11.51 0 7.06-4.85 11.51-11.7 11.51-6.64 0-11.7-4.45-11.7-11.51zM153.62 95h21.97v77h-21.97z" fill="#FF9A00"/>
      </svg>
    ),
    color: '#FF9A00',
    bgColor: 'rgba(255,154,0,0.08)',
    borderColor: 'rgba(255,154,0,0.2)',
  },
];

export default function ToolsSection() {
  return (
    <section id="tools" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.25em] text-primary mb-4 font-sans">
          My Arsenal
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground">
          Tools I <span className="italic text-primary">Use</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl font-sans">
          The software behind every frame, effect, and visual story.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl cursor-pointer"
            style={{
              background: tool.bgColor,
              border: `1px solid ${tool.borderColor}`,
            }}
          >
            <motion.div
              className="relative flex items-center justify-center w-16 h-16 rounded-xl"
              style={{ background: tool.bgColor }}
              whileHover={{ rotate: [0, -4, 4, 0] }}
              transition={{ duration: 0.4 }}
            >
              {tool.svg}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: tool.color }}
              />
            </motion.div>

            <div className="text-center">
              <p className="font-sans font-medium text-foreground text-sm leading-tight">
                {tool.name}
              </p>
              <p className="font-sans text-xs mt-1" style={{ color: tool.color, opacity: 0.8 }}>
                {tool.description}
              </p>
            </div>

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: `0 0 30px ${tool.color}22, inset 0 0 30px ${tool.color}08`,
                border: `1px solid ${tool.color}44`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
