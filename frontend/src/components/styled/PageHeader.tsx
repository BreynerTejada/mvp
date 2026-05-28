import React from 'react';
import { Box, Typography } from '@mui/material';
import { wrapperSx, titleSx, subtitleSx, actionSx } from './PageHeader.styles';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => (
  <Box sx={wrapperSx}>
    <Box>
      <Typography variant="h3" sx={titleSx}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={subtitleSx}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action && <Box sx={actionSx}>{action}</Box>}
  </Box>
);

export default PageHeader;
