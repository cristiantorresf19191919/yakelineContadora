"use client";

import { Box, IconButton, Link, Typography } from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useStyles from "./Footer.styles";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/yakelinecontadora",
    icon: <FacebookRoundedIcon fontSize="small" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yakelinecontadora",
    icon: <InstagramIcon fontSize="small" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yakelin-bustamante",
    icon: <LinkedInIcon fontSize="small" />,
  },
];

export default function Footer() {
  const { classes } = useStyles();

  return (
    <Box component="footer" className={classes.root}>
      <Box className={classes.topGlow} />
      <Box className={classes.container}>
        <Box className={classes.brandSection}>
          <Box className={classes.brandName}>
            <Box className={classes.brandBadge}>Y</Box>
            Yakeline Contadora
          </Box>
          <Typography className={classes.brandCopy}>
            Acompaño a emprendedores, pymes y profesionales independientes a
            construir finanzas sanas con asesorías contables, tributarias y
            estratégicas diseñadas a su medida.
          </Typography>
          <Box className={classes.socialRow}>
            {socialLinks.map((item) => (
              <IconButton
                key={item.label}
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialButton}
                aria-label={item.label}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography className={classes.sectionTitle}>Explora</Typography>
          <Box className={classes.linkList}>
            <Link href="/services" className={classes.footerLink}>
              Servicios
            </Link>
            <Link href="/citas" className={classes.footerLink}>
              Agendar Cita
            </Link>
            <Link href="/blog" className={classes.footerLink}>
              Blog
            </Link>
            <Link href="/mentorship" className={classes.footerLink}>
              Mentorías
            </Link>
            <Link href="/about" className={classes.footerLink}>
              Quien Soy
            </Link>
          </Box>
        </Box>

        <Box>
          <Typography className={classes.sectionTitle}>Contacto</Typography>
          <Box className={classes.linkList}>
            <Box className={classes.contactItem}>
              <Box className={classes.iconWrapper}>
                <MailRoundedIcon fontSize="small" />
              </Box>
              <Link
                href="mailto:yakeline@contadora.com"
                className={classes.footerLink}
              >
                yakeline@contadora.com
              </Link>
            </Box>
            <Box className={classes.contactItem}>
              <Box className={classes.iconWrapper}>
                <PhoneRoundedIcon fontSize="small" />
              </Box>
              <Link href="tel:+573207269417" className={classes.footerLink}>
                +57 320 726 9417
              </Link>
            </Box>
            <Box className={classes.contactItem}>
              <Box className={classes.iconWrapper}>
                <PlaceRoundedIcon fontSize="small" />
              </Box>
              <Typography component="span">
                Medellín, Antioquia, Colombia
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.bottomBar}>
        <Typography component="span">
          &copy; {new Date().getFullYear()} Yakeline Bustamante. Todos los derechos
          reservados.
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "0.85rem",
          color: "rgba(243, 229, 244, 0.6)",
        }}>
          Hecho con <span style={{ color: "#EF4444" }}>&hearts;</span> en Colombia
        </Box>
        <Box className={classes.legalLinks}>
          <Link href="/politica-de-privacidad">Pol&iacute;tica de privacidad</Link>
          <Link href="/terminos-y-condiciones">T&eacute;rminos y condiciones</Link>
        </Box>
      </Box>
    </Box>
  );
}

