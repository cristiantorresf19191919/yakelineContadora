"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Box } from "@mui/material";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "transparent",
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          height: "100%",
          background: "linear-gradient(90deg, #5D3FD3 0%, #A78BFA 40%, #F59E0B 100%)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 10px rgba(93, 63, 211, 0.5), 0 0 5px rgba(245, 158, 11, 0.3)",
        }}
      />
    </Box>
  );
}
