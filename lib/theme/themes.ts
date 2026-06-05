/**
 * Theme registry — the single source of truth for Yakeline Contadora's
 * multi-mood theming system (inspired by the Biringas "mood wheel").
 *
 * Each mood drives TWO surfaces at once:
 *
 *   1. MUI palette — consumed by `ThemeProvider` which recreates the MUI
 *      theme whenever the active mood changes, so every `theme.palette.*`
 *      component recolors automatically.
 *   2. CSS variables — declared in `app/globals.css` under
 *      `html[data-theme="<id>"]` blocks. Chrome (scrollbar, selection,
 *      header, footer) and the ported components (radial menu, theme wheel,
 *      command palette) read these, so they recolor pre-paint with no flash.
 *
 * The `mui` hex values and the matching `--brand-*` CSS variables in
 * globals.css MUST stay in sync (MUI needs concrete hex for its color math;
 * CSS needs the var for runtime theming). The shared base mood `iris`
 * preserves the original brand exactly (#5D3FD3 + amber), so converting a
 * hardcoded `#5D3FD3` to `var(--brand-primary)` is value-preserving.
 */

export type ThemeId =
  // Light moods
  | "iris"
  | "esmeralda"
  | "zafiro"
  | "oro"
  | "rosa"
  // Dark moods
  | "medianoche"
  | "onix"
  | "bosque";

export type ThemeMode = "light" | "dark";

/** Icon keys mapped to MUI icons inside the ThemeToggle component. */
export type ThemeIconKey =
  | "spa"
  | "savings"
  | "verified"
  | "diamond"
  | "favorite"
  | "nightlight"
  | "darkMode"
  | "forest";

export interface MoodPalette {
  primary: { main: string; light: string; dark: string; contrastText: string };
  secondary: { main: string; light: string; dark: string; contrastText: string };
  background: { default: string; paper: string };
  text: { primary: string; secondary: string };
}

export interface ThemeDefinition {
  id: ThemeId;
  /** Display name (Spanish). */
  name: string;
  /** Short mood descriptor shown under the active name in the hub. */
  tagline: string;
  mode: ThemeMode;
  /** Signature swatch color — the dot's icon hue in the wheel. */
  accent: string;
  /** Representative background so each swatch previews its surface. */
  swatchBg: string;
  /** Glow halo for the trigger when this mood is active. */
  halo: string;
  /** Which MUI icon to show for this mood. */
  icon: ThemeIconKey;
  /** MUI palette fragment used to rebuild the theme. */
  mui: MoodPalette;
}

const WHITE = "#FFFFFF";

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  iris: {
    id: "iris",
    name: "Iris",
    tagline: "Lavanda profesional",
    mode: "light",
    accent: "#5D3FD3",
    swatchBg: "#F4F0FF",
    halo: "rgba(93, 63, 211, 0.30)",
    icon: "spa",
    mui: {
      primary: { main: "#5D3FD3", light: "#A78BFA", dark: "#4C1D95", contrastText: WHITE },
      secondary: { main: "#F59E0B", light: "#FCD34D", dark: "#B45309", contrastText: WHITE },
      background: { default: "#FAFAFA", paper: WHITE },
      text: { primary: "#1F2937", secondary: "#4B5563" },
    },
  },
  esmeralda: {
    id: "esmeralda",
    name: "Esmeralda",
    tagline: "Verde finanzas",
    mode: "light",
    accent: "#0E9F6E",
    swatchBg: "#E9F8F1",
    halo: "rgba(14, 159, 110, 0.30)",
    icon: "savings",
    mui: {
      primary: { main: "#0E9F6E", light: "#34D399", dark: "#065F46", contrastText: WHITE },
      secondary: { main: "#F59E0B", light: "#FCD34D", dark: "#B45309", contrastText: WHITE },
      background: { default: "#F6FBF8", paper: WHITE },
      text: { primary: "#0F2A22", secondary: "#3F5B52" },
    },
  },
  zafiro: {
    id: "zafiro",
    name: "Zafiro",
    tagline: "Azul confianza",
    mode: "light",
    accent: "#2563EB",
    swatchBg: "#EAF1FF",
    halo: "rgba(37, 99, 235, 0.30)",
    icon: "verified",
    mui: {
      primary: { main: "#2563EB", light: "#60A5FA", dark: "#1E40AF", contrastText: WHITE },
      secondary: { main: "#F59E0B", light: "#FCD34D", dark: "#B45309", contrastText: WHITE },
      background: { default: "#F5F8FF", paper: WHITE },
      text: { primary: "#14213D", secondary: "#41506B" },
    },
  },
  oro: {
    id: "oro",
    name: "Oro",
    tagline: "Dorado premium",
    mode: "light",
    accent: "#B7791F",
    swatchBg: "#FBF1DC",
    halo: "rgba(183, 121, 31, 0.32)",
    icon: "diamond",
    mui: {
      primary: { main: "#B7791F", light: "#E0A93C", dark: "#7C5410", contrastText: WHITE },
      secondary: { main: "#5D3FD3", light: "#A78BFA", dark: "#4C1D95", contrastText: WHITE },
      background: { default: "#FBF7EE", paper: WHITE },
      text: { primary: "#2A2014", secondary: "#6B5A3E" },
    },
  },
  rosa: {
    id: "rosa",
    name: "Rosa",
    tagline: "Magenta cálido",
    mode: "light",
    accent: "#DB2777",
    swatchBg: "#FDEAF2",
    halo: "rgba(219, 39, 119, 0.30)",
    icon: "favorite",
    mui: {
      primary: { main: "#DB2777", light: "#F472B6", dark: "#9D174D", contrastText: WHITE },
      secondary: { main: "#7C3AED", light: "#A78BFA", dark: "#5B21B6", contrastText: WHITE },
      background: { default: "#FFF5F9", paper: WHITE },
      text: { primary: "#2E1622", secondary: "#6B4453" },
    },
  },
  medianoche: {
    id: "medianoche",
    name: "Medianoche",
    tagline: "Violeta nocturno",
    mode: "dark",
    accent: "#A78BFA",
    swatchBg: "#14152A",
    halo: "rgba(167, 139, 250, 0.34)",
    icon: "nightlight",
    mui: {
      primary: { main: "#A78BFA", light: "#C4B5FD", dark: "#7C5CE7", contrastText: "#160E2E" },
      secondary: { main: "#FBBF24", light: "#FCD34D", dark: "#D97706", contrastText: "#160E2E" },
      background: { default: "#0F1020", paper: "#1C1E36" },
      text: { primary: "#ECEAF6", secondary: "#A9A7C4" },
    },
  },
  onix: {
    id: "onix",
    name: "Ónix",
    tagline: "Negro con luz",
    mode: "dark",
    accent: "#8B5CF6",
    swatchBg: "#111113",
    halo: "rgba(139, 92, 246, 0.32)",
    icon: "darkMode",
    mui: {
      primary: { main: "#8B5CF6", light: "#A78BFA", dark: "#6D28D9", contrastText: "#0A0A0B" },
      secondary: { main: "#F59E0B", light: "#FCD34D", dark: "#B45309", contrastText: "#0A0A0B" },
      background: { default: "#0A0A0B", paper: "#18181B" },
      text: { primary: "#F4F4F5", secondary: "#A1A1AA" },
    },
  },
  bosque: {
    id: "bosque",
    name: "Bosque",
    tagline: "Esmeralda nocturna",
    mode: "dark",
    accent: "#34D399",
    swatchBg: "#0B1F17",
    halo: "rgba(52, 211, 153, 0.32)",
    icon: "forest",
    mui: {
      primary: { main: "#34D399", light: "#6EE7B7", dark: "#059669", contrastText: "#07140F" },
      secondary: { main: "#FBBF24", light: "#FCD34D", dark: "#D97706", contrastText: "#07140F" },
      background: { default: "#07140F", paper: "#102A1F" },
      text: { primary: "#E6F4EC", secondary: "#9CC0AE" },
    },
  },
};

export const DEFAULT_THEME: ThemeId = "iris";

export const LIGHT_THEMES: ReadonlyArray<ThemeId> = [
  "iris",
  "esmeralda",
  "zafiro",
  "oro",
  "rosa",
];

export const DARK_THEMES: ReadonlyArray<ThemeId> = ["medianoche", "onix", "bosque"];

export const THEME_ORDER: ReadonlyArray<ThemeId> = [...LIGHT_THEMES, ...DARK_THEMES];

export const THEME_COOKIE = "yc:theme";

export const VALID_THEMES: ReadonlySet<string> = new Set<string>(THEME_ORDER);

export function isValidTheme(value: string | undefined | null): value is ThemeId {
  return !!value && VALID_THEMES.has(value);
}

export function getThemeDefinition(id: ThemeId): ThemeDefinition {
  return THEMES[id];
}
