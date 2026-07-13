import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "NewsletterSection" })((theme: Theme) => {
  const { breakpoints, spacing } = theme;

  return {
    root: {
      position: "relative",
      padding: spacing(12, 4, 14),
      background: "var(--tint-soft), var(--bg)",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      [breakpoints.down("md")]: {
        padding: spacing(10, 3, 12),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(8, 2, 10),
      },
    },
    content: {
      width: "100%",
      maxWidth: 1200,
      display: "flex",
      alignItems: "center",
      gap: spacing(10),
      borderRadius: "40px",
      padding: spacing(10, 8),
      background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-muted) 100%)",
      boxShadow: "var(--shadow-lg)",
      position: "relative",
      isolation: "isolate",
      border: "1px solid var(--border)",
      [breakpoints.down("lg")]: {
        gap: spacing(8),
        padding: spacing(8, 6),
      },
      [breakpoints.down("md")]: {
        flexDirection: "column",
        textAlign: "center",
        padding: spacing(8, 5),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(6, 4),
        borderRadius: "var(--r-xl)",
      },
    },
    accentBlobTop: {
      position: "absolute",
      top: "-150px",
      right: "-150px",
      width: 400,
      height: 400,
      background:
        "radial-gradient(circle at center, rgba(var(--brand-primary-rgb), 0.12) 0%, rgba(var(--brand-primary-rgb), 0.06) 50%, transparent 80%)",
      zIndex: 0,
      pointerEvents: "none",
      filter: "blur(40px)",
      [breakpoints.down("md")]: {
        right: "-200px",
        width: 350,
        height: 350,
      },
    },
    accentBlobBottom: {
      position: "absolute",
      bottom: "-180px",
      left: "-150px",
      width: 450,
      height: 450,
      background:
        "radial-gradient(circle at center, rgba(var(--brand-primary-light-rgb), 0.15) 0%, rgba(var(--brand-primary-rgb), 0.08) 50%, transparent 80%)",
      zIndex: 0,
      pointerEvents: "none",
      filter: "blur(50px)",
      [breakpoints.down("md")]: {
        left: "-200px",
        width: 400,
        height: 400,
      },
    },
    copy: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: spacing(2.5),
      zIndex: 1,
    },
    badge: {
      alignSelf: "flex-start",
      padding: spacing(0.875, 2.5),
      borderRadius: "var(--r-pill)",
      background: "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.15) 0%, rgba(var(--brand-primary-rgb), 0.1) 100%)",
      color: "var(--brand-primary)",
      fontWeight: 700,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      fontSize: "0.75rem",
      border: "1px solid rgba(var(--brand-primary-rgb), 0.2)",
      boxShadow: "0 4px 12px rgba(var(--brand-primary-rgb), 0.1)",
      [breakpoints.down("md")]: {
        alignSelf: "center",
      },
    },
    heading: {
      fontSize: "3.25rem",
      fontWeight: 800,
      lineHeight: 1.1,
      background: "linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 50%, var(--brand-primary-strong) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.02em",
      [breakpoints.down("lg")]: {
        fontSize: "2.75rem",
      },
      [breakpoints.down("md")]: {
        fontSize: "2.5rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    subheading: {
      fontSize: "1.25rem",
      lineHeight: 1.7,
      color: "var(--brand-primary-dark)",
      maxWidth: 540,
      fontWeight: 400,
      [breakpoints.down("md")]: {
        maxWidth: "100%",
        fontSize: "1.125rem",
      },
    },
    highlights: {
      display: "flex",
      flexWrap: "wrap",
      gap: spacing(1.5),
      marginTop: spacing(1),
      [breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    highlightChip: {
      padding: spacing(0.875, 2),
      borderRadius: "var(--r-pill)",
      background: "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.1) 0%, rgba(var(--brand-primary-rgb), 0.08) 100%)",
      color: "var(--brand-primary-dark)",
      fontWeight: 600,
      fontSize: "0.9375rem",
      border: "1px solid rgba(var(--brand-primary-rgb), 0.15)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        transform: "translateY(-2px)",
        background: "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.15) 0%, rgba(var(--brand-primary-rgb), 0.12) 100%)",
        boxShadow: "0 4px 12px rgba(var(--brand-primary-rgb), 0.2)",
      },
    },
    formWrapper: {
      flex: 1,
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      gap: spacing(2.5),
      [breakpoints.down("md")]: {
        width: "100%",
      },
    },
    formCard: {
      borderRadius: "28px",
      background: "linear-gradient(135deg, rgba(var(--surface-rgb), 0.8) 0%, rgba(var(--surface-rgb), 0.95) 100%)",
      padding: spacing(4, 3.5),
      display: "flex",
      flexDirection: "column",
      gap: spacing(3),
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      [breakpoints.down("sm")]: {
        padding: spacing(3, 2.5),
        borderRadius: "var(--r-lg)",
      },
    },
    assurance: {
      display: "flex",
      alignItems: "center",
      gap: spacing(1.5),
      color: "var(--brand-primary-dark)",
      fontSize: "0.9375rem",
      lineHeight: 1.6,
      fontWeight: 400,
      [breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: spacing(1),
        textAlign: "center",
      },
    },
    lockIcon: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.15) 0%, rgba(var(--brand-primary-rgb), 0.1) 100%)",
      display: "grid",
      placeItems: "center",
      color: "var(--brand-primary)",
      border: "1px solid rgba(var(--brand-primary-rgb), 0.2)",
    },
    form: {
      display: "flex",
      gap: spacing(1.5),
      [breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    textFieldRoot: {
      flex: 1,
      padding: spacing(1.75, 2.5),
      borderRadius: "var(--r-pill)",
      backgroundColor: "var(--surface)",
      boxShadow: "var(--shadow-sm)",
      border: "2px solid rgba(var(--brand-primary-rgb), 0.2)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:focus-within": {
        border: "2px solid var(--brand-primary-light)",
        boxShadow:
          "0 12px 32px -12px rgba(var(--brand-primary-rgb), 0.4), 0 0 0 4px rgba(var(--brand-primary-rgb), 0.1)",
        transform: "translateY(-1px)",
      },
      "& input": {
        fontSize: "1.0625rem",
        fontWeight: 500,
        color: "var(--brand-primary-dark)",
        "&::placeholder": {
          color: "var(--brand-primary-light)",
          opacity: 0.7,
        },
      },
    },
    submitButton: {
      minWidth: 200,
      borderRadius: "var(--r-pill)",
      background: "linear-gradient(135deg, var(--brand-primary-light) 0%, var(--brand-primary-strong) 50%, var(--brand-primary-dark) 100%)",
      color: "#FFFFFF",
      fontWeight: 700,
      textTransform: "none",
      fontSize: "1.0625rem",
      padding: spacing(1.75, 4),
      boxShadow:
        "0 12px 32px -12px rgba(var(--brand-primary-rgb), 0.5), 0 4px 16px -8px rgba(var(--brand-primary-rgb), 0.4)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        transition: "left 0.5s ease",
      },
      "&:hover": {
        transform: "translateY(-3px) scale(1.02)",
        background: "linear-gradient(135deg, var(--brand-primary-light) 0%, var(--brand-primary-strong) 50%, var(--brand-primary) 100%)",
        boxShadow:
          "0 16px 40px -12px rgba(var(--brand-primary-rgb), 0.6), 0 6px 20px -8px rgba(var(--brand-primary-rgb), 0.5)",
        "&::before": {
          left: "100%",
        },
      },
      "&:active": {
        transform: "translateY(-1px) scale(1)",
      },
      "&:disabled": {
        background: "rgba(var(--brand-primary-rgb), 0.4)",
        boxShadow: "none",
        transform: "none",
      },
      [breakpoints.down("sm")]: {
        width: "100%",
        minWidth: "unset",
      },
    },
    statusMessage: {
      borderRadius: "var(--r-md)",
      padding: spacing(1.75, 2.5),
      fontSize: "0.9375rem",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: spacing(1.5),
      animation: "slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      "&.success": {
        background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%)",
        color: "#16A34A",
        boxShadow: "0 4px 12px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
      },
      "&.error": {
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)",
        color: "#DC2626",
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
      },
      "@keyframes slideInUp": {
        from: {
          opacity: 0,
          transform: "translateY(10px)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
  };
});

export default useStyles;

