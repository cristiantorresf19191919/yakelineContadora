import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "ServicesHighlights" })(
  (theme: Theme) => {
    const { breakpoints, palette, spacing, shape } = theme;

    return {
      section: {
        position: "relative",
        overflow: "hidden",
        padding: spacing(12, 4),
        background: `linear-gradient(180deg, ${palette.background.default} 0%, #FFFFFF 100%)`,
        [breakpoints.down("lg")]: {
          padding: spacing(10, 3),
        },
        [breakpoints.down("md")]: {
          padding: spacing(8, 2.5),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(6, 2),
        },
      },
      halo: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 720,
        height: 720,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${palette.primary.light}20 0%, rgba(255,255,255,0) 65%)`,
        filter: "blur(40px)",
        opacity: 0.6,
        pointerEvents: "none",
        [breakpoints.down("lg")]: {
          width: 620,
          height: 620,
        },
        [breakpoints.down("md")]: {
          width: 520,
          height: 520,
        },
        [breakpoints.down("sm")]: {
          width: 360,
          height: 360,
        },
      },
      container: {
        position: "relative",
        zIndex: 1,
        maxWidth: 1140,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing(6),
        textAlign: "center",
      },
      heading: {
        maxWidth: 780,
        fontSize: "2.75rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: palette.text.primary,
        letterSpacing: "-0.02em",
        [breakpoints.down("lg")]: {
          fontSize: "2.5rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2.125rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.875rem",
        },
      },
      cardsWrapper: {
        width: "100%",
        position: "relative",
        padding: spacing(4),
        borderRadius: 42,
        background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, ${palette.background.paper} 100%)`,
        boxShadow: `0 40px 80px ${palette.primary.light}15`, // soft purple shadow
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: spacing(3),
          borderRadius: 36,
          background: `linear-gradient(90deg, ${palette.primary.light}10 0%, rgba(255,255,255,0.85) 50%, ${palette.primary.light}10 100%)`,
          zIndex: -1,
        },
        [breakpoints.down("md")]: {
          padding: spacing(3),
          borderRadius: 32,
        },
        [breakpoints.down("sm")]: {
          padding: spacing(2),
          borderRadius: 28,
        },
      },
      cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: spacing(3),
        [breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
          gap: spacing(2.5),
        },
      },
      card: {
        position: "relative",
        padding: spacing(4),
        textAlign: "left",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: shape.borderRadius * 1.5,
        border: `1px solid ${palette.primary.light}20`,
        boxShadow: `0 18px 30px ${palette.secondary.main}10, inset 0 1px 0 rgba(255,255,255,0.4)`,
        backdropFilter: "blur(6px)",
        // Removed animation prop as handled by Framer Motion
        "&:hover": {
          // transform handled by motion
          boxShadow: `0 28px 60px ${palette.secondary.main}25, inset 0 1px 0 rgba(255,255,255,0.6)`,
          borderColor: `${palette.secondary.main}40`,
        },
        [breakpoints.down("lg")]: {
          padding: spacing(3.5),
        },
        [breakpoints.down("md")]: {
          padding: spacing(3),
        },
      },
      cardTitle: {
        fontSize: "1.375rem",
        fontWeight: 700,
        color: palette.primary.main, // Primary purple
        marginBottom: spacing(1.5),
        letterSpacing: "-0.01em",
        [breakpoints.down("md")]: {
          fontSize: "1.25rem",
        },
      },
      cardDescription: {
        color: palette.text.secondary,
        fontSize: "1.05rem",
        lineHeight: 1.65,
        maxWidth: 360,
        [breakpoints.down("lg")]: {
          fontSize: "1rem",
        },
        [breakpoints.down("sm")]: {
          maxWidth: "100%",
        },
      },
      accentDot: {
        position: "absolute",
        top: spacing(2.5),
        right: spacing(2.5),
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: palette.secondary.main,
        boxShadow: `0 0 0 4px ${palette.secondary.light}40`,
        animation: "pulseDot 3.2s ease-in-out infinite",
      },
      "@keyframes pulseDot": {
        "0%": {
          transform: "scale(0.94)",
          boxShadow: `0 0 0 0 ${palette.secondary.main}40`,
        },
        "50%": {
          transform: "scale(1)",
          boxShadow: `0 0 0 10px ${palette.secondary.main}00`,
        },
        "100%": {
          transform: "scale(0.94)",
          boxShadow: `0 0 0 0 ${palette.secondary.main}00`,
        },
      },

      promoCard: {
        gridColumn: "1 / -1",
        marginTop: spacing(2),
        padding: spacing(4),
        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
        borderRadius: shape.borderRadius * 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 20px 40px ${palette.primary.main}40`,
        position: "relative",
        overflow: "hidden",
        "&::after": {
           content: '""',
           position: "absolute",
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           background: "repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%)",
           backgroundSize: "4px 4px",
           opacity: 0.05,
        }
      },
      promoTitle: {
        fontSize: "2rem",
        fontWeight: 800,
        color: "#ffffff",
        textAlign: "center",
        lineHeight: 1.2,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        [breakpoints.down("sm")]: {
            fontSize: "1.5rem",
        },
      }
    };
  }
);

export default useStyles;


