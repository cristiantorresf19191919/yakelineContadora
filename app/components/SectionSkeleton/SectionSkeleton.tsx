"use client";

import { Box } from "@mui/material";

/**
 * Themed placeholder shown while a code-split (next/dynamic ssr:false) section
 * loads, so below-the-fold sections fade in instead of popping/shifting layout.
 * Uses mood tokens so it looks right in every theme. The shimmer respects
 * prefers-reduced-motion via the global reduced-motion rule.
 */
export default function SectionSkeleton() {
  return (
    <Box
      aria-hidden
      sx={{ py: { xs: 8, md: 12 }, display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "min(90%, 820px)",
          height: { xs: 260, md: 320 },
          borderRadius: "var(--r-lg)",
          background:
            "linear-gradient(90deg, var(--surface-muted) 25%, rgba(var(--brand-primary-rgb), 0.06) 50%, var(--surface-muted) 75%)",
          backgroundSize: "200% 100%",
          animation: "yc-shimmer 1.4s ease-in-out infinite",
        }}
      />
    </Box>
  );
}
