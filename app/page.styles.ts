import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: "HomePage" })(
  (theme) => {
    const { breakpoints, spacing } = theme;
    return {
      root: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        fontFamily: theme.typography.fontFamily,
        [breakpoints.down("sm")]: {
          backgroundColor: "#ffffff",
        },
      },
      main: {
        minHeight: "100vh",
        width: "100%",
        maxWidth: breakpoints.values.md,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: spacing(8, 4),
        backgroundColor: "#ffffff",
        [breakpoints.up("md")]: {
          alignItems: "flex-start",
          padding: spacing(8, 8),
        },
      },
      title: {
        fontSize: "2.5rem",
        fontWeight: 700,
        marginBottom: spacing(2),
      },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing(3),
        textAlign: "center",
        marginTop: spacing(4),
        [breakpoints.up("sm")]: {
          alignItems: "flex-start",
          textAlign: "left",
        },
      },
      heading: {
        maxWidth: 320,
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.2,
        color: "#000000",
      },
      description: {
        maxWidth: 448,
        fontSize: "1.125rem",
        lineHeight: 1.5,
        color: "#525252",
      },
      link: {
        fontWeight: 500,
        color: "#09090b",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: spacing(2),
        fontSize: "1rem",
        fontWeight: 500,
        marginTop: spacing(4),
        [breakpoints.up("sm")]: {
          flexDirection: "row",
        },
      },
      primaryButton: {
        display: "flex",
        height: 48,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(1),
        borderRadius: "9999px",
        backgroundColor: "#09090b",
        color: "#ffffff",
        padding: spacing(0, 3),
        textDecoration: "none",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#383838",
        },
        [breakpoints.up("md")]: {
          width: 158,
        },
      },
      secondaryButton: {
        display: "flex",
        height: 48,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        padding: spacing(0, 3),
        textDecoration: "none",
        transition: "all 0.2s",
        color: "#09090b",
        "&:hover": {
          borderColor: "transparent",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        [breakpoints.up("md")]: {
          width: 158,
        },
      },
      logo: {
        filter: "invert(0)",
      },
    };
  }
);

export default useStyles;

