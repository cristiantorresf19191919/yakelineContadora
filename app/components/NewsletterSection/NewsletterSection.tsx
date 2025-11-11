"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import useStyles from "./NewsletterSection.styles";
import { subscribeToNewsletter } from "@/lib/newsletter/subscription";

type SubmissionState = "idle" | "loading" | "success" | "error";

export default function NewsletterSection() {
  const { classes, cx } = useStyles();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isSubmitDisabled = useMemo(() => {
    if (!email.trim()) return true;
    const emailRegex =
      /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return !emailRegex.test(email.trim());
  }, [email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitDisabled || status === "loading") return;

      setStatus("loading");
      setStatusMessage("");

      try {
        await subscribeToNewsletter(email.trim());
        setStatus("success");
        setStatusMessage(
          "¡Te has suscrito con éxito! Pronto recibirás novedades llenas de valor."
        );
        setEmail("");
      } catch (error) {
        console.error("Newsletter subscription failed:", error);
        setStatus("error");
        setStatusMessage(
          "Ups, algo salió mal al intentar suscribirte. Intenta de nuevo en unos segundos."
        );
      }
    },
    [email, isSubmitDisabled, status]
  );

  return (
    <Box component="section" className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.accentBlobTop} />
        <Box className={classes.accentBlobBottom} />

        <Box className={classes.copy}>
          <Box className={classes.badge}>newsletter exclusiva</Box>
          <Typography className={classes.heading}>
            ¡Suscríbete y recibe insights financieros diseñados para ti!
          </Typography>
          <Typography className={classes.subheading}>
            Cada semana comparto novedades del sector financiero en Colombia,
            recomendaciones aplicables a tu negocio y herramientas prácticas
            para tomar mejores decisiones contables y tributarias.
          </Typography>

          <Box className={classes.highlights}>
            <Box className={classes.highlightChip}>Actualizaciones clave</Box>
            <Box className={classes.highlightChip}>Consejos accionables</Box>
            <Box className={classes.highlightChip}>Recursos descargables</Box>
          </Box>
        </Box>

        <Box className={classes.formWrapper}>
          <Box className={classes.formCard}>
            <Typography variant="subtitle1" color="#6F4F33" fontWeight={600}>
              Une tu correo y recibe contenidos que simplifican tus finanzas.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className={classes.form}>
              <TextField
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Escribe tu correo"
                type="email"
                fullWidth
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  className: classes.textFieldRoot,
                }}
                inputProps={{
                  "aria-label": "Correo electrónico",
                  required: true,
                }}
              />
              <Button
                type="submit"
                className={classes.submitButton}
                disabled={isSubmitDisabled || status === "loading"}
              >
                {status === "loading" ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Suscribirme"
                )}
              </Button>
            </Box>

            <Box className={classes.assurance}>
              <Box className={classes.lockIcon}>
                <LockRoundedIcon fontSize="small" />
              </Box>
              <Typography component="span">
                Cuidamos tu privacidad. Solo recibirás contenido relevante y
                podrás darte de baja cuando quieras.
              </Typography>
            </Box>

            {status !== "idle" && statusMessage && (
              <Box
                className={cx(classes.statusMessage, {
                  success: status === "success",
                  error: status === "error",
                })}
                role={status === "error" ? "alert" : "status"}
              >
                {status === "success" ? (
                  <CheckCircleRoundedIcon fontSize="small" />
                ) : (
                  <ErrorRoundedIcon fontSize="small" />
                )}
                {statusMessage}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

