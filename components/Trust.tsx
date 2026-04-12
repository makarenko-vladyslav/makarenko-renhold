
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Trust() {
  const { t } = useLocale();
  const us = t('trust.comparison.us.points') as string[];
  const them = t('trust.comparison.them.points') as string[];

  return (
    <section id="trust" className="section-padding bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('trust.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 heading-accent pb-4">
            {t('trust.title')}
          </h2>
          <p className="text-text-muted text-lg">
            {t('trust.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Them */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm opacity-80"
          >
            <h3 className="text-xl font-display font-bold text-text-muted mb-6 pb-4 border-b border-gray-100">
              {t('trust.comparison.them.title')}
            </h3>
            <ul className="space-y-4">
              {them.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-text-muted">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Us */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-8 rounded-2xl border border-primary-light shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <h3 className="text-xl font-display font-bold text-white mb-6 pb-4 border-b border-white/10">
              {t('trust.comparison.us.title')}
            </h3>
            <ul className="space-y-4 relative z-10">
              {us.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
