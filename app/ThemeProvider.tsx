"use client";

import { ThemeProvider as MuiThemeProvider, createTheme, type Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useMemo } from "react";
import { THEMES, type ThemeId } from "@/lib/theme/themes";
import { useThemeId } from "@/lib/theme/theme-store";

/**
 * Rebuild the MUI theme for a given mood. Only the palette changes per mood;
 * typography, shape and component overrides are constant. Component overrides
 * that need a brand color read the live `--brand-*` CSS variables (set by the
 * `[data-theme]` blocks in globals.css) so they recolor in lockstep with the
 * palette without recomputing here.
 */
function buildTheme(id: ThemeId): Theme {
  const def = THEMES[id];
  return createTheme({
    typography: {
      fontFamily: "'Outfit', sans-serif",
      h1: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
      h2: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
      h3: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
      h4: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    palette: {
      mode: def.mode,
      primary: def.mui.primary,
      secondary: def.mui.secondary,
      background: def.mui.background,
      text: def.mui.text,
    },
    shape: {
      borderRadius: 24,
    },
    components: {
      MuiCssBaseline: {
        // Own the body surface via the live CSS tokens instead of a frozen
        // palette hex, so the page canvas + text always follow the active mood
        // (CssBaseline's body rule otherwise wins the cascade over globals.css).
        styleOverrides: {
          body: {
            backgroundColor: "var(--bg)",
            color: "var(--text)",
            transition: "background-color 0.4s var(--ease-standard)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            padding: "10px 24px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
          },
          containedPrimary: {
            background: "var(--brand-gradient)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeId = useThemeId();
  const theme = useMemo(() => buildTheme(themeId), [themeId]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
