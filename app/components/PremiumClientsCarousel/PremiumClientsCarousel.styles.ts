import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "PremiumClientsCarousel" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;

    return {
      section: {
        position: "relative",
        padding: spacing(12, 8),
        backgroundColor: "#FFF7F0",
        overflow: "hidden",
        [breakpoints.down("lg")]: {
          padding: spacing(10, 6),
        },
        [breakpoints.down("md")]: {
          padding: spacing(8, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(7, 2.5),
        },
      },
      glow: {
        display: "none",
      },
      container: {
        position: "relative",
        zIndex: 2,
        margin: "0 auto",
        maxWidth: 1240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
      eyebrow: {
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: "rgba(74, 55, 40, 0.65)",
        fontSize: "0.875rem",
        marginBottom: spacing(1.5),
        [breakpoints.down("sm")]: {
          fontSize: "0.8125rem",
        },
      },
      title: {
        fontSize: "3rem",
        lineHeight: 1.15,
        fontWeight: 700,
        color: "#4A3728",
        maxWidth: 840,
        [breakpoints.down("lg")]: {
          fontSize: "2.75rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2.4rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "2rem",
        },
      },
      highlighted: {
        color: "#B47A3B",
      },
      subtitle: {
        marginTop: spacing(2.5),
        fontSize: "1.25rem",
        lineHeight: 1.7,
        color: "#6B5B4A",
        maxWidth: 780,
        [breakpoints.down("md")]: {
          fontSize: "1.125rem",
          maxWidth: 620,
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.05rem",
        },
      },
      carouselWrapper: {
        position: "relative",
        width: "100%",
        marginTop: spacing(7),
        padding: spacing(0, 1),
      },
      carouselViewport: {
        overflow: "hidden",
        width: "100%",
        position: "relative",
      },
      carouselTrack: {
        display: "flex",
        transition: "transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      slide: {
        flex: "0 0 33.333%",
        padding: spacing(0, 1.5),
        [breakpoints.down("lg")]: {
          padding: spacing(0, 1.25),
        },
        [breakpoints.down("md")]: {
          padding: spacing(0, 1),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(0, 0.75),
        },
      },
      card: {
        position: "relative",
        height: "100%",
        borderRadius: "26px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(90, 60, 38, 0.08)",
        boxShadow: "0 22px 48px rgba(74, 55, 40, 0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        isolation: "isolate",
      },
      cardHeader: {
        padding: spacing(3, 3.5, 0),
        display: "flex",
        justifyContent: "flex-start",
      },
      categoryPill: {
        padding: spacing(0.75, 1.75),
        borderRadius: "999px",
        backgroundColor: "rgba(180, 122, 59, 0.14)",
        color: "#8C5A28",
        textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "0.75rem",
        letterSpacing: "0.12em",
      },
      content: {
        padding: spacing(3.5, 3.5, 4),
        display: "flex",
        flexDirection: "column",
        gap: spacing(2.25),
        textAlign: "left",
        [breakpoints.down("lg")]: {
          padding: spacing(3.25, 3, 3.75),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(3, 2.5, 3.5),
        },
      },
      quoteMark: {
        fontSize: "2.25rem",
        color: "rgba(106, 63, 160, 0.6)",
        lineHeight: 1,
      },
      quote: {
        fontSize: "1.1rem",
        lineHeight: 1.65,
        color: "#4A3728",
        fontWeight: 500,
        [breakpoints.down("md")]: {
          fontSize: "1.05rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
      clientInfo: {
        display: "flex",
        flexDirection: "column",
        gap: spacing(0.65),
      },
      clientName: {
        fontSize: "1.05rem",
        fontWeight: 700,
        color: "#4A3728",
        letterSpacing: "-0.01em",
      },
      clientRole: {
        fontSize: "0.95rem",
        color: "rgba(74, 55, 40, 0.72)",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      },
      controls: {
        marginTop: spacing(5),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(2),
        [breakpoints.down("sm")]: {
          marginTop: spacing(4),
        },
      },
      arrows: {
        display: "flex",
        gap: spacing(1.5),
      },
      arrowButton: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "1px solid rgba(74, 55, 40, 0.25)",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4A3728",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(180, 122, 59, 0.15)",
          boxShadow: "0 10px 24px rgba(74, 55, 40, 0.18)",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
        "&[data-disabled='true']": {
          opacity: 0.4,
          cursor: "default",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
          },
        },
      },
      indicators: {
        display: "flex",
        alignItems: "center",
        gap: spacing(1.25),
        padding: spacing(0, 1.5),
      },
      indicatorDot: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "rgba(74, 55, 40, 0.22)",
        transition: "transform 0.3s ease, background-color 0.3s ease",
        "&[data-active='true']": {
          transform: "scale(1.45)",
          backgroundColor: "#B47A3B",
        },
      },
      fadeOverlay: {
        display: "none",
      },
    };
  }
);

export default useStyles;


