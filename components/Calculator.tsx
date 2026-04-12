
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';
import pricingData from '@/lib/pricing.json';

export default function Calculator() {
  const { t } = useLocale();
  const [sqm, setSqm] = useState(80);
  const [serviceType, setServiceType] = useState('standard');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Complex interpolation logic to match exact client quotes
  const calculateBasePrice = (sqmValue: number) => {
    const points = pricingData.basePricing.points;
    
    // Exact matches
    const exact = points.find(p => p.sqm === sqmValue);
    if (exact) return exact.price;

    // Interpolation
    for (let i = 0; i < points.length - 1; i++) {
      if (sqmValue > points[i].sqm && sqmValue < points[i+1].sqm) {
        const p1 = points[i];
        const p2 = points[i+1];
        const ratio = (sqmValue - p1.sqm) / (p2.sqm - p1.sqm);
        return Math.round(p1.price + ratio * (p2.price - p1.price));
      }
    }
    
    // Extrapolation above max
    const last = points[points.length - 1];
    if (sqmValue > last.sqm) {
      return last.price + (sqmValue - last.sqm) * 10; // arbitrary scale above 300
    }
    
    return 500; // fallback
  };

  useEffect(() => {
    const base = calculateBasePrice(sqm);
    const multiplier = pricingData.services[serviceType as keyof typeof pricingData.services]?.multiplier || 1;
    setCalculatedPrice(Math.round(base * multiplier));
  }, [sqm, serviceType]);

  return (
    <section id="calculator" className="section-padding bg-primary relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Side */}
          <div className="text-white">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">{t('calculator.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('calculator.title')}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              {t('calculator.subtitle')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-white/80 text-sm">Prisen er fast basert på kvadratmeter. Ingen skjulte tillegg for standard rengjøring.</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <p className="text-white/80 text-sm">Ved første rengjøring bruker vi ofte mer tid, og fakturerer da per time (300-370 kr).</p>
              </div>
            </div>
          </div>

          {/* Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel-dark rounded-3xl p-8 md:p-10 relative"
          >
            {/* Service Type Selection */}
            <div className="mb-8">
              <label className="block text-white/80 text-sm font-semibold mb-4">{t('calculator.serviceTypeLabel')}</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(pricingData.services).map(([key, service]) => (
                  <button
                    key={key}
                    onClick={() => setServiceType(key)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                      serviceType === key 
                        ? 'bg-accent/20 border-accent text-white' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SQM Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-white/80 text-sm font-semibold">{t('calculator.sqmLabel')}</label>
                <span className="text-2xl font-display font-bold text-white">{sqm} m²</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="250" 
                step="5"
                value={sqm}
                onChange={(e) => setSqm(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>30 m²</span>
                <span>250 m²</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-primary/50 rounded-2xl p-6 border border-white/10 text-center mb-6">
              <p className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wider">{t('calculator.estimatedPrice')}</p>
              <div className="text-5xl font-display font-extrabold text-white flex items-center justify-center gap-2">
                <motion.span
                  key={calculatedPrice}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gradient-light"
                >
                  {calculatedPrice}
                </motion.span>
                <span className="text-2xl text-white/50 font-normal">kr</span>
              </div>
            </div>

            <p className="text-xs text-white/40 text-center mb-6 leading-relaxed">
              {t('calculator.disclaimer')}
            </p>

            <a 
              href={`#contact?sqm=${sqm}&service=${serviceType}`}
              className="block w-full bg-accent hover:bg-accent-hover text-white text-center py-4 rounded-xl font-bold transition-colors shadow-lg shadow-accent/20"
            >
              {t('calculator.bookCta')}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
