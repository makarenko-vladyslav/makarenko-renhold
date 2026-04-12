
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Process() {
  const { t } = useLocale();
  const steps = t('process.steps') as { title: string, description: string }[];

  return (
    <section className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('process.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            {t('process.title')}
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-accent/10 via-accent to-accent/10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Number Circle */}
                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-bg-light shadow-xl flex items-center justify-center mb-6 relative z-10 group hover:border-accent transition-colors duration-300">
                  <span className="text-3xl font-display font-black text-primary/20 group-hover:text-accent transition-colors">0{i + 1}</span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
