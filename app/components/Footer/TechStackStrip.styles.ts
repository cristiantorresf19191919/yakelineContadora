import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

/* The strip lives on the footer's fixed deep-violet gradient (identical in
   every theme mood), so it uses the footer's own soft-violet text palette
   instead of the theme tokens — brand logos keep their official colors. */
const useStyles = makeStyles({ name: "TechStackStrip" })((theme: Theme) => {
  const { spacing, breakpoints } = theme;
  const label = "rgba(243, 229, 244, 0.5)";
  const name = "rgba(243, 229, 244, 0.72)";
  const line = "rgba(198, 168, 230, 0.55)";

  return {
    root: {
      maxWidth: 1200,
      margin: "0 auto",
      marginTop: spacing(8),
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      columnGap: spacing(4),
      rowGap: spacing(5),
      [breakpoints.down("md")]: {
        marginTop: spacing(6),
      },
    },
    group: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing(2.5),
      flex: "0 1 auto",
      minWidth: 220,
      [breakpoints.up("md")]: {
        padding: spacing(0, 4),
        "& + &": {
          borderLeft: "1px solid rgba(246, 235, 249, 0.1)",
        },
      },
    },
    groupLabel: {
      position: "relative",
      width: "100%",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "0.68rem",
      fontWeight: 600,
      letterSpacing: 4,
      color: label,
      paddingBottom: spacing(1.75),
      // Hairline that fades out at both ends…
      "&::after": {
        content: '""',
        position: "absolute",
        left: "8%",
        right: "8%",
        bottom: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${line} 50%, transparent)`,
      },
      // …with a soft spark of light at its center, like a lens flare.
      "&::before": {
        content: '""',
        position: "absolute",
        left: "50%",
        bottom: -2,
        width: 48,
        height: 5,
        transform: "translateX(-50%)",
        borderRadius: "var(--r-pill)",
        background:
          "radial-gradient(closest-side, rgba(230, 212, 249, 0.8), transparent)",
        filter: "blur(1.5px)",
      },
    },
    iconRow: {
      listStyle: "none",
      display: "flex",
      justifyContent: "center",
      gap: spacing(4),
      margin: 0,
      padding: 0,
      [breakpoints.down("sm")]: {
        gap: spacing(3.5),
      },
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing(1.25),
      // The lift + brand-colored glow only makes sense with a real pointer.
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover .yc-tech-icon": {
          transform: "translateY(-5px) scale(1.08)",
          filter:
            "drop-shadow(0 10px 22px color-mix(in srgb, var(--tech-color) 45%, transparent))",
        },
        "&:hover .yc-tech-name": {
          color: "#FFFFFF",
        },
      },
    },
    icon: {
      display: "grid",
      placeItems: "center",
      width: 44,
      height: 44,
      color: "var(--tech-color)",
      filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35))",
      transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s ease",
      "& svg": {
        width: 34,
        height: 34,
        display: "block",
      },
    },
    itemName: {
      fontSize: "0.76rem",
      fontWeight: 500,
      letterSpacing: 0.2,
      color: name,
      transition: "color 0.25s ease",
      whiteSpace: "nowrap",
    },
  };
});

export default useStyles;
