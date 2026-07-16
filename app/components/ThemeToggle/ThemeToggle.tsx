"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal, flushSync } from "react-dom";
import type { SvgIconComponent } from "@mui/icons-material";
import SpaIcon from "@mui/icons-material/Spa";
import SavingsIcon from "@mui/icons-material/Savings";
import VerifiedIcon from "@mui/icons-material/Verified";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ForestIcon from "@mui/icons-material/Forest";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import {
  DARK_THEMES,
  LIGHT_THEMES,
  THEME_ORDER,
  THEMES,
  type ThemeIconKey,
  type ThemeId,
} from "@/lib/theme/themes";
import {
  applyTheme,
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme/theme-store";
import styles from "./ThemeToggle.module.css";

const ICONS: Record<ThemeIconKey, SvgIconComponent> = {
  spa: SpaIcon,
  savings: SavingsIcon,
  verified: VerifiedIcon,
  diamond: DiamondIcon,
  favorite: FavoriteIcon,
  nightlight: BedtimeIcon,
  darkMode: DarkModeIcon,
  forest: ForestIcon,
  sparkle: AutoAwesomeIcon,
};

const SPRING = { type: "spring", stiffness: 320, damping: 26, mass: 0.6 } as const;

/* Wheel geometry — two concentric rings (light moods outside, dark inside). */
const WHEEL = 280;
const CENTER = WHEEL / 2;
const RING_LIGHT = 112;
const RING_DARK = 60;
const DOT = 40;

interface Placed {
  id: ThemeId;
  x: number;
  y: number;
}

function placeRing(ids: ReadonlyArray<ThemeId>, radius: number): Placed[] {
  const n = ids.length;
  return ids.map((id, i) => {
    const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
    return {
      id,
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  });
}

const PLACED: Placed[] = [
  ...placeRing(LIGHT_THEMES, RING_LIGHT),
  ...placeRing(DARK_THEMES, RING_DARK),
];

type StartViewTransition = (cb: () => void) => { ready: Promise<void> };

/**
 * Recolor the whole site with a circular wipe growing from the picked swatch —
 * the "radial" reveal. Uses the View Transitions API: snapshot the old frame,
 * flush the theme swap synchronously, then animate a `circle()` clip outward
 * from (x, y). Browsers without the API (or reduced-motion users) get an
 * instant, clean swap.
 */
function applyThemeWithReveal(
  next: ThemeId,
  x: number,
  y: number,
  reduce: boolean,
  commit: () => void,
) {
  const startVT = (document as unknown as { startViewTransition?: StartViewTransition })
    .startViewTransition;
  if (reduce || typeof startVT !== "function") {
    commit();
    return;
  }
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  const vt = startVT.call(document, () => {
    flushSync(commit);
  });
  vt.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 560,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      /* transition interrupted — theme already applied */
    });
}

const NOOP_SUBSCRIBE = () => () => {};

interface ThemeToggleProps {
  /** ARIA label override for the trigger. */
  label?: string;
}

/**
 * Header-mounted radial "mood wheel". The trigger shows the active mood's icon
 * + halo. Opening it lifts a glassy dialog with every mood on two rings (light
 * outside, dark inside) that fan out with a staggered spring. Picking a swatch
 * fires a circular View-Transition wipe that recolors the whole site outward
 * from the swatch.
 */
export function ThemeToggle({ label = "Cambiar tema" }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<ThemeId | null>(null);
  const mounted = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    () => true,
    () => false,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const dialogId = useId();

  const active = THEMES[theme];
  const hubId = preview ?? theme;
  const hub = THEMES[hubId];
  const HubIcon = ICONS[hub.icon];
  const TriggerIcon = ICONS[active.icon];

  // Focus the active swatch when the wheel opens.
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const items = dialogRef.current.querySelectorAll<HTMLButtonElement>(
      '[role="menuitemradio"]',
    );
    const idx = THEME_ORDER.indexOf(theme);
    (items[idx] ?? items[0])?.focus({ preventScroll: true });
  }, [open, theme]);

  // Outside-click + Escape + arrow navigation.
  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (dialogRef.current?.contains(target) || triggerRef.current?.contains(target))
        return;
      setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
        return;
      }
      if (!dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'),
      );
      const idx = items.indexOf(document.activeElement as HTMLButtonElement);
      if (idx < 0) return;
      let nextIdx = idx;
      if (event.key === "ArrowRight" || event.key === "ArrowDown")
        nextIdx = (idx + 1) % items.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
        nextIdx = (idx - 1 + items.length) % items.length;
      else if (event.key === "Home") nextIdx = 0;
      else if (event.key === "End") nextIdx = items.length - 1;
      else return;
      event.preventDefault();
      items[nextIdx]?.focus({ preventScroll: true });
      setPreview(THEME_ORDER[nextIdx] ?? null);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function pick(next: ThemeId, el: HTMLElement | null) {
    const rect = el?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    applyThemeWithReveal(next, x, y, !!reduceMotion, () => {
      applyTheme(next);
      setOpen(false);
    });
    setPreview(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={`${label}: ${active.name}`}
        title={`${label}: ${active.name}`}
        className={styles.trigger}
      >
        <span
          className={styles.triggerHalo}
          aria-hidden
          style={{
            background: `radial-gradient(closest-side, ${active.halo}, transparent 78%)`,
          }}
        />
        <motion.span
          key={theme}
          className={styles.triggerIcon}
          initial={reduceMotion ? false : { scale: 0.4, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={reduceMotion ? { duration: 0 } : SPRING}
          style={{ color: active.accent }}
        >
          <TriggerIcon />
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="theme-wheel"
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.backdrop} aria-hidden onClick={() => setOpen(false)} />

                <motion.div
                  ref={dialogRef}
                  id={dialogId}
                  role="menu"
                  aria-label="Seleccionar tema"
                  className={styles.dialog}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={reduceMotion ? { duration: 0.14 } : SPRING}
                >
                  <span className={styles.eyebrow}>Elige tu ambiente</span>

                  <div
                    className={styles.wheel}
                    style={{ width: WHEEL, height: WHEEL }}
                    onMouseLeave={() => setPreview(null)}
                  >
                    <span
                      className={styles.ring}
                      aria-hidden
                      style={{
                        width: RING_LIGHT * 2,
                        height: RING_LIGHT * 2,
                        left: CENTER - RING_LIGHT,
                        top: CENTER - RING_LIGHT,
                      }}
                    />
                    <span
                      className={styles.ringDashed}
                      aria-hidden
                      style={{
                        width: RING_DARK * 2,
                        height: RING_DARK * 2,
                        left: CENTER - RING_DARK,
                        top: CENTER - RING_DARK,
                      }}
                    />

                    <motion.div
                      className={styles.hub}
                      style={{ width: 104, height: 104, left: CENTER - 52, top: CENTER - 52 }}
                      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={reduceMotion ? { duration: 0 } : { ...SPRING, delay: 0.05 }}
                    >
                      <span
                        className={styles.hubGlow}
                        aria-hidden
                        style={{
                          background: `radial-gradient(closest-side, ${hub.accent}33, transparent 80%)`,
                        }}
                      />
                      <span
                        className={styles.hubSwatch}
                        aria-hidden
                        style={{ background: hub.swatchBg, color: hub.accent }}
                      >
                        <HubIcon />
                      </span>
                      <span className={styles.hubName}>{hub.name}</span>
                      <span className={styles.hubTagline}>{hub.tagline}</span>
                    </motion.div>

                    {PLACED.map(({ id, x, y }, i) => {
                      const def = THEMES[id];
                      const Icon = ICONS[def.icon];
                      const isActive = theme === id;
                      const dx = x - CENTER;
                      const dy = y - CENTER;
                      return (
                        <motion.button
                          key={id}
                          type="button"
                          role="menuitemradio"
                          aria-checked={isActive}
                          aria-label={`${def.name} — ${def.tagline}`}
                          title={def.name}
                          className={styles.dot}
                          onClick={(e) => pick(id, e.currentTarget)}
                          onMouseEnter={() => setPreview(id)}
                          onFocus={() => setPreview(id)}
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, scale: 0, x: -dx * 0.65, y: -dy * 0.65 }
                          }
                          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                          transition={
                            reduceMotion ? { duration: 0 } : { ...SPRING, delay: 0.06 + i * 0.03 }
                          }
                          whileHover={reduceMotion ? undefined : { scale: 1.18 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                          style={{
                            width: DOT,
                            height: DOT,
                            left: x - DOT / 2,
                            top: y - DOT / 2,
                            background: def.swatchBg,
                            color: def.accent,
                            boxShadow: isActive
                              ? `0 0 0 2px ${def.accent}, 0 6px 16px -6px ${def.accent}`
                              : `inset 0 0 0 1px var(--border)`,
                          }}
                        >
                          <Icon />
                        </motion.button>
                      );
                    })}
                  </div>

                  <p className={styles.legend}>
                    Anillo exterior: tonos claros · anillo interior: tonos oscuros.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </span>
  );
}

export default ThemeToggle;
