"use client";

import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState, useEffect } from "react";
import useStyles from "./Header.styles";

const navItems = [
  { label: "INICIO", href: "/" },
  { label: "QUIEN SOY", href: "/about" },
  { label: "SERVICIOS CONTABLES", href: "/services" },
  { label: "MENTORÍAS", href: "/mentorship" },
  { label: "LIBRO", href: "/book" },
  { label: "BLOG", href: "/blog" },
];

export default function Header() {
  const { classes } = useStyles();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.headerContainer}>
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

        <IconButton
          className={classes.menuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <CloseIcon className={classes.menuIcon} />
          ) : (
            <MenuIcon className={classes.menuIcon} />
          )}
        </IconButton>
      </Box>

      {mobileMenuOpen && (
        <Box
          component="nav"
          className={`${classes.mobileMenu} ${classes.mobileMenuOpen}`}
          aria-label="Mobile navigation"
        >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href || "#"}
            className={classes.mobileNavLink}
            onClick={handleNavClick}
          >
            {item.label}
          </Link>
        ))}
        </Box>
      )}
    </Box>
  );
}

