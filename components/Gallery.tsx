
"use client";
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Gallery() {
  const { t } = useLocale();
  const items = t('gallery.items') as { url: string, alt: string }[];

  return (
    <section id="gallery" className="section-padding bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('gallery.badge')}</span>
            <h2 className="text-4xl font-display font-bold text-primary heading-accent pb-4">
              {t('gallery.title')}
            </h2>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={item.url} 
                alt={item.alt} 
                className="w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium">{item.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
