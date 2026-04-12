
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Testimonials() {
  const { t } = useLocale();
  const items = t('testimonials.items') as { name: string, role: string, text: string, rating: number }[];

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('testimonials.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-light p-8 rounded-2xl border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-accent/20">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              
              <p className="text-text-main italic mb-8 relative z-10 leading-relaxed">"{item.text}"</p>
              
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/seed/${item.name}/100/100`} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-primary">{item.name}</div>
                  <div className="text-xs text-text-muted">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
