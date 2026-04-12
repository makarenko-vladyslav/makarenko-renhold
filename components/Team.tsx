
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Team() {
  const { t } = useLocale();
  const items = t('team.items') as { name: string, role: string, bio: string, imageUrl: string }[];

  return (
    <section className="section-padding bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('team.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              {t('team.title')}
            </h2>
            
            {items.map((person, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-1">{person.name}</h3>
                <p className="text-accent font-medium mb-6">{person.role}</p>
                <p className="text-text-muted leading-relaxed text-lg">
                  {person.bio}
                </p>
              </div>
            ))}
            
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <span className="font-semibold text-primary">Personlig garanti på hvert oppdrag</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 scale-105 opacity-20" />
            <img 
              src={items[0].imageUrl} 
              alt={items[0].name} 
              className="relative rounded-3xl w-full object-cover shadow-2xl aspect-[4/5]"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
