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
      top: "-120px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80%",
      maxWidth: 900,
      height: 240,
      background:
        "radial-gradient(circle at center, rgba(230, 212, 255, 0.38) 0%, rgba(44, 27, 64, 0) 70%)",
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
      background: `linear-gradient(140deg, ${accentViolet} 0%, ${accentVioletStrong} 100%)`,
      color: theme.palette.primary.dark,
      fontWeight: 700,
      fontSize: "1.25rem",
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
      color: "rgba(246, 235, 249, 0.92)",
      textDecoration: "none",
      fontSize: "0.98rem",
      lineHeight: 1.6,
      transition: "color 0.2s ease, transform 0.2s ease",
      "&:hover": {
        color: accentViolet,
        transform: "translateX(4px)",
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
      borderRadius: "12px",
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
      borderRadius: "12px",
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
  };
});

export default useStyles;

