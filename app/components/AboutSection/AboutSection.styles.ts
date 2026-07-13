import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "AboutSection" })((theme: Theme) => {
  const { breakpoints, spacing } = theme;
  const headingColor = "var(--text)";
  const textMuted = "var(--text-muted)";

  return {
    section: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tint-soft), var(--bg)",
      padding: spacing(12, 7),
      [breakpoints.down("lg")]: {
        padding: spacing(10, 5),
      },
      [breakpoints.down("md")]: {
        padding: spacing(8, 4),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(7, 2.5),
      },
    },
    glowLeft: {
      position: "absolute",
      top: spacing(4),
      left: "-12%",
      width: 420,
      height: 420,
      background:
        "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.15) 0%, rgba(var(--brand-accent-rgb), 0) 70%)",
      filter: "blur(10px)",
      pointerEvents: "none",
    },
    glowRight: {
      position: "absolute",
      bottom: spacing(6),
      right: "-10%",
      width: 480,
      height: 480,
      background:
        "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.15) 0%, rgba(var(--brand-primary-rgb), 0) 75%)",
      filter: "blur(12px)",
      pointerEvents: "none",
    },
    container: {
      position: "relative",
      zIndex: 2,
      maxWidth: 1220,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: spacing(6),
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: spacing(3),
    },
    heading: {
      color: headingColor,
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      maxWidth: 760,
      [breakpoints.down("lg")]: {
        fontSize: "2.75rem",
      },
      [breakpoints.down("md")]: {
        fontSize: "2.3rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "1.95rem",
      },
    },
    description: {
      color: textMuted,
      fontSize: "1.2rem",
      lineHeight: 1.7,
      maxWidth: 720,
      [breakpoints.down("md")]: {
        fontSize: "1.1rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "1.05rem",
        lineHeight: 1.6,
      },
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
      gap: spacing(5),
      alignItems: "stretch",
      [breakpoints.down("lg")]: {
        gap: spacing(4),
      },
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    summaryCard: {
      position: "relative",
      borderRadius: "var(--r-xl)",
      padding: spacing(5),
      background:
        "linear-gradient(150deg, var(--surface) 0%, var(--surface-muted) 100%)",
      boxShadow: "var(--shadow-lg)",
      display: "flex",
      flexDirection: "column",
      gap: spacing(3.5),
      [breakpoints.down("md")]: {
        padding: spacing(4),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(3.5),
        borderRadius: "26px",
      },
    },
    summaryEyebrow: {
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: 1.8,
      fontWeight: 600,
      color: "var(--brand-primary-dark)",
      display: "inline-flex",
      alignItems: "center",
      gap: spacing(1),
      "&::before": {
        content: '""',
        width: 32,
        height: 2,
        borderRadius: 999,
        backgroundColor: "var(--brand-primary)",
        display: "inline-block",
      },
    },
    summaryTitle: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.25,
      color: headingColor,
      [breakpoints.down("md")]: {
        fontSize: "1.8rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "1.65rem",
      },
    },
    summaryBody: {
      fontSize: "1.05rem",
      lineHeight: 1.7,
      color: textMuted,
      maxWidth: 520,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: spacing(2.5),
      [breakpoints.down("sm")]: {
        gap: spacing(2),
      },
    },
    statBlock: {
      borderRadius: "22px",
      padding: spacing(2.75, 2.5),
      backgroundColor: "var(--surface-muted)",
      boxShadow: "var(--shadow-md)",
      display: "flex",
      flexDirection: "column",
      gap: spacing(0.75),
      [breakpoints.down("sm")]: {
        alignItems: "center",
        textAlign: "center",
      },
    },
    statValue: {
      fontSize: "2.9rem",
      fontWeight: 700,
      color: headingColor,
      letterSpacing: "-0.02em",
      [breakpoints.down("lg")]: {
        fontSize: "2.6rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "2.3rem",
      },
    },
    statLabel: {
      fontSize: "0.95rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--brand-primary-dark)",
    },
    gallery: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.7fr)",
      gap: spacing(2.5),
      alignItems: "stretch",
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    mainPhoto: {
      position: "relative",
      borderRadius: "36px",
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      minHeight: 480,
      backgroundColor: "rgba(var(--surface-rgb), 0.35)",
      [breakpoints.down("lg")]: {
        minHeight: 440,
      },
      [breakpoints.down("md")]: {
        minHeight: 420,
      },
      [breakpoints.down("sm")]: {
        minHeight: 360,
      },
    },
    secondaryColumn: {
      display: "flex",
      flexDirection: "column",
      gap: spacing(2.5),
      [breakpoints.down("md")]: {
        flexDirection: "row",
      },
      [breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: spacing(2),
      },
    },
    secondaryPhoto: {
      position: "relative",
      flex: 1,
      borderRadius: "28px",
      overflow: "hidden",
      minHeight: 220,
      boxShadow: "var(--shadow-md)",
      backgroundColor: "rgba(var(--surface-rgb), 0.35)",
      [breakpoints.down("sm")]: {
        minHeight: 240,
      },
    },
    photoImage: {
      objectFit: "cover",
      transform: "scale(1.015)",
    },
    photoCaption: {
      position: "absolute",
      bottom: spacing(2),
      left: spacing(2),
      padding: spacing(0.75, 1.75),
      borderRadius: "var(--r-pill)",
      backgroundColor: "rgba(var(--surface-rgb), 0.82)",
      color: headingColor,
      fontWeight: 600,
      fontSize: "0.85rem",
      letterSpacing: 0.6,
      boxShadow: "var(--shadow-md)",
    },
  };
});

export default useStyles;

