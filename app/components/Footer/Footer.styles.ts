import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Footer" })((theme: Theme) => {
  const { spacing, breakpoints } = theme;
  const deepViolet = "#2C1B40";
  const midViolet = "#3A2553";
  const softViolet = "rgba(245, 237, 255, 0.9)";
  const accentViolet = "#E6D4F9";
  const accentVioletStrong = "#C6A8E6";

  return {
    root: {
      backgroundColor: deepViolet,
      background: `linear-gradient(180deg, ${deepViolet} 0%, ${midViolet} 50%, ${deepViolet} 100%)`,
      color: softViolet,
      padding: spacing(10, 4, 6),
      position: "relative",
      overflow: "hidden",
      [breakpoints.down("md")]: {
        padding: spacing(8, 3, 5),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(7, 2, 4),
      },
    },
    topGlow: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "40%",
      background:
        "radial-gradient(ellipse at center top, rgba(var(--brand-primary-rgb), 0.18) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    container: {
      maxWidth: 1200,
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      columnGap: spacing(6),
      rowGap: spacing(6),
      [breakpoints.down("lg")]: {
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      },
      [breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    brandSection: {
      display: "flex",
      flexDirection: "column",
      gap: spacing(3),
    },
    brandName: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: 0.8,
      display: "flex",
      alignItems: "center",
      gap: spacing(1.5),
      color: "#FFFFFF",
    },
    brandBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 42,
      height: 42,
      borderRadius: "50%",
      background: "var(--brand-gradient)",
      color: "#FFFFFF",
      fontWeight: 700,
      fontSize: "1.25rem",
      boxShadow: "0 8px 22px -8px var(--shadow-glow)",
    },
    brandCopy: {
      color: "rgba(243, 229, 244, 0.85)",
      lineHeight: 1.7,
      maxWidth: 420,
    },
    sectionTitle: {
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontSize: "0.9rem",
      color: "rgba(243, 229, 244, 0.7)",
    },
    linkList: {
      display: "flex",
      flexDirection: "column",
      gap: spacing(2),
      marginTop: spacing(2),
    },
    footerLink: {
      position: "relative",
      alignSelf: "flex-start",
      color: "rgba(246, 235, 249, 0.92)",
      textDecoration: "none",
      fontSize: "0.98rem",
      lineHeight: 1.6,
      transition: "color 0.2s ease",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: -2,
        width: "100%",
        height: "1.5px",
        borderRadius: "1px",
        background: accentVioletStrong,
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      "&:hover": {
        color: accentViolet,
      },
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover::after": {
          transform: "scaleX(1)",
        },
      },
    },
    contactItem: {
      display: "flex",
      gap: spacing(2),
      alignItems: "flex-start",
      color: "rgba(246, 235, 249, 0.92)",
      fontSize: "0.98rem",
      lineHeight: 1.6,
    },
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: "var(--r-sm)",
      backgroundColor: "rgba(229, 196, 223, 0.18)",
      display: "grid",
      placeItems: "center",
      color: accentVioletStrong,
    },
    socialRow: {
      display: "flex",
      gap: spacing(1.5),
      marginTop: spacing(2),
    },
    socialButton: {
      width: 44,
      height: 44,
      borderRadius: "var(--r-sm)",
      display: "grid",
      placeItems: "center",
      backgroundColor: "rgba(229, 196, 223, 0.18)",
      color: accentViolet,
      transition: "transform 0.2s ease, background-color 0.2s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        backgroundColor: "rgba(229, 196, 223, 0.35)",
      },
    },
    bottomBar: {
      marginTop: spacing(6),
      paddingTop: spacing(4),
      borderTop: "1px solid rgba(246, 235, 249, 0.18)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: spacing(2),
      color: "rgba(243, 229, 244, 0.75)",
      fontSize: "0.9rem",
      [breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    legalLinks: {
      display: "flex",
      gap: spacing(3),
      flexWrap: "wrap",
      a: {
        color: "rgba(243, 229, 244, 0.75)",
        textDecoration: "none",
        "&:hover": {
          color: accentViolet,
        },
      },
    },
    devBar: {
      maxWidth: 1200,
      margin: "0 auto",
      marginTop: spacing(3),
      paddingTop: spacing(3),
      borderTop: "1px solid rgba(246, 235, 249, 0.1)",
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: spacing(1.5),
    },
    devText: {
      fontSize: "0.82rem",
      letterSpacing: 0.3,
      color: "rgba(243, 229, 244, 0.55)",
    },
    devName: {
      position: "relative",
      color: accentViolet,
      fontWeight: 600,
      textDecoration: "none",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: -2,
        width: "100%",
        height: "1.5px",
        borderRadius: "1px",
        background: accentVioletStrong,
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover::after": { transform: "scaleX(1)" },
      },
    },
    devLinksRow: {
      display: "flex",
      gap: spacing(0.5),
    },
    devIcon: {
      width: 34,
      height: 34,
      color: "rgba(243, 229, 244, 0.55)",
      transition: "color 0.2s ease, transform 0.2s ease",
      "&:hover": {
        color: accentViolet,
        transform: "translateY(-2px)",
      },
    },
  };
});

export default useStyles;

