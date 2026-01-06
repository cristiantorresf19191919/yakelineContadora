"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { InstagramEmbed } from "react-social-media-embed";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./InstagramFeed.styles";
import { instagramVideos } from "@/data/instagramVideos";
import { useRef } from "react";

interface InstagramFeedProps {
  limit?: number;
}

export default function InstagramFeed({ limit }: InstagramFeedProps) {
  const { classes, cx } = useStyles();
  const ref = useRef(null);
  
  // Parallax effect for blobs
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // If a limit is provided, slice the videos array
  const displayVideos = limit ? instagramVideos.slice(0, limit) : instagramVideos;

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
        type: "spring",
        damping: 20,
        stiffness: 100 
      },
    },
  };

  return (
    <Box component="section" className={classes.section} ref={ref}>
      <motion.div style={{ y: yBlob1 }} className={cx(classes.glowBlob, classes.blob1)} />
      <motion.div style={{ y: yBlob2 }} className={cx(classes.glowBlob, classes.blob2)} />
      
      <Box className={classes.container}>
        <Box className={classes.headerWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Typography className={classes.subTitle}>
              Síguenos en las Redes
            </Typography>
            <Typography variant="h2" className={classes.title}>
              Contenido Exclusivo
            </Typography>
            <Typography color="textSecondary" sx={{ maxWidth: 650, mx: "auto", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Descubre mis últimos videos con consejos prácticos para optimizar tus impuestos y potenciar tu libertad financiera.
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          className={classes.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayVideos.map((url, index) => (
            <motion.div key={index} variants={itemVariants} className={classes.card}>
              <InstagramEmbed 
                url={url} 
                width="100%" 
                // Removed fixed width style to allow it to fill the grid cell
              />
            </motion.div>
          ))}
        </motion.div>

        {limit && limit < instagramVideos.length && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/videos" passHref>
              <Button 
                className={classes.ctaButton}
                endIcon={<ArrowForwardIcon />}
              >
                Ver Galería Completa
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
