import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "SuggestedArticles" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      section: {
        backgroundColor: "#FDFBF8",
        padding: spacing(8, 6),
        [breakpoints.down("md")]: {
          padding: spacing(6, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(5, 2),
        },
      },
      container: {
        maxWidth: 1200,
        margin: "0 auto",
      },
      title: {
        fontSize: "2rem",
        fontWeight: 700,
        color: "#4A3728",
        marginBottom: spacing(5),
        textAlign: "center",
        [breakpoints.down("md")]: {
          fontSize: "1.75rem",
          marginBottom: spacing(4),
        },
        [breakpoints.down("sm")]: {
          fontSize: "1.5rem",
          marginBottom: spacing(3),
        },
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: spacing(4),
        [breakpoints.down("md")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: spacing(3),
        },
        [breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
          gap: spacing(3),
        },
      },
      card: {
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.3s ease, boxShadow 0.3s ease",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        },
      },
      imageWrapper: {
        position: "relative",
        width: "100%",
        paddingTop: "60%",
        overflow: "hidden",
      },
      image: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      cardContent: {
        padding: spacing(3),
        flex: 1,
        display: "flex",
        flexDirection: "column",
      },
      cardCategory: {
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#8B7355",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: spacing(1),
      },
      cardTitle: {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#4A3728",
        marginBottom: spacing(1.5),
        lineHeight: 1.3,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      },
      cardExcerpt: {
        fontSize: "0.9375rem",
        color: "#6B5B4A",
        lineHeight: 1.6,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        flex: 1,
      },
      readMore: {
        marginTop: spacing(2),
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "#9FE870",
        display: "flex",
        alignItems: "center",
        gap: spacing(0.5),
      },
    };
  }
);

export default useStyles;

