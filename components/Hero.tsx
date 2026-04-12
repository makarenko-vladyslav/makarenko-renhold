
"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '@/lib/i18n';
import { useRef } from 'react';

export default function Hero() {
  const { t } = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={t('hero.imageUrl')} 
          alt="Clean interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent w-full md:w-2/3" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center pt-20">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-7 lg:col-span-6 text-white"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t('hero.badge')}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6 whitespace-pre-line font-bold">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#calculator"
              className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_30px_hsl(185_70%_40%/0.4)] hover:shadow-[0_0_40px_hsl(185_70%_40%/0.6)] hover:-translate-y-1 flex items-center gap-2"
            >
              {t('hero.ctaPrimary')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <a 
              href="#services"
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </motion.div>

        {/* Floating Glass Card (Mockup/Proof) */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateY: 15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="md:col-span-5 lg:col-span-5 lg:col-start-8 hidden md:block perspective-1000"
        >
          <div className="glass-panel-dark rounded-2xl p-6 transform rotate-y-[-5deg] rotate-x-[5deg] animate-[float_6s_ease-in-out_infinite]">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Fast Pris Garanti</div>
                  <div className="text-white/50 text-xs">Ingen skjulte gebyrer</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: "80 m² Bolig", price: "1000 kr" },
                { label: "170 m² Bolig", price: "1500 kr" },
                { label: "Vindusvask", price: "fra 500 kr" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                  <span className="text-white/80 text-sm">{item.label}</span>
                  <span className="text-accent font-bold">{item.price}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/face${i}/40/40`} className="w-8 h-8 rounded-full border-2 border-primary" alt="User" />
                ))}
              </div>
              <div className="text-xs text-white/60 text-right">
                <span className="text-white font-bold block">5.0 / 5.0</span>
                Kundeomtaler
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
