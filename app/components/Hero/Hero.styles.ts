import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Hero" })(
  (theme: Theme) => {
    const { breakpoints, spacing, palette } = theme;
    
    return {
      hero: {
        position: "relative",
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: palette.background.default,
        padding: spacing(8, 6),
        overflow: "hidden",
        [breakpoints.down("lg")]: {
          padding: spacing(6, 5),
        },
        [breakpoints.down("md")]: {
          flexDirection: "column",
          padding: spacing(12, 4, 6), // Added top padding for header
          minHeight: "auto",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(10, 2, 6),
        },
      },
      heroBackground: {
        position: "absolute",
        top: -100,
        right: -100,
        width: "60%",
        height: "80%",
        background: `radial-gradient(circle at 50% 50%, ${palette.primary.light}20 0%, transparent 70%)`,
        zIndex: 0,
        filter: "blur(60px)",
        borderRadius: "50%",
      },
      container: {
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: spacing(8),
        zIndex: 1,
        [breakpoints.down("lg")]: {
          gap: spacing(5),
        },
        [breakpoints.down("md")]: {
          flexDirection: "column",
          gap: spacing(6),
        },
      },
      contentWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: spacing(3),
        [breakpoints.down("md")]: {
          alignItems: "center",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          gap: spacing(2.5),
        },
      },
      mainHeading: {
        fontSize: "4rem", // Increased size
        fontWeight: 800,
        color: palette.text.primary, // Used theme text color
        lineHeight: 1.1,
        marginBottom: spacing(2),
        [breakpoints.down("xl")]: {
          fontSize: "3.5rem",
        },
        [breakpoints.down("lg")]: {
          fontSize: "3rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2.5rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "2rem",
        },
      },
      firstLine: {
        display: "block",
        color: palette.primary.main, // Highlight
      },
      secondLine: {
        display: "block",
      },
      tagline: {
        fontSize: "1.5rem",
        fontWeight: 500,
        color: palette.secondary.main,
        marginTop: spacing(1),
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        [breakpoints.down("lg")]: {
          fontSize: "1.25rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "1.1rem",
        },
      },
      bodyText: {
        fontSize: "1.25rem",
        fontWeight: 400,
        color: palette.text.secondary,
        lineHeight: 1.7,
        maxWidth: "90%",
        [breakpoints.down("md")]: {
          fontSize: "1.1rem",
          maxWidth: "100%",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
      subHeading: {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: palette.text.primary,
        marginTop: spacing(1),
        [breakpoints.down("md")]: {
          fontSize: "1.1rem",
        },
      },
      ctaButton: {
        // Styles are now mostly handled by MUI Button theme overrides
        marginTop: spacing(2),
        padding: spacing(1.5, 5),
        fontSize: "1.1rem",
        [breakpoints.down("md")]: {
          alignSelf: "center",
        },
      },
      whatsappIcon: {
        fontSize: "1.5rem",
      },
      imageWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        [breakpoints.down("md")]: {
          width: "100%",
        },
      },
      imageBackdrop: {
        position: "absolute",
        top: 20,
        right: 20,
        bottom: -20,
        left: -20,
        background: palette.secondary.light,
        opacity: 0.3,
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Blob shape
        zIndex: -1,
        [breakpoints.down("md")]: {
          display: "none",
        },
      },
      image: {
        width: "100%",
        height: "auto",
        maxWidth: 550,
        borderRadius: "24px",
        objectFit: "cover",
        boxShadow: theme.shadows[10], // Deep shadow
        position: "relative",
        zIndex: 2,
        [breakpoints.down("lg")]: {
          maxWidth: 450,
        },
        [breakpoints.down("md")]: {
          maxWidth: "100%",
          boxShadow: "none",
        },
      },
      // Mobile-only animation container
      mobileAnimationContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "24px",
        zIndex: 1,
        display: "none",
        [breakpoints.down("md")]: {
          display: "block",
        },
      },
      // Animated blob shape 1
      animatedBlob1: {
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "120px",
        height: "120px",
        background: `linear-gradient(135deg, ${palette.primary.main}40, ${palette.secondary.main}40)`,
        filter: "blur(20px)",
        opacity: 0.6,
        zIndex: 1,
        mixBlendMode: "multiply",
      },
      // Animated blob shape 2
      animatedBlob2: {
        position: "absolute",
        bottom: "15%",
        left: "8%",
        width: "100px",
        height: "100px",
        background: `linear-gradient(225deg, ${palette.secondary.main}50, ${palette.primary.light}50)`,
        filter: "blur(25px)",
        opacity: 0.5,
        zIndex: 1,
        mixBlendMode: "multiply",
      },
      // Gradient sweep shape
      gradientSweep: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "150%",
        height: "100%",
        background: `linear-gradient(
          90deg,
          transparent 0%,
          ${palette.primary.light}20 30%,
          ${palette.secondary.main}30 50%,
          ${palette.primary.light}20 70%,
          transparent 100%
        )`,
        transform: "skewX(-20deg)",
        zIndex: 1,
        mixBlendMode: "overlay",
        opacity: 0.4,
      },
      // Floating particles
      floatingParticle: {
        position: "absolute",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: palette.primary.main,
        opacity: 0.4,
        filter: "blur(2px)",
        zIndex: 1,
      },
    };
  }
);

export default useStyles;

