import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tighter mb-8">
          Obsessed with details. <br/>
          <span className="text-secondary">Driven by curiosity.</span>
        </h1>
        
        <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 mb-12">
           <img 
             src="https://picsum.photos/seed/setup/1600/600" 
             alt="Desk Setup" 
             className="w-full h-full object-cover"
           />
        </div>

        <div className="prose prose-lg prose-neutral max-w-none">
          <p className="text-xl leading-relaxed text-secondary mb-8">
            Hello, I'm Alex. I started this channel in 2018 with a borrowed camera and a simple question: 
            "Is this gadget actually worth your money?"
          </p>
          <p className="text-lg text-secondary mb-6">
            Six years and 250,000 subscribers later, the mission hasn't changed. In a world of sponsored content 
            and spec-sheet reading, I strive to provide context. I believe technology should serve us, not the 
            other way around.
          </p>
          <p className="text-lg text-secondary mb-6">
            My background in Computer Science allows me to understand the silicon, but my passion for 
            design helps me appreciate the soul of a product. Whether it's the haptic feedback on a new 
            phone or the thermal efficiency of a laptop chassis, I look for the details that others miss.
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6">Expertise</h3>
          <ul className="space-y-4">
            {[
              "Mobile Hardware Analysis",
              "Video Production & Editing",
              "Ergonomics & Desk Setups",
              "Audio Engineering"
            ].map((skill, i) => (
              <li key={i} className="flex items-center text-secondary">
                <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6">The Gear</h3>
          <p className="text-secondary mb-4">
            I capture everything on the Sony A7S III paired with G Master lenses. Audio is handled by the 
            Shure SM7B. I edit on a Mac Studio (M2 Ultra).
          </p>
        </div>
      </div>
    </div>
  );
};