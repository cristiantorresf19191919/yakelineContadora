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
        background: `linear-gradient(180deg, ${palette.background.default} 0%, #FFFFFF 100%)`,
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
          "radial-gradient(circle, rgba(139,115,85,0.1) 0%, rgba(255,248,238,0) 60%)",
        filter: "blur(40px)",
        opacity: 0.6,
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
        perspective: "1200px", // Enable 3D perspective
      },
      heading: {
        textAlign: "center",
        fontSize: "3rem",
        fontWeight: 700,
        color: palette.text.primary,
        letterSpacing: "-0.015em",
        maxWidth: 760,
        marginBottom: spacing(4),
        [breakpoints.down("lg")]: {
          fontSize: "2.5rem",
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
          "linear-gradient(90deg, rgba(93, 63, 211, 0.08) 0%, rgba(167, 139, 250, 0.2) 100%)",
      },
      gallery: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(2),
        flexWrap: "nowrap",
        padding: spacing(4, 2),
        transformStyle: "preserve-3d", // Important for 3D interactions
        [breakpoints.down("md")]: {
          flexWrap: "wrap",
          gap: spacing(2.5),
          padding: spacing(3, 1.5),
        },
        [breakpoints.down("sm")]: {
          flexDirection: "column",
          flexWrap: "nowrap",
          gap: spacing(3),
          padding: spacing(2, 1),
          alignItems: "center",
        },
      },
      photoCard: {
        position: "relative",
        overflow: "hidden",
        borderRadius: shape.borderRadius * 2,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        backgroundColor: "#FFFFFF",
        isolation: "isolate",
        cursor: "pointer",
        // Framer motion will handle transforms
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(0,0,0,0.2) 100%)",
          pointerEvents: "none",
        },
        "& img": {
          objectFit: "cover",
        },
      },
      cardSmall: {
        width: 200,
        height: 280,
        marginTop: spacing(4),
        [breakpoints.down("md")]: {
          width: "42vw",
          maxWidth: 210,
          height: 260,
          marginTop: 0,
        },
        [breakpoints.down("sm")]: {
          width: "85vw",
          maxWidth: 320,
          height: "auto",
          aspectRatio: "3/4",
          marginTop: 0,
        },
      },
      cardMedium: {
        width: 240,
        height: 320,
        marginTop: spacing(2),
        [breakpoints.down("md")]: {
          width: "48vw",
          maxWidth: 240,
          height: 300,
          marginTop: 0,
        },
        [breakpoints.down("sm")]: {
          width: "85vw",
          maxWidth: 320,
          height: "auto",
          aspectRatio: "3/4",
          marginTop: 0,
        },
      },
      cardLarge: {
        width: 300,
        height: 400,
        zIndex: 10,
        boxShadow: "0 30px 60px rgba(93, 63, 211, 0.25)",
        [breakpoints.down("md")]: {
          width: "60vw",
          maxWidth: 300,
          height: 380,
        },
        [breakpoints.down("sm")]: {
          width: "90vw",
          maxWidth: 360,
          height: "auto",
          aspectRatio: "3/4",
          boxShadow: "0 20px 40px rgba(93, 63, 211, 0.2)",
        },
      },
      cardRight: {
        width: 240,
        height: 320,
        marginTop: spacing(2),
        [breakpoints.down("md")]: {
          width: "48vw",
          maxWidth: 240,
          height: 300,
          marginTop: 0,
        },
        [breakpoints.down("sm")]: {
          width: "85vw",
          maxWidth: 320,
          height: "auto",
          aspectRatio: "3/4",
          marginTop: 0,
        },
      },
      cardRightSmall: {
        width: 200,
        height: 280,
        marginTop: spacing(4),
        [breakpoints.down("md")]: {
          width: "42vw",
          maxWidth: 210,
          height: 260,
          marginTop: 0,
        },
        [breakpoints.down("sm")]: {
          width: "85vw",
          maxWidth: 320,
          height: "auto",
          aspectRatio: "3/4",
          marginTop: 0,
        },
      },
      ctaArea: {
        width: "100%",
        marginTop: spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing(3),
        position: "relative",
        [breakpoints.down("sm")]: {
          marginTop: spacing(6),
        },
      },
      ctaGlow: {
        position: "absolute",
        top: "-50%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${palette.secondary.light}40 0%, rgba(255,255,255,0) 70%)`,
        filter: "blur(50px)",
        pointerEvents: "none",
      },
      whatsappButton: {
        // Handled by MUI Theme + Framer Motion
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(1.5),
        padding: spacing(1.75, 5),
        borderRadius: "999px",
        backgroundColor: "#25D366",
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: "1.125rem",
        textDecoration: "none",
        boxShadow: "0 10px 30px rgba(37, 211, 102, 0.25)",
        [breakpoints.down("sm")]: {
          padding: spacing(1.5, 4),
          fontSize: "1rem",
          width: "90%",
          maxWidth: 320,
        },
      },
      whatsappIcon: {
        fontSize: "1.6rem",
      },
    };
  }
);

export default useStyles;


