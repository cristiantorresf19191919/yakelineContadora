import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "FinancialGrowth" })((theme: Theme) => {
  const { breakpoints, palette, spacing } = theme;

  return {
    section: {
      position: "relative",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: spacing(4),
      // Use a dark, elegant background or a blurry video background placeholder
      backgroundColor: "#1a0f1f", 
      color: "#fff",
      overflow: "hidden",
      [breakpoints.down("md")]: {
        minHeight: "60vh",
      }
    },
    backgroundOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at center, ${palette.primary.main}40 0%, #000000 90%)`,
        opacity: 0.8,
        zIndex: 1
    },
    content: {
      position: "relative",
      zIndex: 2,
      maxWidth: 900,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing(4)
    },
    question: {
      fontSize: "4rem",
      fontWeight: 800,
      lineHeight: 1.1,
      fontFamily: "'Playfair Display', serif", // Assuming a serif font for elegance if available, or fallback
      letterSpacing: "-0.02em",
      background: `linear-gradient(90deg, #fff 0%, ${palette.secondary.light} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      [breakpoints.down("lg")]: {
        fontSize: "3rem",
      },
      [breakpoints.down("md")]: {
        fontSize: "2.5rem",
      },
      [breakpoints.down("sm")]: {
          fontSize: "2rem"
      }
    },
    yakelineSignature: {
        fontFamily: "'Dancing Script', cursive", // Suggesting a script font
        fontSize: "2rem",
        color: palette.secondary.main,
        marginBottom: spacing(2)
    },
    ctaButton: {
        marginTop: spacing(4),
        padding: spacing(2, 6),
        fontSize: "1.25rem",
        borderRadius: 50,
        background: palette.secondary.main,
        color: "#000",
        fontWeight: 700,
        boxShadow: `0 0 20px ${palette.secondary.main}60`,
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "scale(1.05)",
            background: palette.secondary.light,
            boxShadow: `0 0 30px ${palette.secondary.main}80`,
        }
    }
  };
});

export default useStyles;
