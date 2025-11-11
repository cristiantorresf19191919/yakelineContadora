import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "ConfidenceShowcase" })(
  (theme: Theme) => {
    const { breakpoints, palette, spacing, shape } = theme;
    const primary = palette.primary.main;

    return {
      section: {
        position: "relative",
        overflow: "hidden",
        padding: spacing(10, 4, 14),
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8EE 100%)",
        [breakpoints.down("lg")]: {
          padding: spacing(9, 3, 12),
        },
        [breakpoints.down("md")]: {
          padding: spacing(7, 2.5, 10),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(6, 1.5, 8),
        },
      },
      glowBackdrop: {
        position: "absolute",
        top: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 860,
        height: 860,
        background:
          "radial-gradient(circle, rgba(139,115,85,0.18) 0%, rgba(255,248,238,0) 60%)",
        filter: "blur(18px)",
        opacity: 0.85,
        pointerEvents: "none",
        [breakpoints.down("lg")]: {
          width: 720,
          height: 720,
        },
        [breakpoints.down("md")]: {
          width: 580,
          height: 580,
        },
        [breakpoints.down("sm")]: {
          width: 360,
          height: 360,
        },
      },
      container: {
        position: "relative",
        zIndex: 1,
        maxWidth: 1180,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing(6),
      },
      heading: {
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: 700,
        color: palette.text.primary,
        letterSpacing: "-0.015em",
        maxWidth: 760,
        [breakpoints.down("lg")]: {
          fontSize: "2.25rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.75rem",
        },
      },
      highlight: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: primary,
        padding: spacing(0.5, 1.5),
        borderRadius: "999px",
        background:
          "linear-gradient(90deg, rgba(139,115,85,0.08) 0%, rgba(251,236,202,0.55) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
      },
      gallery: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: spacing(2.5),
        flexWrap: "nowrap",
        padding: spacing(0, 2),
        [breakpoints.down("lg")]: {
          gap: spacing(2),
        },
        [breakpoints.down("md")]: {
          flexWrap: "wrap",
          justifyContent: "center",
          gap: spacing(2.5),
        },
      },
      photoCard: {
        position: "relative",
        overflow: "hidden",
        borderRadius: shape.borderRadius * 2.5,
        boxShadow:
          "0 28px 60px rgba(31, 19, 8, 0.18), 0 10px 35px rgba(106, 63, 160, 0.12)",
        transformOrigin: "center",
        transform:
          "translateY(var(--shiftY, 0px)) translateX(var(--shiftX, 0px)) rotate(var(--tilt, 0deg)) scale(var(--scale, 1))",
        transition:
          "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, filter 0.35s ease",
        animation: "float 7.5s ease-in-out infinite",
        backgroundColor: "#FFFFFF",
        isolation: "isolate",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(255, 230, 205, 0.4) 100%)",
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        },
        "&:hover": {
          transform:
            "translateY(calc(var(--shiftY, 0px) - 18px)) translateX(var(--shiftX, 0px)) rotate(var(--tilt, 0deg)) scale(calc(var(--scale, 1) * 1.04))",
          boxShadow:
            "0 42px 80px rgba(31, 19, 8, 0.24), 0 16px 45px rgba(106, 63, 160, 0.16)",
          filter: "saturate(1.05)",
        },
        "& img": {
          objectFit: "cover",
        },
        [breakpoints.down("md")]: {
          animationDuration: "6s",
        },
      },
      cardSmall: {
        width: 220,
        height: 290,
        animationDelay: "-1.2s",
        "--shiftY": "28px",
        "--tilt": "-12deg",
        "--scale": "0.92",
        [breakpoints.down("lg")]: {
          width: 200,
          height: 270,
        },
        [breakpoints.down("md")]: {
          width: "42vw",
          maxWidth: 210,
          height: "60vw",
          maxHeight: 280,
        },
        [breakpoints.down("sm")]: {
          width: "78vw",
          height: "105vw",
        },
      },
      cardMedium: {
        width: 250,
        height: 330,
        animationDelay: "-0.6s",
        "--shiftY": "12px",
        "--tilt": "-6deg",
        "--scale": "0.98",
        [breakpoints.down("lg")]: {
          width: 220,
          height: 300,
        },
        [breakpoints.down("md")]: {
          width: "48vw",
          maxWidth: 240,
          height: "64vw",
          maxHeight: 320,
        },
        [breakpoints.down("sm")]: {
          width: "82vw",
          height: "110vw",
        },
      },
      cardLarge: {
        width: 320,
        height: 410,
        animationDelay: "0s",
        zIndex: 3,
        "--shiftY": "-12px",
        "--tilt": "0deg",
        "--scale": "1.05",
        [breakpoints.down("lg")]: {
          width: 300,
          height: 380,
        },
        [breakpoints.down("md")]: {
          width: "64vw",
          maxWidth: 300,
          height: "84vw",
          maxHeight: 400,
        },
        [breakpoints.down("sm")]: {
          width: "90vw",
          height: "124vw",
        },
      },
      cardRight: {
        width: 250,
        height: 330,
        animationDelay: "0.4s",
        "--shiftY": "6px",
        "--tilt": "6deg",
        "--scale": "0.98",
        [breakpoints.down("lg")]: {
          width: 220,
          height: 300,
        },
        [breakpoints.down("md")]: {
          width: "48vw",
          maxWidth: 240,
          height: "64vw",
          maxHeight: 320,
        },
        [breakpoints.down("sm")]: {
          width: "82vw",
          height: "110vw",
        },
      },
      cardRightSmall: {
        width: 220,
        height: 290,
        animationDelay: "0.8s",
        "--shiftY": "32px",
        "--tilt": "12deg",
        "--scale": "0.92",
        [breakpoints.down("lg")]: {
          width: 200,
          height: 270,
        },
        [breakpoints.down("md")]: {
          width: "42vw",
          maxWidth: 210,
          height: "60vw",
          maxHeight: 280,
        },
        [breakpoints.down("sm")]: {
          width: "78vw",
          height: "105vw",
        },
      },
      ctaArea: {
        width: "100%",
        marginTop: spacing(6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing(3),
        position: "relative",
      },
      ctaGlow: {
        position: "absolute",
        top: "-35%",
        width: 420,
        height: 420,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,230,173,0.45) 0%, rgba(255,230,173,0) 70%)",
        filter: "blur(40px)",
        opacity: 0.8,
        pointerEvents: "none",
      },
      whatsappButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(1.5),
        padding: spacing(1.75, 4),
        borderRadius: "999px",
        backgroundColor: "#25D366",
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: "1.125rem",
        textDecoration: "none",
        boxShadow: "0 18px 40px rgba(37, 211, 102, 0.3)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 22px 50px rgba(37, 211, 102, 0.38)",
        },
        "&:active": {
          transform: "translateY(-2px)",
        },
      },
      whatsappIcon: {
        fontSize: "1.6rem",
      },
      "@keyframes float": {
        "0%": {
          transform: "translateY(0) rotate(var(--tilt, 0deg))",
        },
        "50%": {
          transform: "translateY(-12px) rotate(calc(var(--tilt, 0deg) * 1.1))",
        },
        "100%": {
          transform: "translateY(0) rotate(var(--tilt, 0deg))",
        },
      },
    };
  }
);

export default useStyles;


