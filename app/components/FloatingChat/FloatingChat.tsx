"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import type { CSSProperties } from "react";
import {
  Drawer,
  IconButton,
  TextField,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { Close, SmartToy, Fullscreen, FullscreenExit, WhatsApp } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";

import styles from "./FloatingChat.module.css";
import { services, Service } from "@/data/services";

type Sender = "user" | "ai";

interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  detectedServices?: DetectedService[];
}

interface DetectedService {
  service: Service;
  whatsappUrl: string;
}

const WELCOME_MESSAGES = [
  "¡Hola! 👋 Soy tu asistente financiero. Jackeline Bot ¿Hablamos sobre cómo ordenar tus impuestos y finanzas?",
  "¡Bienvenido! 📊 Estoy aquí para ayudarte a tomar mejores decisiones tributarias y contables.",
  "Hola, soy tu aliada financiera. 💼 Cuéntame qué reto contable o fiscal quieres resolver hoy.",
  "¡Qué gusto verte! 🤝 Te acompaño en temas DIAN, planeación tributaria y finanzas empresariales.",
];

const WHATSAPP_NUMBER = "3207269417";
const ASSISTANT_AVATAR_SRC = "/photo1.jpg";

function ChatSendIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M6 4.5c0-.56.6-.92 1.08-.65l13.07 7.5c.53.31.53 1.09 0 1.4l-13.07 7.5A0.75 0.75 0 0 1 6 20.2v-4.86c0-.3.2-.56.48-.65l6.62-2.16c.7-.23.7-1.19 0-1.42l-6.62-2.16A0.68 0.68 0 0 1 6 8.34Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export function FloatingChat() {
  const theme = useTheme();
  const cssVars = useMemo(
    () =>
      ({
        "--chat-primary-main": theme.palette.primary.main,
        "--chat-primary-dark": theme.palette.primary.dark,
      }) as CSSProperties,
    [theme.palette.primary.dark, theme.palette.primary.main]
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationState, setAnimationState] =
    useState<"idle" | "pulse" | "wave" | "blink">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastActivityRef = useRef<Date>(new Date());
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUserMessageRef = useRef<string>("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (drawerOpen && messages.length === 0) {
      const welcomeMessage =
        WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
      setMessages([
        {
          id: "welcome",
          text: welcomeMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [drawerOpen, messages.length]);

  useEffect(() => {
    if (!drawerOpen) {
      const scheduleNextAnimation = () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        const now = new Date();
        const timeSinceActivity = now.getTime() - lastActivityRef.current.getTime();
        const isInactive = timeSinceActivity > 180000;

        const nextAnimationDelay = isInactive
          ? 30000 + Math.random() * 30000
          : 60000 + Math.random() * 60000;

        animationTimeoutRef.current = setTimeout(() => {
          const animations: Array<"pulse" | "wave" | "blink"> = [
            "pulse",
            "wave",
            "blink",
          ];
          const randomAnimation =
            animations[Math.floor(Math.random() * animations.length)];
          setAnimationState(randomAnimation);

          setTimeout(() => {
            setAnimationState("idle");
            scheduleNextAnimation();
          }, 2000);
        }, nextAnimationDelay);
      };

      scheduleNextAnimation();

      return () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    }

    setAnimationState("idle");
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, [drawerOpen]);

  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = new Date();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, []);

  const detectServices = useCallback(
    (text: string, userContext: string): DetectedService[] => {
      const detected: DetectedService[] = [];
      const normalizedText = text.toLowerCase();

      services.forEach((service) => {
        const serviceName = service.name.toLowerCase();
        const hasName = normalizedText.includes(serviceName);

        const keywordMatch = service.keywords.some((keyword) =>
          normalizedText.includes(keyword.toLowerCase())
        );

        if (hasName || keywordMatch) {
          const filledPrompt = service.whatsappPrompt.replace(
            "{userMessage}",
            userContext || "Necesito orientación tributaria y contable."
          );
          const whatsappUrl = `https://wa.me/57${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            filledPrompt
          )}`;

          if (!detected.find((item) => item.service.id === service.id)) {
            detected.push({
              service,
              whatsappUrl,
            });
          }
        }
      });

      return detected;
    },
    []
  );

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) {
      return;
    }

    const trimmed = inputMessage.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    const historyWithCurrent = [...messages, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    lastActivityRef.current = new Date();
    lastUserMessageRef.current = trimmed;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: historyWithCurrent.map((message) => ({
            role: message.sender === "user" ? "user" : "assistant",
            parts: [{ text: message.text }],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener la respuesta.");
      }

      const data = await response.json();

      const responseText =
        data.response ||
        "Lo siento, no pude procesar tu mensaje. Intentemos nuevamente.";

      const detectedServices = detectServices(
        `${userMessage.text} ${responseText}`,
        lastUserMessageRef.current
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
        detectedServices: detectedServices.length > 0 ? detectedServices : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    lastActivityRef.current = new Date();
  };

  const handleToggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <>
      <motion.button
        className={`${styles.floatingButton} ${styles[animationState]}`}
        onClick={handleDrawerOpen}
        whileHover={{ 
          scale: 1.1,
        }}
        whileTap={{ scale: 0.96 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        aria-label="Abrir chat de asesor financiero"
        style={cssVars}
      >
        <motion.div
          animate={{
            rotate: animationState === "wave" ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: animationState === "wave" ? Infinity : 0,
            ease: "easeInOut",
            type: "tween",
          }}
        >
          <SmartToy className={styles.chatIcon} />
        </motion.div>
        {animationState !== "idle" && (
          <motion.div
            className={styles.ripple}
            animate={{
              scale: [1, 2.2, 2.8],
              opacity: [0.5, 0.3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        transitionDuration={400}
        PaperProps={{
          className: `${styles.drawer} ${isMaximized ? styles.maximized : ""}`,
          sx: {
            width: isMaximized ? "100%" : { xs: "100%", sm: 440 },
            maxWidth: "100vw",
            backgroundColor: "#ffffff",
            borderLeft: "none",
            boxShadow: isMaximized 
              ? "none" 
              : "-8px 0 32px rgba(139, 92, 246, 0.15), -4px 0 16px rgba(124, 58, 237, 0.1)",
            height: "100vh",
            zIndex: isMaximized ? 1400 : 1200,
            display: "flex",
            flexDirection: "column",
          },
          style: cssVars,
        }}
      >
        <Box className={styles.header} style={cssVars}>
          <Box className={styles.headerContent}>
            <Avatar
              className={styles.headerAvatar}
              alt="Yakeline Contadora"
              src={ASSISTANT_AVATAR_SRC}
            />
            <Box>
              <Typography className={styles.headerTitle}>
                Asistente Financiero Yakeline
              </Typography>
              <Typography className={styles.headerSubtitle}>
                Resolvemos tus dudas tributarias y contables
              </Typography>
            </Box>
          </Box>
          <Box className={styles.headerActions}>
            <IconButton
              onClick={handleToggleMaximize}
              className={styles.headerButton}
              size="small"
              aria-label={isMaximized ? "Restaurar ventana" : "Maximizar ventana"}
            >
              {isMaximized ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              className={styles.headerButton}
              size="small"
              aria-label="Cerrar chat"
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Box className={styles.messagesContainer}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05,
                }}
                className={`${styles.messageWrapper} ${styles[message.sender]}`}
              >
                <Box className={styles.messageContainer}>
                  <Avatar
                    className={`${styles.messageAvatar} ${styles[message.sender]}`}
                    alt={message.sender === "user" ? "Tú" : "Yakeline Contadora"}
                    src={message.sender === "ai" ? ASSISTANT_AVATAR_SRC : undefined}
                  >
                    {message.sender === "user" ? "Tú" : null}
                  </Avatar>
                  <Box className={`${styles.messageBubble} ${styles[message.sender]}`}>
                    <Typography className={styles.messageText}>
                      {message.text}
                    </Typography>
                    {message.detectedServices && (
                      <Box className={styles.serviceChips}>
                        {message.detectedServices.map((detected, idx) => (
                          <motion.div
                            key={detected.service.id}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              delay: idx * 0.1,
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <Box
                              className={styles.serviceCard}
                              style={cssVars}
                            >
                            <Chip
                              label={detected.service.name}
                              className={styles.serviceChip}
                              sx={{
                                background:
                                  "linear-gradient(135deg, var(--chat-primary-dark) 0%, var(--chat-primary-main) 100%)",
                                color: "white",
                              }}
                            />
                            <Typography component="p" className={styles.serviceDescription}>
                              {detected.service.summary}
                            </Typography>
                            <Box className={styles.serviceActions}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="contained"
                                  startIcon={<WhatsApp />}
                                  onClick={() => window.open(detected.whatsappUrl, "_blank")}
                                  sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "999px",
                                    paddingX: 2.4,
                                    paddingY: 1.2,
                                    background: "linear-gradient(135deg, #25D366 0%, #1EB358 100%)",
                                    boxShadow: "0 4px 16px rgba(37, 211, 102, 0.3)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": {
                                      background: "linear-gradient(135deg, #1EB358 0%, #25D366 100%)",
                                      boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  Continuar por WhatsApp
                                </Button>
                              </motion.div>
                            </Box>
                          </Box>
                          </motion.div>
                        ))}
                      </Box>
                    )}
                    <Typography className={styles.messageTimestamp}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box className={styles.loadingIndicator}>
                <Box className={styles.loadingContainer}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <CircularProgress size={20} className={styles.loadingSpinner} />
                  </motion.div>
                  <Typography className={styles.loadingText}>Analizando...</Typography>
                </Box>
              </Box>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </Box>

        <Box className={styles.inputContainer}>
          <Box className={styles.inputWrapper}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Cuéntame tu duda financiera o tributaria..."
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className={styles.chatInput}
              InputProps={{
                sx: {
                  backgroundColor: "white",
                  borderRadius: "16px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& fieldset": {
                    borderColor: "rgba(139, 92, 246, 0.2)",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(139, 92, 246, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B5CF6",
                    borderWidth: "2px",
                    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                  },
                },
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={styles.sendButton}
                sx={{
                  background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 16px rgba(139, 92, 246, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #9F7AEA 0%, #8B5CF6 50%, #7C3AED 100%)",
                    boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  "& svg": {
                    fontSize: 26,
                    color: "white",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                  },
                  "&.Mui-disabled": {
                    background: "rgba(139, 92, 246, 0.2)",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled svg": {
                    color: "rgba(139, 92, 246, 0.4)",
                  },
                }}
              >
                <ChatSendIcon />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

