import { motion } from 'framer-motion';
import { 
  Video, 
  Wand2, 
  MonitorPlay, 
  Sparkles, 
  Briefcase 
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const skills = [
  { icon: Video, label: 'Video Editing' },
  { icon: Wand2, label: 'Motion Graphics' },
  { icon: MonitorPlay, label: 'Promotional Videos' },
  { icon: Sparkles, label: 'AI-Assisted Creative' },
  { icon: Briefcase, label: 'Branding Content' }
];

const software = ['After Effects', 'Premiere Pro', 'Blender', 'Photoshop', 'Illustrator'];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-center">
        
        {/* Avatar Side */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl p-[1px] bg-gradient-to-b from-primary/50 to-transparent overflow-hidden"
        >
          <div className="absolute inset-0 bg-card rounded-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-background to-card-border/20" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
            <h2 className="text-8xl font-serif text-primary/20 z-0 select-none">AJ</h2>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div 
          className="flex flex-col"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-4">
              Ajay Tharendra
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-lg text-muted-foreground">
              <span>Creative Video Editor & Motion Designer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 hidden sm:block" />
              <span className="px-3 py-1 text-xs border border-primary/30 text-primary rounded-full uppercase tracking-wider">
                Student Freelancer
              </span>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed mb-12 max-w-2xl">
            I'm Ajay Tharendra, a student freelancer passionate about transforming ideas into cinematic visual experiences. I specialize in video editing, motion graphics, promotional films, AI-assisted creative workflows, and brand-focused content that captures attention and tells compelling stories. From concert promotions and cultural events to social media campaigns and title animations, I enjoy blending creativity with precision to create work that feels polished, engaging, and memorable.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-12">
            <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-6 font-medium">Expertise</h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 px-5 py-3 rounded-lg bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <skill.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground/90">{skill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-6 font-medium">Software Stack</h3>
            <div className="flex flex-wrap gap-3">
              {software.map((item, idx) => (
                <span key={idx} className="px-4 py-2 text-sm text-muted-foreground bg-background border border-border rounded-full hover:text-foreground transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
