import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as styles from './Footer.styles';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={styles.footerContainer}>
      <Box sx={styles.footerContent}>
        <Typography variant="body2" sx={styles.copyrightText}>
          BARBER SHOP © {new Date().getFullYear()}
        </Typography>

        <Box sx={styles.socialBox}>
          <IconButton size="small" sx={styles.iconButton} aria-label="Instagram">
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={styles.iconButton} aria-label="Facebook">
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={styles.iconButton} aria-label="WhatsApp">
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={styles.taglineText}>
          El Arte del Corte Perfecto
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
