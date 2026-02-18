"use client";

import { Box } from "@mui/material";

type DividerVariant = "wave" | "curve" | "tilt";

interface SectionDividerProps {
  variant?: DividerVariant;
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
}

const paths: Record<DividerVariant, string> = {
  wave: "M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,160 L0,160 Z",
  curve: "M0,128 Q720,0 1440,128 L1440,160 L0,160 Z",
  tilt: "M0,96 L1440,32 L1440,160 L0,160 Z",
};

export default function SectionDivider({
  variant = "wave",
  topColor = "transparent",
  bottomColor = "#FFFFFF",
  flip = false,
}: SectionDividerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        lineHeight: 0,
        overflow: "hidden",
        transform: flip ? "rotate(180deg)" : "none",
        mt: -0.5,
        mb: -0.5,
        bgcolor: topColor,
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "auto", display: "block", minHeight: 40, maxHeight: 80 }}
      >
        <path d={paths[variant]} fill={bottomColor} />
      </svg>
    </Box>
  );
}
