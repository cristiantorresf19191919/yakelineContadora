'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalculateIcon from '@mui/icons-material/Calculate';
import { ReactNode } from 'react';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navItems: NavItem[] = [
    {
      href: '/',
      icon: <HomeIcon />,
      title: 'INICIO',
      description: 'Página principal',
    },
    {
      href: '/about',
      icon: <PersonIcon />,
      title: 'QUIEN SOY',
      description: 'Conoce más sobre mí',
    },
    {
      href: '/services',
      icon: <BusinessIcon />,
      title: 'SERVICIOS CONTABLES',
      description: 'Servicios profesionales',
    },
    {
      href: '/mentorship',
      icon: <SchoolIcon />,
      title: 'MENTORÍAS',
      description: 'Asesoría personalizada',
    },
    {
      href: '/book',
      icon: <MenuBookIcon />,
      title: 'LIBRO',
      description: 'Publicaciones',
    },
    {
      href: '/blog',
      icon: <ArticleIcon />,
      title: 'BLOG',
      description: 'Artículos y noticias',
    },
    {
      href: '/videos',
      icon: <VideoLibraryIcon />,
      title: 'VIDEO BLOG',
      description: 'Videos y contenido visual',
    },
  ];

  const handleLinkClick = (href: string): void => {
    onClose();
  };

  const overlayVariants = {
    closed: {
      clipPath: 'circle(0px at 0px 0px)',
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      clipPath: 'circle(150vh at 0px 0px)',
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + index * 0.1,
        duration: 0.4,
      },
    }),
  };

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
          <motion.div
            className={styles.content}
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <CloseIcon />
            </button>

            <div className={styles.logo}>
              <CalculateIcon />
            </div>

            <div className={styles.title}>
              <h2>Yakeline Contadora</h2>
            </div>

            <nav className={styles.nav}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  className={styles.navItem}
                  variants={itemVariants}
                  custom={index}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    onClick={() => handleLinkClick(item.href)}
                  >
                    <div className={styles.navContent}>
                      <div className={styles.navIcon}>
                        {item.icon}
                      </div>
                      <div className={styles.navText}>
                        <span className={styles.navTitle}>{item.title}</span>
                        <span className={styles.description}>{item.description}</span>
                      </div>
                    </div>
                    <ChevronRightIcon className={styles.arrow} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className={styles.footer}>
              <p>Yakeline Contadora © {new Date().getFullYear()}</p>
              <p>Asesoría Contable y Tributaria</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
