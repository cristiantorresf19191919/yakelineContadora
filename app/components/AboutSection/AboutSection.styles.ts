import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "AboutSection" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      section: {
        backgroundColor: "#FDFBF8",
        padding: spacing(10, 6),
        textAlign: "center",
        position: "relative",
        [breakpoints.down("lg")]: {
          padding: spacing(8, 5),
        },
        [breakpoints.down("md")]: {
          padding: spacing(8, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(6, 3),
        },
      },
      container: {
        maxWidth: 900,
        margin: "0 auto",
      },
      heading: {
        color: "#8B7355",
        fontWeight: 700,
        fontSize: "2.75rem",
        lineHeight: 1.2,
        marginBottom: spacing(4),
        animation: "fadeInUp 0.8s ease-out",
        [breakpoints.down("lg")]: {
          fontSize: "2.5rem",
        },
        [breakpoints.down("md")]: {
          fontSize: "2rem",
          marginBottom: spacing(3),
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.75rem",
          marginBottom: spacing(2.5),
        },
      },
      body: {
        color: "#5A4A3A",
        fontSize: "1.25rem",
        lineHeight: 1.7,
        maxWidth: 800,
        margin: "0 auto",
        fontWeight: 400,
        animation: "fadeInUp 0.8s ease-out 0.2s both",
        [breakpoints.down("md")]: {
          fontSize: "1.125rem",
          lineHeight: 1.6,
        },
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
          lineHeight: 1.6,
        },
      },
      footerNote: {
        marginTop: spacing(6),
        paddingTop: spacing(4),
        borderTop: "1px solid rgba(139, 115, 85, 0.2)",
        color: "#8B7355",
        fontSize: "0.875rem",
        fontStyle: "italic",
        fontWeight: 400,
        opacity: 0.7,
        animation: "fadeInUp 0.8s ease-out 0.4s both",
        [breakpoints.down("sm")]: {
          marginTop: spacing(4),
          paddingTop: spacing(3),
          fontSize: "0.8125rem",
        },
      },
      "@keyframes fadeInUp": {
        from: {
          opacity: 0,
          transform: "translateY(20px)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    };
  }
);

export default useStyles;

