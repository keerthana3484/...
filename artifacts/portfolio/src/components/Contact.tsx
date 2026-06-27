import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const contacts = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@jaysthetics._",
    href: "https://instagram.com/jaysthetics._"
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    handle: "+91 95006 54475",
    href: "https://wa.me/919500654475"
  },
  {
    icon: Mail,
    label: "Email",
    handle: "ajaytharendra@gmail.com",
    href: "mailto:ajaytharendra@gmail.com"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-20 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-serif text-foreground mb-6">
          Let's create <br className="sm:hidden" />
          <span className="italic text-primary">something unforgettable.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Available for freelance projects, creative collaborations, and more.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {contacts.map((contact, i) => (
          <motion.a
            key={i}
            variants={fadeUp}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(204,153,51,0.15)] transition-all duration-500 mb-6">
              <contact.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">{contact.label}</h3>
            <p className="text-primary font-mono text-sm tracking-wide">{contact.handle}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
