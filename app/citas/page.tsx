"use client";

import { Suspense, useRef, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import CalendarBooking from "@/app/components/CalendarBooking/CalendarBooking";
import ServicePackages from "@/app/components/ServicePackages/ServicePackages";
import Footer from "@/app/components/Footer/Footer";

export default function CitasPage() {
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleSelectPackage = useCallback(() => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <ServicePackages onSelectPackage={handleSelectPackage} />
      <Box ref={calendarRef}>
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
      </Box>
      <Footer />
    </>
  );
}
