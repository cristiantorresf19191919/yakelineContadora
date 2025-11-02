import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Header" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      header: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
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
        color: "#8B7355",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        position: "relative",
        padding: spacing(1, 0),
        transition: "color 0.2s ease",
        whiteSpace: "nowrap",
        "&:hover": {
          color: "#6F5B40",
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
          color: "#8B7355",
        },
      },
      menuIcon: {
        fontSize: "1.5rem",
        color: "#8B7355",
      },
      mobileMenu: {
        display: "none",
        [breakpoints.down("sm")]: {
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: spacing(2, 0),
          zIndex: 999,
        },
      },
      mobileMenuOpen: {
        display: "flex !important" as "flex",
        flexDirection: "column",
      },
      mobileNavLink: {
        color: "#8B7355",
        textDecoration: "none",
        fontSize: "1.0625rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: spacing(1.5, 3),
        transition: "background-color 0.2s ease, color 0.2s ease",
        "&:hover": {
          backgroundColor: "#F5F5F5",
          color: "#6F5B40",
        },
      },
    };
  }
);

export default useStyles;

