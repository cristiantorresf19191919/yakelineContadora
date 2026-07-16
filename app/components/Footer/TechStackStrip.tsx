"use client";

import type { CSSProperties } from "react";
import { Box } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siMui,
  siFramer,
  siPwa,
  siFirebase,
  siNetlify,
  siGooglegemini,
} from "simple-icons";
import useStyles from "./TechStackStrip.styles";

// ─── Stack real del sitio ─────────────────────────────────────────────────────
// Colors are the official brand hex from simple-icons, except marks that are
// too dark for the footer's deep-violet background (Next.js black, PWA deep
// purple, Framer navy) — those get a lightened, on-brand substitute.

interface TechIcon {
  name: string;
  path: string;
  color: string;
}

interface TechGroup {
  label: string;
  items: TechIcon[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js", path: siNextdotjs.path, color: "#FFFFFF" },
      { name: "React", path: siReact.path, color: `#${siReact.hex}` },
      { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
    ],
  },
  {
    label: "UI & Experiencia",
    items: [
      { name: "Material UI", path: siMui.path, color: `#${siMui.hex}` },
      { name: "Framer Motion", path: siFramer.path, color: "#4C8DFF" },
      { name: "PWA", path: siPwa.path, color: "#A78BFA" },
    ],
  },
  {
    label: "Nube & IA",
    items: [
      { name: "Firebase", path: siFirebase.path, color: `#${siFirebase.hex}` },
      { name: "Gemini", path: siGooglegemini.path, color: `#${siGooglegemini.hex}` },
      { name: "Netlify", path: siNetlify.path, color: `#${siNetlify.hex}` },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TechStackStrip() {
  const { classes } = useStyles();
  const reduce = useReducedMotion() ?? false;

  return (
    <Box
      component="section"
      aria-label="Tecnologías con las que está construido este sitio"
      className={classes.root}
    >
      {TECH_GROUPS.map((group, groupIndex) => (
        <motion.div
          key={group.label}
          className={classes.group}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: groupIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box component="h3" className={classes.groupLabel}>
            {group.label}
          </Box>
          <Box component="ul" className={classes.iconRow}>
            {group.items.map((tech, techIndex) => (
              <motion.li
                key={tech.name}
                className={classes.item}
                style={{ "--tech-color": tech.color } as CSSProperties}
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: groupIndex * 0.12 + 0.15 + techIndex * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Box component="span" className={`${classes.icon} yc-tech-icon`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d={tech.path} fill="currentColor" />
                  </svg>
                </Box>
                <Box component="span" className={`${classes.itemName} yc-tech-name`}>
                  {tech.name}
                </Box>
              </motion.li>
            ))}
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
