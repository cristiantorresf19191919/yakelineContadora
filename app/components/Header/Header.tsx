"use client";

import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CalculateIcon from "@mui/icons-material/Calculate";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStyles from "./Header.styles";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CommandPaletteTrigger } from "../CommandPalette/CommandPalette";
import { useLanguage } from "@/app/contexts/LanguageContext";

const navItemsData = [
  { es: "INICIO", en: "HOME", href: "/" },
  { es: "QUIEN SOY", en: "ABOUT", href: "/about" },
  { es: "SERVICIOS CONTABLES", en: "SERVICES", href: "/services" },
  { es: "MENTORÍAS", en: "MENTORSHIP", href: "/mentorship" },
  { es: "AGENDAR CITA", en: "BOOK NOW", href: "/citas" },
  { es: "LIBRO", en: "BOOK", href: "/book" },
  { es: "BLOG", en: "BLOG", href: "/blog" },
  { es: "VIDEO BLOG", en: "VIDEOS", href: "/videos" },
];

export default function Header() {
  const { classes } = useStyles();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const navItems = navItemsData.map((item) => ({
    label: lang === "es" ? item.es : item.en,
    href: item.href,
  }));

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setRippleKey((prev) => prev + 1);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.headerContainer}>
        <Link href="/" className={classes.logoLink}>
          <Box className={classes.logoContainer}>
            <Box className={classes.logoIcon}>
              <CalculateIcon />
            </Box>
            <Typography className={classes.logoText} variant="h6" component="span">
              Yakeline Contadora
            </Typography>
          </Box>
        </Link>

        <Box
          component="nav"
          className={classes.nav}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href || "#"}
              className={classes.navLink}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}

          {/* Search · Language Toggle · Theme Wheel */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, ml: 1 }}>
            <CommandPaletteTrigger />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                border: "1.5px solid var(--border)",
                borderRadius: "20px",
                overflow: "hidden",
                height: 32,
              }}
            >
              <Box
                component="button"
                onClick={() => setLang("es")}
                aria-label="Español"
                sx={{
                  px: 1.2,
                  py: 0.4,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: lang === "es" ? "var(--brand-gradient)" : "transparent",
                  color: lang === "es" ? "#fff" : "var(--brand-primary)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                🇨🇴 ES
              </Box>
              <Box
                component="button"
                onClick={() => setLang("en")}
                aria-label="English"
                sx={{
                  px: 1.2,
                  py: 0.4,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: lang === "en" ? "var(--brand-gradient)" : "transparent",
                  color: lang === "en" ? "#fff" : "var(--brand-primary)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                🇺🇸 EN
              </Box>
            </Box>

            <ThemeToggle />
          </Box>
        </Box>
      </Box>

      <IconButton
        className={classes.menuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={rippleKey}
            className={classes.ripple}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ width: 0, height: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
          />
        </AnimatePresence>
        {mobileMenuOpen ? (
          <CloseIcon className={classes.menuIcon} />
        ) : (
          <MenuIcon className={classes.menuIcon} />
        )}
      </IconButton>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </Box>
  );
}

