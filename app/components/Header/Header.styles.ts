import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Header" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    const headerTextColor = theme.palette.primary.main;
    const headerHoverColor = theme.palette.primary.dark;
    const mobileMenuBackground =
      "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 228, 255, 0.95) 85%)";

    return {
      header: {
        backgroundColor: "#FFFFFF",
        color: headerTextColor,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 10px 28px rgba(90, 60, 130, 0.08)",
        borderBottom: "1px solid rgba(106, 63, 160, 0.08)",
      },
      headerContainer: {
        maxWidth: "100%",
        margin: "0 auto",
        padding: spacing(3, 6),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        [breakpoints.down("lg")]: {
          padding: spacing(2.5, 5),
        },
        [breakpoints.down("md")]: {
          padding: spacing(2.5, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(2.5, 3),
          justifyContent: "space-between",
        },
      },
      nav: {
        display: "flex",
        alignItems: "center",
        gap: spacing(5),
        [breakpoints.down("xl")]: {
          gap: spacing(4.5),
        },
        [breakpoints.down("lg")]: {
          gap: spacing(4),
        },
        [breakpoints.down("md")]: {
          gap: spacing(3),
        },
        [breakpoints.down("sm")]: {
          display: "none",
        },
      },
      navLink: {
        color: headerTextColor,
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        position: "relative",
        padding: spacing(1, 0),
        transition: "color 0.2s ease, opacity 0.2s ease",
        whiteSpace: "nowrap",
        opacity: 0.88,
        "&:hover": {
          color: headerHoverColor,
          opacity: 1,
        },
      },
      menuButton: {
        display: "none",
        [breakpoints.down("sm")]: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          padding: spacing(1),
          color: headerTextColor,
        },
      },
      menuIcon: {
        fontSize: "1.5rem",
        color: headerTextColor,
      },
      mobileMenu: {
        display: "none",
        [breakpoints.down("sm")]: {
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: mobileMenuBackground,
          boxShadow: "0px 10px 28px rgba(106, 63, 160, 0.15)",
          padding: spacing(2, 0),
          zIndex: 999,
        },
      },
      mobileMenuOpen: {
        display: "flex !important" as "flex",
        flexDirection: "column",
      },
      mobileNavLink: {
        color: headerTextColor,
        textDecoration: "none",
        fontSize: "1.0625rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: spacing(1.5, 3),
        transition: "background-color 0.2s ease, color 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(106, 63, 160, 0.08)",
          color: headerHoverColor,
        },
      },
    };
  }
);

export default useStyles;

