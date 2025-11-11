import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "NewsletterSection" })((theme: Theme) => {
  const { breakpoints, spacing, palette } = theme;

  return {
    root: {
      position: "relative",
      padding: spacing(10, 4, 12),
      background: "linear-gradient(135deg, #FFF7F0 0%, #FFFFFF 100%)",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      [breakpoints.down("md")]: {
        padding: spacing(8, 3, 10),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(6, 2, 8),
      },
    },
    content: {
      width: "100%",
      maxWidth: 1024,
      display: "flex",
      alignItems: "center",
      gap: spacing(8),
      borderRadius: "32px",
      padding: spacing(8),
      backgroundColor: "#FFFFFF",
      boxShadow: "0 24px 60px -32px rgba(109, 74, 46, 0.35)",
      position: "relative",
      isolation: "isolate",
      [breakpoints.down("lg")]: {
        gap: spacing(6),
      },
      [breakpoints.down("md")]: {
        flexDirection: "column",
        textAlign: "center",
        padding: spacing(7, 4),
      },
      [breakpoints.down("sm")]: {
        padding: spacing(5, 3),
        borderRadius: "24px",
      },
    },
    accentBlobTop: {
      position: "absolute",
      top: "-120px",
      right: "-120px",
      width: 320,
      height: 320,
      background:
        "radial-gradient(circle at center, rgba(209, 147, 96, 0.18) 0%, rgba(209, 147, 96, 0) 70%)",
      zIndex: 0,
      pointerEvents: "none",
      [breakpoints.down("md")]: {
        right: "-160px",
      },
    },
    accentBlobBottom: {
      position: "absolute",
      bottom: "-160px",
      left: "-120px",
      width: 360,
      height: 360,
      background:
        "radial-gradient(circle at center, rgba(255, 193, 135, 0.2) 0%, rgba(255, 193, 135, 0) 70%)",
      zIndex: 0,
      pointerEvents: "none",
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
      padding: spacing(0.75, 2),
      borderRadius: "999px",
      backgroundColor: "rgba(201, 146, 101, 0.15)",
      color: "#8F6440",
      fontWeight: 600,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      fontSize: "0.75rem",
      [breakpoints.down("md")]: {
        alignSelf: "center",
      },
    },
    heading: {
      fontSize: "2.875rem",
      fontWeight: 700,
      lineHeight: 1.15,
      color: "#5A3C26",
      [breakpoints.down("lg")]: {
        fontSize: "2.5rem",
      },
      [breakpoints.down("md")]: {
        fontSize: "2.25rem",
      },
      [breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    subheading: {
      fontSize: "1.125rem",
      lineHeight: 1.7,
      color: "#7C624E",
      maxWidth: 520,
      [breakpoints.down("md")]: {
        maxWidth: "100%",
      },
    },
    highlights: {
      display: "flex",
      flexWrap: "wrap",
      gap: spacing(1.5),
      [breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    highlightChip: {
      padding: spacing(0.75, 1.75),
      borderRadius: "999px",
      backgroundColor: "#FDF1E6",
      color: "#906548",
      fontWeight: 500,
      fontSize: "0.9375rem",
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
      borderRadius: "24px",
      backgroundColor: "#F8F1EB",
      padding: spacing(3),
      display: "flex",
      flexDirection: "column",
      gap: spacing(2.5),
      boxShadow: "inset 0 0 0 1px rgba(173, 130, 93, 0.12)",
      [breakpoints.down("sm")]: {
        padding: spacing(2.5),
      },
    },
    assurance: {
      display: "flex",
      alignItems: "center",
      gap: spacing(1.5),
      color: "#856347",
      fontSize: "0.9375rem",
      lineHeight: 1.5,
      [breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: spacing(1),
        textAlign: "center",
      },
    },
    lockIcon: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      backgroundColor: "#E4C7AD",
      display: "grid",
      placeItems: "center",
      color: "#6A4B32",
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
      padding: spacing(1.5, 2),
      borderRadius: "999px",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 12px 30px -20px rgba(109, 74, 46, 0.55)",
      border: "1px solid rgba(179, 133, 92, 0.18)",
      transition: "border 0.3s ease, box-shadow 0.3s ease",
      "&:focus-within": {
        border: "1px solid rgba(162, 112, 72, 0.65)",
        boxShadow: "0 20px 36px -20px rgba(134, 92, 59, 0.4)",
      },
      "& input": {
        fontSize: "1rem",
        fontWeight: 500,
        color: "#5A3C26",
        "&::placeholder": {
          color: "#B38A6A",
          opacity: 1,
        },
      },
    },
    submitButton: {
      minWidth: 180,
      borderRadius: "999px",
      backgroundColor: palette.primary.main,
      color: "#FFFFFF",
      fontWeight: 600,
      textTransform: "none",
      fontSize: "1rem",
      padding: spacing(1.5, 3),
      boxShadow: "0 20px 36px -18px rgba(74, 38, 118, 0.45)",
      transition:
        "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        backgroundColor: palette.primary.dark,
        boxShadow: "0 26px 40px -18px rgba(74, 38, 118, 0.5)",
      },
      "&:active": {
        transform: "translateY(0px)",
      },
      [breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    statusMessage: {
      borderRadius: "16px",
      padding: spacing(1.5, 2),
      fontSize: "0.95rem",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: spacing(1),
      "&.success": {
        backgroundColor: "rgba(137, 197, 114, 0.18)",
        color: "#3B6E2A",
        boxShadow: "inset 0 0 0 1px rgba(137, 197, 114, 0.35)",
      },
      "&.error": {
        backgroundColor: "rgba(226, 120, 113, 0.2)",
        color: "#A5372E",
        boxShadow: "inset 0 0 0 1px rgba(226, 120, 113, 0.25)",
      },
    },
  };
});

export default useStyles;

