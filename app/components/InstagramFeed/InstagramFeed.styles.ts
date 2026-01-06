import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "InstagramFeed" })((theme: Theme) => {
  const { breakpoints, spacing, palette } = theme;

  return {
    section: {
      padding: spacing(10, 2),
      background: `radial-gradient(circle at 50% 0%, #ffffff 0%, #f0f4f8 100%)`,
      position: "relative",
      overflow: "hidden",
    },
    container: {
      maxWidth: 1600, // Wider for a "wall" effect
      margin: "0 auto",
      width: "100%",
      position: "relative",
      zIndex: 2,
    },
    headerWrapper: {
      textAlign: "center",
      marginBottom: spacing(10),
      position: "relative",
    },
    subTitle: {
      color: palette.primary.main,
      fontWeight: 700,
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginBottom: spacing(2),
      fontSize: "0.85rem",
      display: "inline-block",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 40,
        height: 2,
        background: palette.primary.main,
      },
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: 800,
      color: "#1a1a1a",
      letterSpacing: "-1px",
      marginBottom: spacing(3),
      background: "linear-gradient(45deg, #1a1a1a 0%, #4a4a4a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      [breakpoints.down("md")]: {
        fontSize: "2.5rem",
      },
    },
    // Masonry-like Grid
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: spacing(4),
      padding: spacing(0, 2),
      [breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: spacing(3),
        padding: spacing(0),
      },
    },
    card: {
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "32px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: spacing(2),
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "6px",
        background: "linear-gradient(90deg, #ff0080, #7928ca)", // Instagram-ish gradient but cooler
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      "&:hover": {
        transform: "translateY(-12px) scale(1.02)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        "&::before": {
          opacity: 1,
        },
      },
      // Ensure embed fits nicely
      "& > div": {
        width: "100% !important",
        display: "flex",
        justifyContent: "center",
      }
    },
    // Decorative background elements
    glowBlob: {
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(120px)",
      zIndex: 0,
      opacity: 0.6,
      animation: "$float 20s infinite ease-in-out",
    },
    blob1: {
      top: "-10%",
      right: "-5%",
      width: 600,
      height: 600,
      background: "#ffcbf2",
      animationDelay: "0s",
    },
    blob2: {
      bottom: "-10%",
      left: "-5%",
      width: 700,
      height: 700,
      background: "#e0c3fc",
      animationDelay: "-5s",
    },
    "@keyframes float": {
      "0%, 100%": { transform: "translate(0, 0)" },
      "50%": { transform: "translate(30px, -30px)" },
    },
    
    ctaButton: {
      marginTop: spacing(8),
      display: "inline-flex",
      alignSelf: "center",
      background: "linear-gradient(45deg, #1a1a1a 0%, #4a4a4a 100%)",
      color: "#fff",
      padding: spacing(2, 6),
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      }
    }
  };
});

export default useStyles;
