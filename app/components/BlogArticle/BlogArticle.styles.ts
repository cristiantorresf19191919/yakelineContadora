import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "BlogArticle" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      article: {
        maxWidth: 1000,
        margin: "0 auto",
        padding: spacing(0, 6),
        backgroundColor: "#FFFFFF",
        [breakpoints.down("md")]: {
          padding: spacing(0, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(0, 2),
        },
      },
      heroSection: {
        position: "relative",
        marginBottom: spacing(6),
        [breakpoints.down("md")]: {
          marginBottom: spacing(5),
        },
        [breakpoints.down("sm")]: {
          marginBottom: spacing(4),
        },
      },
      heroImageWrapper: {
        position: "relative",
        width: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: spacing(4),
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
        [breakpoints.down("md")]: {
          borderRadius: "16px",
          marginBottom: spacing(3),
        },
        [breakpoints.down("sm")]: {
          borderRadius: "12px",
          marginBottom: spacing(2),
        },
      },
      heroImage: {
        width: "100%",
        height: "auto",
        display: "block",
        objectFit: "cover",
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.02)",
        },
      },
      header: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)",
        padding: spacing(6, 4),
        borderRadius: "0 0 24px 24px",
        [breakpoints.down("md")]: {
          padding: spacing(5, 3),
          borderRadius: "0 0 16px 16px",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(4, 2),
          borderRadius: "0 0 12px 12px",
        },
      },
      headerContent: {
        maxWidth: 900,
        margin: "0 auto",
      },
      category: {
        display: "inline-block",
        color: "#FFFFFF",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        fontSize: "0.8125rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: spacing(2),
        padding: spacing(0.75, 2),
        borderRadius: "50px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      },
      title: {
        fontSize: "3.5rem",
        fontWeight: 700,
        color: "#FFFFFF",
        lineHeight: 1.1,
        marginBottom: spacing(2),
        textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
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
      meta: {
        display: "flex",
        alignItems: "center",
        gap: spacing(2),
        color: "#FFFFFF",
        fontSize: "1rem",
        fontWeight: 400,
        opacity: 0.95,
        [breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: spacing(1),
          fontSize: "0.9375rem",
        },
      },
      metaSeparator: {
        opacity: 0.6,
      },
      contentWrapper: {
        maxWidth: 750,
        margin: "0 auto",
        paddingTop: spacing(2),
      },
      content: {
        color: "#4A3728",
        fontSize: "1.1875rem",
        lineHeight: 1.85,
        fontWeight: 400,
        "& h2": {
          fontSize: "2.25rem",
          fontWeight: 700,
          color: "#4A3728",
          marginTop: spacing(5),
          marginBottom: spacing(2.5),
          lineHeight: 1.3,
          paddingTop: spacing(2),
          [breakpoints.down("md")]: {
            fontSize: "2rem",
            marginTop: spacing(4),
          },
          [breakpoints.down("sm")]: {
            fontSize: "1.75rem",
            marginTop: spacing(3),
          },
        },
        "& h3": {
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "#5A4A3A",
          marginTop: spacing(4),
          marginBottom: spacing(2),
          lineHeight: 1.4,
          [breakpoints.down("sm")]: {
            fontSize: "1.5rem",
            marginTop: spacing(3),
          },
        },
        "& p": {
          marginBottom: spacing(3),
          color: "#4A3728",
          fontSize: "1.1875rem",
          lineHeight: 1.85,
          [breakpoints.down("sm")]: {
            fontSize: "1.0625rem",
            marginBottom: spacing(2.5),
          },
        },
        "& ul, & ol": {
          marginBottom: spacing(3),
          paddingLeft: spacing(5),
          "& li": {
            marginBottom: spacing(1.5),
            color: "#4A3728",
            fontSize: "1.1875rem",
            lineHeight: 1.8,
            position: "relative",
            "&::marker": {
              color: "#9FE870",
              fontWeight: 600,
            },
            [breakpoints.down("sm")]: {
              fontSize: "1.0625rem",
              paddingLeft: spacing(1),
            },
          },
        },
        "& strong": {
          fontWeight: 600,
          color: "#4A3728",
        },
        "& em": {
          fontStyle: "italic",
          color: "#6B5B4A",
        },
        "& hr": {
          border: "none",
          borderTop: "none",
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #4A3728 20%, #4A3728 80%, transparent 100%)",
          margin: `${spacing(3)} auto ${spacing(4)}`,
          maxWidth: "200px",
          position: "relative",
          padding: 0,
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: "-1px",
            width: "2px",
            height: "4px",
            background: "#4A3728",
          },
          "&::before": {
            left: "20%",
          },
          "&::after": {
            right: "20%",
          },
          [breakpoints.down("sm")]: {
            margin: `${spacing(2.5)} auto ${spacing(3.5)}`,
            maxWidth: "160px",
          },
        },
      },
      introText: {
        fontSize: "1.375rem",
        fontWeight: 500,
        color: "#6B5B4A",
        lineHeight: 1.7,
        fontStyle: "italic",
        marginBottom: spacing(4),
        paddingLeft: spacing(3),
        borderLeft: "4px solid #9FE870",
        [breakpoints.down("sm")]: {
          fontSize: "1.1875rem",
          paddingLeft: spacing(2),
          marginBottom: spacing(3),
        },
      },
      cta: {
        marginTop: spacing(8),
        padding: spacing(5),
        backgroundColor: "linear-gradient(135deg, #FDFBF8 0%, #FFF8F5 100%)",
        background: "linear-gradient(135deg, #FDFBF8 0%, #FFF8F5 100%)",
        borderRadius: "20px",
        border: "2px solid #E8E0D6",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          backgroundColor: "#9FE870",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(4),
          marginTop: spacing(6),
          borderRadius: "16px",
        },
      },
      ctaText: {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#4A3728",
        marginBottom: spacing(3),
        lineHeight: 1.3,
        [breakpoints.down("sm")]: {
          fontSize: "1.25rem",
          marginBottom: spacing(2.5),
        },
      },
      ctaList: {
        listStyle: "none",
        paddingLeft: 0,
        marginBottom: spacing(4),
        "& li": {
          paddingLeft: spacing(4),
          position: "relative",
          marginBottom: spacing(2),
          fontSize: "1.125rem",
          color: "#4A3728",
          lineHeight: 1.6,
          "&::before": {
            content: '"✓"',
            position: "absolute",
            left: 0,
            color: "#9FE870",
            fontSize: "1.5rem",
            fontWeight: 700,
            lineHeight: 1,
          },
          [breakpoints.down("sm")]: {
            fontSize: "1rem",
            paddingLeft: spacing(3.5),
          },
        },
      },
      ctaButton: {
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(1.5),
        backgroundColor: "#9FE870",
        color: "#FFFFFF",
        padding: spacing(1.75, 4),
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "1.125rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 16px rgba(159, 232, 112, 0.3)",
        "&:hover": {
          backgroundColor: "#8FD960",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 24px rgba(159, 232, 112, 0.4)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
        [breakpoints.down("sm")]: {
          padding: spacing(1.5, 3),
          fontSize: "1rem",
        },
      },
    };
  }
);

export default useStyles;
