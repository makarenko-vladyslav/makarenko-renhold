
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function CtaBanner() {
  const { t } = useLocale();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[80px] opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-50" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {t('ctaBanner.title')}
            </h2>
            <p className="text-xl text-white/80 mb-10">
              {t('ctaBanner.subtitle')}
            </p>
            <a 
              href="#contact"
              className="inline-block bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1"
            >
              {t('ctaBanner.button')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
