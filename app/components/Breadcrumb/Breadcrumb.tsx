"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import useStyles from "./Breadcrumb.styles";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  sticky?: boolean;
}

export default function Breadcrumb({ items, sticky = false }: BreadcrumbProps) {
  const { classes } = useStyles();

  return (
    <Box
      component="nav"
      className={classes.breadcrumb}
      style={sticky ? { position: "sticky", top: 0 } : {}}
      aria-label="Breadcrumb"
    >
      <Box className={classes.container}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Box key={index} component="span" sx={{ display: "flex", alignItems: "center" }}>
              {isLast ? (
                <Typography className={classes.current}>{item.label}</Typography>
              ) : (
                <>
                  <Link href={item.href || "#"} className={classes.link}>
                    {item.label}
                  </Link>
                  {!isLast && (
                    <Typography component="span" className={classes.separator}>
                      /
                    </Typography>
                  )}
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

