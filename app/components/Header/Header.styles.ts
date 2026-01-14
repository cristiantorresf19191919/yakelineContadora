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
        [breakpoints.down("sm")]: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: "none",
          position: "relative",
        },
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
          display: "none",
        },
      },
      logoLink: {
        display: "none",
        textDecoration: "none",
        color: "inherit",
        [breakpoints.down("sm")]: {
          display: "flex",
          alignItems: "center",
          flex: 1,
        },
      },
      logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: spacing(1.5),
        transition: "opacity 0.2s ease",
        "&:hover": {
          opacity: 0.8,
        },
      },
      logoIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: `linear-gradient(135deg, ${headerTextColor}15 0%, ${headerTextColor}25 100%)`,
        color: headerTextColor,
        "& svg": {
          fontSize: "1.5rem",
        },
      },
      logoText: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "1.125rem",
        color: headerTextColor,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
          maxWidth: "160px",
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
        position: "relative",
        overflow: "visible",
        [breakpoints.down("sm")]: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "none",
          cursor: "pointer",
          padding: spacing(1.25),
          color: headerTextColor,
          zIndex: 1001,
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
          position: "fixed",
          top: spacing(2),
          left: spacing(2),
          "&:active": {
            transform: "scale(0.95)",
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
      ripple: {
        position: "absolute",
        top: "50%",
        left: "50%",
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(93, 63, 211, 0.3) 0%, rgba(167, 139, 250, 0.2) 50%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: -1,
      },
      menuIcon: {
        fontSize: "1.75rem",
        color: headerTextColor,
        position: "relative",
        zIndex: 1,
        transition: "transform 0.3s ease, color 0.3s ease",
        [breakpoints.down("sm")]: {
          fontSize: "1.875rem",
        },
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

