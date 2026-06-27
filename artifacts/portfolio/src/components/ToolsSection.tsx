import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const tools = [
  {
    name: 'After Effects',
    description: 'Motion Graphics & VFX',
    logo: '/after-effects.png',
    color: '#9999FF',
    bgColor: 'rgba(153,153,255,0.08)',
    borderColor: 'rgba(153,153,255,0.2)',
  },
  {
    name: 'Premiere Pro',
    description: 'Video Editing & SFX',
    logo: '/premiere-pro.png',
    color: '#E0A0FF',
    bgColor: 'rgba(224,160,255,0.08)',
    borderColor: 'rgba(224,160,255,0.2)',
  },
  {
    name: 'Blender',
    description: '3D Modeling & VFX',
    logo: '/blender.png',
    color: '#E87D0D',
    bgColor: 'rgba(232,125,13,0.08)',
    borderColor: 'rgba(232,125,13,0.2)',
  },
  {
    name: 'Photoshop',
    description: 'Design & Compositing',
    logo: '/photoshop.png',
    color: '#31A8FF',
    bgColor: 'rgba(49,168,255,0.08)',
    borderColor: 'rgba(49,168,255,0.2)',
  },
  {
    name: 'Illustrator',
    description: 'Vector Graphics & Assets',
    logo: '/illustrator.png',
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
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            variants={fadeUp}
            whileHover={{ y: -10, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="group relative flex flex-col items-center justify-center gap-5 p-8 rounded-2xl cursor-pointer"
            style={{
              background: tool.bgColor,
              border: `1px solid ${tool.borderColor}`,
            }}
          >
            <div className="relative w-20 h-20">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl -z-10"
                style={{ background: tool.color }}
              />
            </div>

            <div className="text-center">
              <p className="font-sans font-semibold text-foreground text-base leading-tight">
                {tool.name}
              </p>
              <p className="font-sans text-xs mt-1.5" style={{ color: tool.color, opacity: 0.85 }}>
                {tool.description}
              </p>
            </div>

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: `0 0 40px ${tool.color}1a, inset 0 0 30px ${tool.color}08`,
                border: `1px solid ${tool.color}55`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
