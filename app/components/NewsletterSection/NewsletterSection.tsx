"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
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
      <motion.div
        className={classes.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box className={classes.accentBlobTop} />
        <Box className={classes.accentBlobBottom} />

        <motion.div
          className={classes.copy}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className={classes.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            newsletter exclusiva
          </motion.div>
          <Typography className={classes.heading}>
            ¡Suscríbete y recibe insights financieros diseñados para ti!
          </Typography>
          <Typography className={classes.subheading}>
            Cada semana comparto novedades del sector financiero en Colombia,
            recomendaciones aplicables a tu negocio y herramientas prácticas
            para tomar mejores decisiones contables y tributarias.
          </Typography>

          <Box className={classes.highlights}>
            {["Actualizaciones clave", "Consejos accionables", "Recursos descargables"].map((text, index) => (
              <motion.div
                key={text}
                className={classes.highlightChip}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {text}
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <motion.div
          className={classes.formWrapper}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Box className={classes.formCard}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "#5B21B6", 
                fontWeight: 600,
                fontSize: "1.125rem",
                lineHeight: 1.5,
              }}
            >
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
              <motion.div
                className={cx(classes.statusMessage, {
                  success: status === "success",
                  error: status === "error",
                })}
                role={status === "error" ? "alert" : "status"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {status === "success" ? (
                  <CheckCircleRoundedIcon fontSize="small" />
                ) : (
                  <ErrorRoundedIcon fontSize="small" />
                )}
                {statusMessage}
              </motion.div>
            )}
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}

