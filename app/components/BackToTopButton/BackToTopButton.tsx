"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Box
            component="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(93, 63, 211, 0.4), 0 2px 8px rgba(93, 63, 211, 0.2)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 32px rgba(93, 63, 211, 0.5), 0 4px 12px rgba(93, 63, 211, 0.3)",
              },
              "&:active": {
                transform: "translateY(-1px)",
              },
            }}
          >
            <KeyboardArrowUpRoundedIcon fontSize="medium" />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
