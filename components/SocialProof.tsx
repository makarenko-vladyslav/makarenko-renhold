
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function SocialProof() {
  const { t } = useLocale();
  const stats = t('socialProof.stats') as { value: string, label: string }[];

  return (
    <section className="bg-bg-white py-12 border-b border-gray-100 relative z-20 -mt-4 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">
            {t('socialProof.text')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center pt-6 md:pt-0"
            >
              <div className="text-4xl font-display font-extrabold text-primary mb-2 flex items-center gap-1">
                {stat.value}
                {i === 0 && <span className="text-accent text-2xl">★</span>}
              </div>
              <div className="text-sm text-text-muted font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
