import React from 'react';
import { Avatar } from '@mui/material';
import { avatarSx } from './PersonAvatar.styles';

interface PersonAvatarProps {
  name: string;
  size?: number;
}

const initials = (name: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const colorFromName = (name: string): string => {
  const palette = ['#c4a35a', '#7d6438', '#a88d4a', '#5a4a2a', '#937640'];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
};

const PersonAvatar: React.FC<PersonAvatarProps> = ({ name, size = 36 }) => (
  <Avatar sx={avatarSx(size, colorFromName(name))}>{initials(name)}</Avatar>
);

export default PersonAvatar;
