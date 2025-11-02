import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Hero" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      hero: {
        position: "relative",
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(to right, #FFFFFF 0%, #FFF8F5 100%)",
        padding: spacing(8, 6),
        overflow: "hidden",
        [breakpoints.down("lg")]: {
          padding: spacing(6, 5),
        },
        [breakpoints.down("md")]: {
          flexDirection: "column",
          padding: spacing(6, 4),
          minHeight: "auto",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(4, 2),
        },
      },
      container: {
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: spacing(6),
        [breakpoints.down("lg")]: {
          gap: spacing(5),
        },
        [breakpoints.down("md")]: {
          flexDirection: "column",
          gap: spacing(4),
        },
      },
      contentWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: spacing(3),
        animation: "fadeInUp 0.8s ease-out",
        [breakpoints.down("md")]: {
          alignItems: "center",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          gap: spacing(2.5),
        },
      },
      mainHeading: {
        fontSize: "3.5rem",
        fontWeight: 700,
        color: "#4A3728",
        lineHeight: 1.2,
        marginBottom: spacing(2),
        animation: "fadeInUp 0.8s ease-out 0.2s both",
        [breakpoints.down("xl")]: {
          fontSize: "3rem",
        },
        [breakpoints.down("lg")]: {
          fontSize: "2.5rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2rem",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.75rem",
        },
      },
      firstLine: {
        display: "block",
      },
      secondLine: {
        display: "block",
        paddingLeft: spacing(2),
        [breakpoints.down("md")]: {
          paddingLeft: 0,
        },
      },
      tagline: {
        fontSize: "1.5rem",
        fontWeight: 400,
        color: "#6B5B4A",
        marginTop: spacing(1),
        animation: "fadeInUp 0.8s ease-out 0.3s both",
        [breakpoints.down("lg")]: {
          fontSize: "1.3rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "1.2rem",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.1rem",
        },
      },
      bodyText: {
        fontSize: "1.125rem",
        fontWeight: 400,
        color: "#5A4A3A",
        lineHeight: 1.6,
        maxWidth: "90%",
        marginTop: spacing(1),
        animation: "fadeInUp 0.8s ease-out 0.4s both",
        [breakpoints.down("md")]: {
          fontSize: "1rem",
          maxWidth: "100%",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          fontSize: "0.9375rem",
        },
      },
      subHeading: {
        fontSize: "1.25rem",
        fontWeight: 500,
        color: "#4A3728",
        marginTop: spacing(2),
        animation: "fadeInUp 0.8s ease-out 0.5s both",
        [breakpoints.down("md")]: {
          fontSize: "1.125rem",
          textAlign: "center",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
      ctaButton: {
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(1.5),
        backgroundColor: "#9FE870",
        color: "#FFFFFF",
        padding: spacing(1.5, 3),
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "1.125rem",
        marginTop: spacing(3),
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(159, 232, 112, 0.3)",
        animation: "fadeInUp 0.8s ease-out 0.6s both",
        "&:hover": {
          backgroundColor: "#8FD960",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(159, 232, 112, 0.4)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
        [breakpoints.down("md")]: {
          alignSelf: "center",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(1.25, 2.5),
          fontSize: "1rem",
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
        animation: "fadeInRight 0.8s ease-out 0.4s both",
        [breakpoints.down("md")]: {
          width: "100%",
          maxWidth: 500,
        },
      },
      image: {
        width: "100%",
        height: "auto",
        maxWidth: 600,
        borderRadius: "16px",
        objectFit: "cover",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
        [breakpoints.down("lg")]: {
          maxWidth: 500,
        },
        [breakpoints.down("md")]: {
          maxWidth: "100%",
        },
      },
      "@keyframes fadeInUp": {
        from: {
          opacity: 0,
          transform: "translateY(30px)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      "@keyframes fadeInRight": {
        from: {
          opacity: 0,
          transform: "translateX(30px)",
        },
        to: {
          opacity: 1,
          transform: "translateX(0)",
        },
      },
    };
  }
);

export default useStyles;

