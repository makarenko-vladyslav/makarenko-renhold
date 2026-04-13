
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.pricing'), href: '#calculator' },
    { name: t('nav.about'), href: '#trust' },
    { name: t('nav.reviews'), href: '#testimonials' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/30 group-hover:scale-105 transition-transform hidden">
            M
          </div>
          <span className={`font-display font-bold text-xl uppercase tracking-tighter w-fit h-fit opacity-90 shadow-lg cursor-pointer ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>
            Makarenko
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? 'text-text-main' : 'text-white/90 drop-shadow-sm'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setLocale(locale === 'no' ? 'en' : 'no')}
            className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
              scrolled ? 'text-text-muted hover:text-primary bg-gray-100' : 'text-white/80 hover:text-white bg-white/10 backdrop-blur-sm'
            }`}
          >
            {locale}
          </button>
          <a 
            href="#contact"
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
          >
            {t('nav.cta')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className={`w-6 h-6 ${scrolled ? 'text-primary' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-text-main border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={() => { setLocale(locale === 'no' ? 'en' : 'no'); setMobileMenuOpen(false); }}
                className="text-sm font-bold uppercase bg-gray-100 px-4 py-2 rounded"
              >
                {locale === 'no' ? 'English' : 'Norsk'}
              </button>
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-accent text-white px-6 py-2 rounded-full font-semibold"
              >
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
