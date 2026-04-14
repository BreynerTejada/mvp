import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import * as styles from './GoldButton.styles';

const GoldButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} sx={[styles.buttonStyle, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]} />;
};

export default GoldButton;
