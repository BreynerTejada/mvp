import React from 'react';
import { Card, CardProps } from '@mui/material';
import * as styles from './DarkCard.styles';

interface DarkCardProps extends CardProps {
  selected?: boolean;
}

const DarkCard: React.FC<DarkCardProps> = ({ selected, ...props }) => {
  return <Card sx={[styles.getCardStyle(selected), ...(Array.isArray(props.sx) ? props.sx : [props.sx])]} {...props} />;
};

export default DarkCard;
