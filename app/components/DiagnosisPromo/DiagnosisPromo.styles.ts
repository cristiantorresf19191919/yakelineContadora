import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles({ name: "DiagnosisPromo" })((theme: Theme) => {
  const { breakpoints, palette, spacing, shape } = theme;

  return {
    section: {
      padding: spacing(10, 4),
      backgroundColor: palette.background.default,
      overflow: "hidden",
      [breakpoints.down("md")]: {
        padding: spacing(6, 2),
      },
    },
    container: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: spacing(4),
      alignItems: "center",
      [breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    },
    imageWrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      "& img": {
        maxWidth: "100%",
        height: "auto",
        borderRadius: shape.borderRadius * 2,
        boxShadow: `0 20px 40px ${palette.primary.light}30`,
      },
    },
    contentWrapper: {
      padding: spacing(2),
      [breakpoints.down("md")]: {
          textAlign: "center"
      }
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: spacing(2),
      color: palette.primary.dark,
      textTransform: "uppercase",
      [breakpoints.down("lg")]: {
        fontSize: "2rem",
      },
    },
    subtitle: {
      fontSize: "1.25rem",
      fontWeight: 500,
      marginBottom: spacing(3),
      color: palette.text.secondary,
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: spacing(0, 0, 4, 0),
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: spacing(1.5),
      fontSize: "1.1rem",
      color: palette.text.primary,
      "& svg": {
        marginRight: spacing(1.5),
        color: palette.secondary.main,
      },
      [breakpoints.down("md")]: {
        justifyContent: "center"
      }
    },
    ctaContainer: {
        display: "flex",
        flexDirection: "column",
        gap: spacing(2),
        marginTop: spacing(4),
        [breakpoints.down("md")]: {
            alignItems: "center"
        }
    },
    ctaLabel: {
        fontSize: "1.2rem", 
        fontWeight: 700, 
        color: palette.text.primary
    },
    ctaButton: {
        padding: spacing(1.5, 4),
        borderRadius: 50,
        fontSize: "1rem",
        fontWeight: 700,
        textTransform: "none",
        border: `2px solid ${palette.primary.main}`,
        color: palette.primary.main,
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: palette.primary.main,
            color: "#fff",
            boxShadow: `0 10px 20px ${palette.primary.main}40`,
        }
    }
  };
});

export default useStyles;
