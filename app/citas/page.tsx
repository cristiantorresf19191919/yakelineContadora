"use client";

import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import CalendarBooking from "@/app/components/CalendarBooking/CalendarBooking";
import Footer from "@/app/components/Footer/Footer";

export default function CitasPage() {
  return (
    <>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <CircularProgress sx={{ color: "#5D3FD3" }} />
          </Box>
        }
      >
        <CalendarBooking />
      </Suspense>
      <Footer />
    </>
  );
}
