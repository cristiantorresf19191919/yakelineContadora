"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#6A3FA0",
      light: "#8F69C0",
      dark: "#4B2676",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F4D7B1",
      light: "#FFE9CD",
      dark: "#C9AA84",
      contrastText: "#3F2E1F",
    },
    background: {
      default: "#FFFBF6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3F2E1F",
      secondary: "#6B5B4A",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

