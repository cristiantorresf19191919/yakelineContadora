'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalculateIcon from '@mui/icons-material/Calculate';
import { ReactNode, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useLanguage } from '@/app/contexts/LanguageContext';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  icon: ReactNode;
  es: string;
  en: string;
  descEs: string;
  descEn: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: <HomeIcon />, es: 'INICIO', en: 'HOME', descEs: 'Página principal', descEn: 'Homepage' },
  { href: '/about', icon: <PersonIcon />, es: 'QUIEN SOY', en: 'ABOUT', descEs: 'Conoce más sobre mí', descEn: 'More about me' },
  { href: '/services', icon: <BusinessIcon />, es: 'SERVICIOS', en: 'SERVICES', descEs: 'Servicios profesionales', descEn: 'Professional services' },
  { href: '/mentorship', icon: <SchoolIcon />, es: 'MENTORÍAS', en: 'MENTORSHIP', descEs: 'Asesoría personalizada', descEn: 'Personalized guidance' },
  { href: '/citas', icon: <CalendarMonthIcon />, es: 'AGENDAR CITA', en: 'BOOK NOW', descEs: 'Reserva tu consulta', descEn: 'Book your consult' },
  { href: '/book', icon: <MenuBookIcon />, es: 'LIBRO', en: 'BOOK', descEs: 'Publicaciones', descEn: 'Publications' },
  { href: '/blog', icon: <ArticleIcon />, es: 'BLOG', en: 'BLOG', descEs: 'Artículos y noticias', descEn: 'Articles & news' },
  { href: '/videos', icon: <VideoLibraryIcon />, es: 'VIDEO BLOG', en: 'VIDEOS', descEs: 'Videos y contenido', descEn: 'Videos & content' },
];

const overlayVariants: Variants = {
  closed: { clipPath: 'circle(0px at 36px 36px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  open: { clipPath: 'circle(150vh at 36px 36px)', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};
const contentVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { delay: 0.15, duration: 0.3, staggerChildren: 0.06, delayChildren: 0.22 } },
};
const itemVariants: Variants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};
const headerVariants: Variants = {
  closed: { opacity: 0, scale: 0.8 },
  open: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.1 } },
};
const closeButtonVariants: Variants = {
  closed: { opacity: 0, rotate: -90, scale: 0.5 },
  open: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.3 } },
};
const ctaVariants: Variants = {
  closed: { opacity: 0, y: 20, scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.62 } },
};
const footerVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { delay: 0.72, duration: 0.4 } },
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    if (isOpen) document.body.setAttribute('data-overlay-open', 'true');
    else document.body.removeAttribute('data-overlay-open');
    return () => document.body.removeAttribute('data-overlay-open');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={onClose}
        >
          <div className={styles.orbField} aria-hidden>
            <motion.div
              className={`${styles.orb} ${styles.orb1}`}
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={`${styles.orb} ${styles.orb2}`}
              animate={{ scale: [1, 0.9, 1.1, 1], rotate: [0, -90, -180, -360] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={`${styles.orb} ${styles.orb3}`}
              animate={{ scale: [1, 1.2, 0.95, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <motion.div
            className={styles.content}
            variants={contentVariants}
            initial="closed"
            animate="open"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label={t('Cerrar menú', 'Close menu')}
              variants={closeButtonVariants}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.85 }}
            >
              <CloseIcon />
            </motion.button>

            <motion.div className={styles.headerRow} variants={headerVariants}>
              <span className={styles.logoBadge}>
                <CalculateIcon />
              </span>
              <h2 className={styles.headerTitle}>Yakeline Contadora</h2>
              <p className={styles.headerTagline}>
                {t('Asesoría contable y tributaria', 'Accounting & tax advisory')}
              </p>
            </motion.div>

            <div className={styles.navScroll}>
              <nav className={styles.nav} aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.href} className={styles.navItem} variants={itemVariants}>
                    <Link className={styles.navLink} href={item.href} onClick={onClose}>
                      <div className={styles.navContent}>
                        <span className={styles.navIcon}>{item.icon}</span>
                        <div className={styles.navText}>
                          <span className={styles.navTitle}>{lang === 'es' ? item.es : item.en}</span>
                          <span className={styles.navDesc}>
                            {lang === 'es' ? item.descEs : item.descEn}
                          </span>
                        </div>
                      </div>
                      <span className={styles.arrow}>
                        <ChevronRightIcon />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className={styles.stickyBottom}>
              <motion.div className={styles.ctaSection} variants={ctaVariants}>
                <Link className={styles.ctaButton} href="/citas" onClick={onClose}>
                  <CalendarMonthIcon />
                  {t('Agendar cita', 'Book now')}
                  <motion.span
                    className={styles.ctaShine}
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                    aria-hidden
                  />
                </Link>
              </motion.div>

              <motion.div className={styles.footer} variants={footerVariants}>
                <div className={styles.footerTop}>
                  <p className={styles.footerBrand}>
                    Yakeline Contadora © {new Date().getFullYear()}
                  </p>
                  <div className={styles.footerControls}>
                    <div className={styles.langPill}>
                      <button
                        type="button"
                        className={`${styles.langOption} ${lang === 'es' ? styles.langActive : ''}`}
                        onClick={() => setLang('es')}
                        aria-label="Español"
                      >
                        🇨🇴 ES
                      </button>
                      <button
                        type="button"
                        className={`${styles.langOption} ${lang === 'en' ? styles.langActive : ''}`}
                        onClick={() => setLang('en')}
                        aria-label="English"
                      >
                        🇺🇸 EN
                      </button>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
                <p className={styles.footerTagline}>
                  {t('Tu tranquilidad financiera, nuestra prioridad.', 'Your financial peace of mind, our priority.')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
