"use client";

import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { InstagramEmbed } from "react-social-media-embed";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./HomeVideoSection.styles";
import { instagramVideos } from "@/data/instagramVideos";

export default function HomeVideoSection() {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Show 1 video on mobile, 3 videos on desktop
  const videoCount = isMobile ? 1 : 3;
  const displayVideos = instagramVideos.slice(0, videoCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring" as const,
        damping: 20,
        stiffness: 100 
      },
    },
  } as const;

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={classes.headerWrapper}
        >
          <Typography className={classes.subTitle}>
            Contenido Exclusivo
          </Typography>
          <Typography variant="h2" className={classes.title}>
            Videos Recientes
          </Typography>
          <Typography className={classes.description}>
            Descubre consejos prácticos para optimizar tus impuestos y potenciar tu libertad financiera.
          </Typography>
        </motion.div>

        <motion.div
          className={classes.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayVideos.map((url, index) => (
            <motion.div key={index} variants={itemVariants} className={classes.card}>
              <Box className={classes.videoWrapper}>
                <Box className={classes.embedContainer}>
                  <InstagramEmbed 
                    url={url} 
                    width="100%" 
                  />
                </Box>
              </Box>
            </motion.div>
          ))}
        </motion.div>

        <Box className={classes.ctaWrapper}>
          <Link href="/videos" passHref>
            <Button 
              className={classes.ctaButton}
              endIcon={<ArrowForwardIcon />}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Más Videos
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
