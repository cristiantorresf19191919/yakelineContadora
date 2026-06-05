"use client";

/**
 * Tiny external store for the active theme mood — shared by `ThemeProvider`
 * (which rebuilds the MUI palette) and `ThemeToggle` (the radial picker), so
 * both stay in lockstep without prop drilling or a context provider.
 *
 * Source of truth at runtime is the `data-theme` attribute on <html> (the
 * same thing the CSS `[data-theme]` blocks key off). Reads are cheap: the
 * client reads the DOM attribute, the server falls back to the default mood.
 */

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, isValidTheme, THEME_COOKIE, type ThemeId } from "./themes";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const listeners = new Set<() => void>();

export function subscribeTheme(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getThemeSnapshot(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return isValidTheme(attr) ? attr : DEFAULT_THEME;
}

export function getThemeServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

/** Apply a mood to <html>, persist it, and notify subscribers. */
export function applyTheme(next: ThemeId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_COOKIE, next);
  } catch {
    /* storage blocked — non-fatal */
  }
  try {
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
  } catch {
    /* cookie blocked — non-fatal */
  }
  for (const callback of listeners) callback();
}

/** Subscribe a component to the active mood. */
export function useThemeId(): ThemeId {
  return useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
}
