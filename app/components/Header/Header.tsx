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

const navItems = [
  { label: "INICIO", href: "/" },
  { label: "QUIEN SOY", href: "/about" },
  { label: "SERVICIOS CONTABLES", href: "/services" },
  { label: "MENTORÍAS", href: "/mentorship" },
  { label: "LIBRO", href: "/book" },
  { label: "BLOG", href: "/blog" },
  { label: "VIDEO BLOG", href: "/videos" },
];

export default function Header() {
  const { classes } = useStyles();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

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
              key={item.label}
              href={item.href || "#"}
              className={classes.navLink}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
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

