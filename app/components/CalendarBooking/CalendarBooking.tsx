"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateClickArg } from "@fullcalendar/interaction";
import Image from "next/image";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { bookAppointment } from "@/lib/appointments/booking";
import styles from "./CalendarBooking.module.css";

const SERVICES = [
  "Declaración de Renta",
  "Asesoría Contable",
  "Gestión Tributaria",
  "Revisoría Fiscal",
  "Consultoría Financiera",
  "Mentoría Personalizada",
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CalendarBooking() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    service: "",
    message: "",
  });

  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    const d = new Date(selectedDate + "T12:00:00");
    return d.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const clicked = new Date(arg.dateStr + "T12:00:00");

      if (clicked < today) return;

      const dayOfWeek = clicked.getDay();
      if (dayOfWeek === 0) return;

      setSelectedDate(arg.dateStr);
      setDialogOpen(true);
      setFormStatus("idle");
      setErrorMsg("");
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!form.name || !form.email || !form.phone || !form.time || !form.service) {
      setErrorMsg("Por favor completa todos los campos obligatorios.");
      setFormStatus("error");
      return;
    }

    setFormStatus("loading");
    setErrorMsg("");

    try {
      await bookAppointment({
        ...form,
        date: selectedDate,
      });
      setFormStatus("success");
      setForm({ name: "", email: "", phone: "", time: "", service: "", message: "" });
    } catch {
      setErrorMsg("Hubo un error al agendar tu cita. Intenta nuevamente.");
      setFormStatus("error");
    }
  }, [form, selectedDate]);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    if (formStatus === "success") {
      setFormStatus("idle");
    }
  }, [formStatus]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #F3EEFF 40%, #FAFAFA 100%)",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 14 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Chip
            icon={<CalendarMonthRoundedIcon />}
            label="Agenda tu Consulta"
            sx={{
              mb: 3,
              px: 2,
              py: 2.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
              color: "white",
              "& .MuiChip-icon": { color: "white" },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              color: "#1F2937",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Reserva tu Cita con{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #5D3FD3 0%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Yakeline
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "#6B7280",
              fontSize: { xs: "1rem", md: "1.15rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Selecciona una fecha en el calendario y agenda tu consulta personalizada.
            Tu tranquilidad financiera comienza con una conversación.
          </Typography>
        </motion.div>
      </Box>

      {/* Main Content: Photo + Calendar */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pb: { xs: 6, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 5 },
          alignItems: { xs: "center", md: "stretch" },
        }}
      >
        {/* Left: Photo & Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ flex: isMobile ? "unset" : "0 0 42%", width: isMobile ? "100%" : "auto" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(93, 63, 211, 0.15), 0 8px 24px rgba(0,0,0,0.08)",
              height: { xs: 400, md: "100%" },
              minHeight: { md: 520 },
            }}
          >
            <Image
              src="/calendarPicture.png"
              alt="Yakeline - Contadora Profesional"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "55%",
                background:
                  "linear-gradient(to top, rgba(93, 63, 211, 0.92) 0%, rgba(93, 63, 211, 0.4) 60%, transparent 100%)",
              }}
            />
            {/* Info on photo */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: { xs: 2.5, md: 3.5 },
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.4rem", md: "1.7rem" },
                  mb: 1,
                  textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                Yakeline Contadora
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#FCD34D" }} />
                <Typography sx={{ fontSize: "0.9rem", opacity: 0.95 }}>
                  Contadora Pública Certificada
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarRoundedIcon key={star} sx={{ fontSize: 18, color: "#FCD34D" }} />
                ))}
                <Typography sx={{ fontSize: "0.85rem", ml: 0.5, opacity: 0.9 }}>
                  5.0 - Clientes satisfechos
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {["Tributaria", "Contable", "Financiera"].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Right: Calendar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ flex: 1, width: "100%", minWidth: 0 }}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: "24px",
              p: { xs: 2, sm: 3, md: 3.5 },
              boxShadow: "0 12px 40px rgba(93, 63, 211, 0.08), 0 4px 16px rgba(0,0,0,0.04)",
              border: "1px solid rgba(93, 63, 211, 0.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2.5,
                pb: 2,
                borderBottom: "1px solid rgba(93, 63, 211, 0.08)",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(93, 63, 211, 0.3)",
                }}
              >
                <CalendarMonthRoundedIcon sx={{ color: "white", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#1F2937",
                  }}
                >
                  Selecciona una Fecha
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                  Lunes a Sábado - Horarios disponibles
                </Typography>
              </Box>
            </Box>

            <Box className={styles.calendarWrapper} sx={{ flex: 1 }}>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                locale="es"
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next",
                }}
                height="auto"
                fixedWeekCount={false}
                dayMaxEvents={true}
                selectable={true}
                buttonText={{
                  today: "Hoy",
                }}
              />
            </Box>

            {/* Quick Info */}
            <Box
              sx={{
                mt: 2.5,
                pt: 2,
                borderTop: "1px solid rgba(93, 63, 211, 0.08)",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {[
                { icon: <AccessTimeRoundedIcon />, text: "Consulta 45 min" },
                { icon: <CalendarMonthRoundedIcon />, text: "Lun - Sáb" },
                { icon: <CheckCircleRoundedIcon />, text: "Confirmación inmediata" },
              ].map((item) => (
                <Box
                  key={item.text}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    color: "#6B7280",
                    fontSize: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#5D3FD3", fontSize: 18, display: "flex" }}>{item.icon}</Box>
                  <Typography sx={{ fontSize: "0.8rem" }}>{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Booking Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : "24px",
            overflow: "hidden",
          },
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
            color: "white",
            px: 3,
            py: 2.5,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "white",
              background: "rgba(255,255,255,0.15)",
              "&:hover": { background: "rgba(255,255,255,0.25)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          <DialogTitle
            sx={{
              p: 0,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.4rem",
            }}
          >
            {formStatus === "success" ? "Cita Agendada" : "Agendar Consulta"}
          </DialogTitle>
          {selectedDate && formStatus !== "success" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: "0.9rem", opacity: 0.95, textTransform: "capitalize" }}>
                {formattedDate}
              </Typography>
            </Box>
          )}
        </Box>

        <AnimatePresence mode="wait">
          {formStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DialogContent sx={{ textAlign: "center", py: 5 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 72, color: "#10B981", mb: 2 }}
                  />
                </motion.div>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#1F2937",
                    mb: 1,
                  }}
                >
                  Tu cita ha sido agendada
                </Typography>
                <Typography sx={{ color: "#6B7280", mb: 3, lineHeight: 1.7 }}>
                  Te confirmaremos por WhatsApp o correo electrónico.
                  <br />
                  Gracias por confiar en nosotros.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Cerrar
                </Button>
              </DialogContent>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogContent sx={{ pt: 3, pb: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    name="name"
                    label="Nombre completo *"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                  <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <TextField
                      name="email"
                      label="Correo electrónico *"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                    <TextField
                      name="phone"
                      label="Teléfono / WhatsApp *"
                      value={form.phone}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <TextField
                      name="service"
                      label="Servicio *"
                      value={form.service}
                      onChange={handleChange}
                      select
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    >
                      {SERVICES.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      name="time"
                      label="Hora *"
                      value={form.time}
                      onChange={handleChange}
                      select
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    >
                      {TIME_SLOTS.map((t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <TextField
                    name="message"
                    label="Mensaje adicional (opcional)"
                    value={form.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                  />
                  {formStatus === "error" && (
                    <Typography sx={{ color: "#EF4444", fontSize: "0.85rem", textAlign: "center" }}>
                      {errorMsg}
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3, pt: 1, flexDirection: "column", gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={formStatus === "loading"}
                  sx={{
                    borderRadius: "50px",
                    py: 1.3,
                    background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 16px rgba(93, 63, 211, 0.35)",
                    "&:hover": {
                      boxShadow: "0 6px 24px rgba(93, 63, 211, 0.45)",
                    },
                  }}
                  startIcon={
                    formStatus === "loading" ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      <CalendarMonthRoundedIcon />
                    )
                  }
                >
                  {formStatus === "loading" ? "Agendando..." : "Confirmar Cita"}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  href="https://wa.me/573207269417?text=Hola%20Yakeline%2C%20quiero%20agendar%20una%20consulta"
                  target="_blank"
                  sx={{
                    borderRadius: "50px",
                    py: 1.1,
                    color: "#25D366",
                    borderColor: "#25D366",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      background: "rgba(37, 211, 102, 0.06)",
                      borderColor: "#25D366",
                    },
                  }}
                  startIcon={<WhatsAppIcon />}
                >
                  Agendar por WhatsApp
                </Button>
              </DialogActions>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </Box>
  );
}
