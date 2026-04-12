
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function BeforeAfter() {
  const { t } = useLocale();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section className="section-padding bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('beforeAfter.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('beforeAfter.title')}
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
          ref={containerRef}
          onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
          onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <img 
            src={t('beforeAfter.imageAfter')} 
            alt="After cleaning" 
            className="w-full h-[400px] md:h-[600px] object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10">
            {t('beforeAfter.afterLabel')}
          </div>

          {/* Before Image (Foreground, Clipped) */}
          <div 
            className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src={t('beforeAfter.imageBefore')} 
              alt="Before cleaning" 
              className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10">
              {t('beforeAfter.beforeLabel')}
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" /></svg>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
