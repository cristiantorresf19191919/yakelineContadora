"use client";

import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import useStyles from "./Header.styles";

const navItems = [
  { label: "INICIO", href: "#" },
  { label: "QUIEN SOY", href: "#" },
  { label: "SERVICIOS CONTABLES", href: "#" },
  { label: "MENTORÍAS", href: "#" },
  { label: "LIBRO", href: "#" },
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
            <a
              key={item.label}
              href={item.href}
              className={classes.navLink}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
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
          <a
            key={item.label}
            href={item.href}
            className={classes.mobileNavLink}
            onClick={handleNavClick}
          >
            {item.label}
          </a>
        ))}
        </Box>
      )}
    </Box>
  );
}

