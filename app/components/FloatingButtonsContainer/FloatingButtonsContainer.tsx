"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FloatingChat } from "../FloatingChat/FloatingChat";
import FloatingWhatsApp from "../FloatingWhatsApp/FloatingWhatsApp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FloatingButtonsContainer.module.css";

export function FloatingButtonsContainer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isExpanded, setIsExpanded] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const toggleExpanded = () => {
    setRippleKey((prev) => prev + 1);
    setIsExpanded(!isExpanded);
  };

  // Desktop: show buttons normally
  if (!isMobile) {
    return (
      <>
        <FloatingChat />
        <FloatingWhatsApp />
      </>
    );
  }

  // Mobile: show expandable container
  const buttonsVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const chatButtonVariants = {
    closed: {
      opacity: 0,
      scale: 0.5,
      y: 40,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const whatsappButtonVariants = {
    closed: {
      opacity: 0,
      scale: 0.5,
      y: 40,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Expand Button - Always visible on mobile */}
      <motion.button
        className={styles.expandButton}
        onClick={toggleExpanded}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        aria-label={isExpanded ? "Cerrar botones" : "Abrir botones"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={rippleKey}
            className={styles.ripple}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ width: 0, height: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </AnimatePresence>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <CloseIcon className={styles.expandIcon} />
          ) : (
            <ChatBubbleOutlineIcon className={styles.expandIcon} />
          )}
        </motion.div>
      </motion.button>

      {/* Buttons Container - No overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.buttonsContainer}
            variants={buttonsVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              variants={chatButtonVariants}
              initial="closed"
              animate="open"
              className={styles.buttonWrapper}
            >
              <Box
                onClick={() => setIsExpanded(false)}
                sx={{
                  "& > *": {
                    position: "relative !important",
                    bottom: "auto !important",
                    right: "auto !important",
                  },
                }}
              >
                <FloatingChat />
              </Box>
            </motion.div>

            <motion.div
              variants={whatsappButtonVariants}
              initial="closed"
              animate="open"
              className={styles.buttonWrapper}
            >
              <Box
                sx={{
                  "& > *": {
                    position: "relative !important",
                    bottom: "auto !important",
                    right: "auto !important",
                  },
                }}
              >
                <FloatingWhatsApp />
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
