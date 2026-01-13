import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "LanguageSwitch" })(
  (theme: Theme) => {
    const { breakpoints, spacing, palette } = theme;
    return {
      container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: spacing(3),
        [breakpoints.down("sm")]: {
          marginBottom: spacing(2),
        },
      },
      buttonGroup: {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${palette.divider}`,
      },
      button: {
        minWidth: 60,
        padding: spacing(1, 2),
        fontSize: "0.875rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: palette.text.secondary,
        backgroundColor: palette.background.paper,
        border: "none",
        "&:hover": {
          backgroundColor: palette.action.hover,
          border: "none",
        },
        "&:not(:last-child)": {
          borderRight: `1px solid ${palette.divider}`,
        },
        transition: "all 0.2s ease",
      },
      active: {
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        "&:hover": {
          backgroundColor: palette.primary.dark,
        },
      },
    };
  }
);

export default useStyles;
