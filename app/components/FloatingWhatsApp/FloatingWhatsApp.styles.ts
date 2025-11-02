import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "FloatingWhatsApp" })(
  (theme: Theme) => {
    const { breakpoints, spacing } = theme;
    return {
      floatingButton: {
        position: "fixed",
        bottom: spacing(3),
        right: spacing(3),
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        cursor: "pointer",
        zIndex: 999,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: "pulse 2s ease-in-out infinite, fadeInScale 0.5s ease-out",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 6px 30px rgba(37, 211, 102, 0.6)",
          backgroundColor: "#20BA5A",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
        [breakpoints.down("sm")]: {
          width: 56,
          height: 56,
          bottom: spacing(2),
          right: spacing(2),
        },
      },
      icon: {
        color: "#FFFFFF",
        fontSize: "2rem",
        [breakpoints.down("sm")]: {
          fontSize: "1.75rem",
        },
      },
      tooltip: {
        position: "absolute",
        right: "calc(100% + 12px)",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "#FFFFFF",
        color: "#25D366",
        padding: spacing(1, 1.5),
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          border: `6px solid transparent`,
          borderLeftColor: "#FFFFFF",
        },
        [breakpoints.down("md")]: {
          display: "none",
        },
      },
      tooltipVisible: {
        opacity: 1,
        transform: "translateY(-50%) translateX(-4px)",
      },
      "@keyframes pulse": {
        "0%, 100%": {
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        },
        "50%": {
          boxShadow: "0 4px 30px rgba(37, 211, 102, 0.6)",
        },
      },
      "@keyframes fadeInScale": {
        from: {
          opacity: 0,
          transform: "scale(0)",
        },
        to: {
          opacity: 1,
          transform: "scale(1)",
        },
      },
    };
  }
);

export default useStyles;

