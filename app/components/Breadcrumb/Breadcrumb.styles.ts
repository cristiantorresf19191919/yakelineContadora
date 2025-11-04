import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "Breadcrumb" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      breadcrumb: {
        backgroundColor: "#FFFFFF",
        padding: spacing(2, 6),
        borderBottom: "1px solid rgba(139, 115, 85, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 999,
        [breakpoints.down("md")]: {
          padding: spacing(2, 4),
        },
        [breakpoints.down("sm")]: {
          padding: spacing(1.5, 2),
        },
      },
      container: {
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        gap: spacing(1),
        flexWrap: "wrap",
      },
      link: {
        color: "#8B7355",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: 400,
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#6F5B40",
          textDecoration: "underline",
        },
      },
      separator: {
        color: "#8B7355",
        fontSize: "0.875rem",
        margin: spacing(0, 0.5),
        opacity: 0.6,
      },
      current: {
        color: "#4A3728",
        fontSize: "0.875rem",
        fontWeight: 500,
      },
    };
  }
);

export default useStyles;

