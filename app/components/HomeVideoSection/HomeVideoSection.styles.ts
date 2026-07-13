import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "HomeVideoSection" })((theme: Theme) => {
  const { breakpoints, spacing } = theme;

  return {
    section: {
      padding: spacing(8, 2),
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      [breakpoints.down("md")]: {
        padding: spacing(6, 2),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(5, 1.5),
      },
    },
    container: {
      maxWidth: 1400,
      margin: "0 auto",
      width: "100%",
      position: "relative",
      zIndex: 2,
    },
    headerWrapper: {
      textAlign: "center",
      marginBottom: spacing(6),
      [breakpoints.down("md")]: {
        marginBottom: spacing(5),
      },
      [breakpoints.down("sm")]: {
        marginBottom: spacing(4),
      },
    },
    subTitle: {
      color: "var(--brand-primary)",
      fontWeight: 700,
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginBottom: spacing(2),
      fontSize: "0.85rem",
      display: "inline-block",
      position: "relative",
      [breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        letterSpacing: "2px",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 40,
        height: 2,
        background: "var(--brand-primary)",
      },
    },
    title: {
      fontSize: "3rem",
      fontWeight: 800,
      color: "var(--text)",
      letterSpacing: "-1px",
      marginBottom: spacing(2),
      [breakpoints.down("lg")]: {
        fontSize: "2.5rem",
      },
      [breakpoints.down("md")]: {
        fontSize: "2rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "1.75rem",
        marginBottom: spacing(1.5),
      },
    },
    description: {
      fontSize: "1.1rem",
      color: "var(--text-muted)",
      maxWidth: 650,
      margin: "0 auto",
      lineHeight: 1.7,
      [breakpoints.down("md")]: {
        fontSize: "1rem",
        maxWidth: "90%",
      },
      [breakpoints.down("sm")]: {
        fontSize: "0.95rem",
        maxWidth: "100%",
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: spacing(3),
      padding: spacing(0, 2),
      [breakpoints.down("lg")]: {
        gap: spacing(2.5),
        padding: spacing(0, 1.5),
      },
      [breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: spacing(2),
        padding: spacing(0, 1),
      },
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: spacing(2),
        padding: spacing(0),
      },
    },
    card: {
      background: "rgba(var(--surface-rgb), 0.98)",
      backdropFilter: "blur(20px)",
      borderRadius: "var(--r-lg)",
      overflow: "visible",
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
        zIndex: 2,
        borderRadius: "var(--r-lg) var(--r-lg) 0 0",
      },
      "&:hover": {
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--border)",
      },
      [breakpoints.down("sm")]: {
        borderRadius: "20px",
        "&::before": {
          borderRadius: "20px 20px 0 0",
        },
        "&:hover": {
          transform: "translateY(-4px) scale(1.01)",
        },
      },
    },
    videoWrapper: {
      width: "100%",
      padding: spacing(2),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      [breakpoints.down("sm")]: {
        padding: spacing(1.5),
      },
    },
    embedContainer: {
      width: "100%",
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      background: "#000",
      "& > div": {
        width: "100% !important",
        display: "flex",
        justifyContent: "center",
        borderRadius: "20px",
        overflow: "hidden",
        "& iframe": {
          borderRadius: "20px !important",
          border: "none !important",
          boxShadow: "none !important",
          background: "transparent !important",
          filter: "brightness(1.02) contrast(1.02)",
        },
      },
      // Subtle inner glow effect
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "20px",
        pointerEvents: "none",
        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.05)",
        zIndex: 1,
      },
      // Outer subtle border glow
      "&::after": {
        content: '""',
        position: "absolute",
        top: "-2px",
        left: "-2px",
        right: "-2px",
        bottom: "-2px",
        borderRadius: "22px",
        background: "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.08), rgba(var(--brand-accent-rgb), 0.08))",
        zIndex: -1,
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      "&:hover::after": {
        opacity: 1,
      },
    },
    ctaWrapper: {
      display: "flex",
      justifyContent: "center",
      marginTop: spacing(6),
      [breakpoints.down("md")]: {
        marginTop: spacing(5),
      },
      [breakpoints.down("sm")]: {
        marginTop: spacing(4),
      },
    },
    ctaButton: {
      background: "linear-gradient(45deg, #1a1a1a 0%, #4a4a4a 100%)",
      color: "#fff",
      padding: spacing(1.5, 5),
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "linear-gradient(45deg, #2a2a2a 0%, #5a5a5a 100%)",
        transform: "translateY(-3px)",
        boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
      },
      [breakpoints.down("md")]: {
        padding: spacing(1.25, 4),
        fontSize: "1rem",
      },
      [breakpoints.down("sm")]: {
        padding: spacing(1, 3.5),
        fontSize: "0.95rem",
      },
    },
  };
});

export default useStyles;
