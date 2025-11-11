import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "BlogListing" })(
  (theme: Theme) => {
    const { breakpoints, spacing, palette } = theme;
    return {
      section: {
        backgroundColor: palette.background.default,
        padding: spacing(8, 6),
        minHeight: "80vh",
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
      header: {
        textAlign: "center",
        marginBottom: spacing(6),
        [breakpoints.down("sm")]: {
          marginBottom: spacing(4),
        },
      },
      title: {
        fontSize: "3rem",
        fontWeight: 700,
        color: palette.secondary.dark,
        marginBottom: spacing(2),
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
      intro: {
        fontSize: "1.25rem",
        color: palette.text.secondary,
        maxWidth: 700,
        margin: "0 auto",
        lineHeight: 1.6,
        [breakpoints.down("md")]: {
          fontSize: "1.125rem",
        },
        [breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
      emptyState: {
        textAlign: "center",
        padding: spacing(8, 2),
        color: palette.text.secondary,
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: spacing(4),
        [breakpoints.down("lg")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        [breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
          gap: spacing(3),
        },
      },
      card: {
        backgroundColor: palette.background.paper,
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 16px rgba(44, 18, 54, 0.1)",
        border: "1px solid rgba(207, 166, 220, 0.25)",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 20px 48px rgba(44, 18, 54, 0.18)",
          borderColor: "rgba(207, 166, 220, 0.45)",
          "& .imageZoom": {
            transform: "scale(1.08)",
          },
          "& .readMoreLink": {
            transform: "translateX(4px)",
          },
        },
      },
      imageWrapper: {
        position: "relative",
        width: "100%",
        paddingTop: "65%",
        overflow: "hidden",
        backgroundColor: "#F7F1FA",
      },
      imageOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
        zIndex: 1,
      },
      image: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      categoryBadge: {
        position: "absolute",
        top: spacing(2),
        left: spacing(2),
        backgroundColor: palette.background.paper,
        color: palette.primary.dark,
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: spacing(0.5, 1.5),
        borderRadius: "20px",
        zIndex: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
      cardContent: {
        padding: spacing(3),
        flex: 1,
        display: "flex",
        flexDirection: "column",
      },
      meta: {
        display: "flex",
        alignItems: "center",
        marginBottom: spacing(1.5),
      },
      date: {
        fontSize: "0.875rem",
        color: palette.primary.dark,
        fontWeight: 400,
      },
      cardTitle: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: palette.secondary.dark,
        marginBottom: spacing(1.5),
        lineHeight: 1.3,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      },
      cardExcerpt: {
        fontSize: "1rem",
        color: palette.text.secondary,
        lineHeight: 1.6,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        flex: 1,
        marginBottom: spacing(2),
      },
      readMore: {
        display: "flex",
        alignItems: "center",
        gap: spacing(0.5),
        fontSize: "0.9375rem",
        fontWeight: 600,
        color: palette.primary.dark,
        marginTop: "auto",
        transition: "transform 0.3s ease",
      },
      arrowIcon: {
        transition: "transform 0.3s ease",
      },
    };
  }
);

export default useStyles;

