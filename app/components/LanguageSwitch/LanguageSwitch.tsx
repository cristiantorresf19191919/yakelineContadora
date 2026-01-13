"use client";

import { Box, Button, ButtonGroup } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useStyles from "./LanguageSwitch.styles";

type Language = "es" | "en";

export default function LanguageSwitch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLang = (searchParams.get("lang") || "es") as Language;
  const { classes } = useStyles();

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      const params = new URLSearchParams(searchParams.toString());
      if (lang === "es") {
        params.delete("lang");
      } else {
        params.set("lang", lang);
      }
      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(`/blog${newUrl}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Box className={classes.container}>
      <ButtonGroup
        variant="outlined"
        aria-label="Language switcher"
        className={classes.buttonGroup}
      >
        <Button
          onClick={() => handleLanguageChange("es")}
          className={`${classes.button} ${currentLang === "es" ? classes.active : ""}`}
          aria-pressed={currentLang === "es"}
        >
          ES
        </Button>
        <Button
          onClick={() => handleLanguageChange("en")}
          className={`${classes.button} ${currentLang === "en" ? classes.active : ""}`}
          aria-pressed={currentLang === "en"}
        >
          EN
        </Button>
      </ButtonGroup>
    </Box>
  );
}
