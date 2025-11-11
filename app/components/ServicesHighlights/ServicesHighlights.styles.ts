import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "ServicesHighlights" })(
  (theme: Theme) => {
    const { breakpoints, palette, spacing, shape } = theme;
    const primary = palette.primary.main;

    return {
      section: {
        position: "relative",
        overflow: "hidden",
        padding: spacing(12, 4),
        background: "linear-gradient(180deg, #FFF6EA 0%, #FFFFFF 100%)",
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
        background:
          "radial-gradient(circle, rgba(139,115,85,0.12) 0%, rgba(255,255,255,0) 65%)",
        filter: "blur(12px)",
        opacity: 0.9,
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
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,246,234,0.9) 100%)",
        boxShadow: "0 40px 80px rgba(139, 115, 85, 0.12)",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: spacing(3),
          borderRadius: 36,
          background:
            "linear-gradient(90deg, rgba(255,244,226,0.4) 0%, rgba(255,255,255,0.85) 50%, rgba(255,244,226,0.4) 100%)",
          zIndex: -1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: spacing(3),
          borderRadius: 36,
          background:
            "linear-gradient(0deg, rgba(255,244,226,0.4) 0%, rgba(255,255,255,0.85) 50%, rgba(255,244,226,0.4) 100%)",
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
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        borderRadius: shape.borderRadius * 2.2,
        border: "1px solid rgba(139, 115, 85, 0.12)",
        boxShadow:
          "0 18px 30px rgba(139, 115, 85, 0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
        backdropFilter: "blur(6px)",
        transform: "translateY(0) scale(1)",
        transition:
          "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease",
        animation: "fadeInCard 0.8s ease-out both",
        "&:hover": {
          transform: "translateY(-10px) scale(1.01)",
          boxShadow:
            "0 28px 60px rgba(139, 115, 85, 0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
          borderColor: "rgba(139, 115, 85, 0.35)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: shape.borderRadius * 2.2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
          opacity: 0,
          transition: "opacity 0.35s ease",
        },
        "&:hover::after": {
          opacity: 1,
        },
        "&:nth-of-type(1)": {
          animationDelay: "0.08s",
        },
        "&:nth-of-type(2)": {
          animationDelay: "0.2s",
        },
        "&:nth-of-type(3)": {
          animationDelay: "0.32s",
        },
        "&:nth-of-type(4)": {
          animationDelay: "0.44s",
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
        color: primary,
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
        background: primary,
        boxShadow: `0 0 0 12px rgba(139, 115, 85, 0.12)`,
        animation: "pulseDot 3.2s ease-in-out infinite",
      },
      "@keyframes fadeInCard": {
        from: {
          opacity: 0,
          transform: "translateY(24px)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      "@keyframes pulseDot": {
        "0%": {
          transform: "scale(0.94)",
          boxShadow: "0 0 0 0 rgba(139, 115, 85, 0.25)",
        },
        "50%": {
          transform: "scale(1)",
          boxShadow: "0 0 0 10px rgba(139, 115, 85, 0)",
        },
        "100%": {
          transform: "scale(0.94)",
          boxShadow: "0 0 0 0 rgba(139, 115, 85, 0)",
        },
      },
    };
  }
);

export default useStyles;


