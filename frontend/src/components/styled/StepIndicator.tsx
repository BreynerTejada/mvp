import React from 'react';
import { Box, Typography } from '@mui/material';
import * as styles from './StepIndicator.styles';

const steps = ['SERVICIO', 'BARBERO', 'FECHA', 'DETALLES'];

interface StepIndicatorProps {
  activeStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep }) => {
  return (
    <Box sx={styles.container}>
      {steps.map((label, index) => (
        <Box key={label} sx={styles.stepWrapper}>
          {/* Step Circle & Label */}
          <Box sx={styles.stepContentWrapper}>
            <Box sx={styles.getCircleStyle(index <= activeStep)}>
              {index + 1}
            </Box>
            <Typography variant="caption" sx={styles.getLabelStyle(index <= activeStep)}>
              {label}
            </Typography>
          </Box>
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <Box sx={styles.getConnectorStyle(index < activeStep)} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StepIndicator;
