import { SxProps, Theme } from '@mui/material';

export const titleSx: SxProps<Theme> = {
  mb: 3,
  fontWeight: 600,
};

export const datePickerWrapperSx: SxProps<Theme> = {
  mb: 3,
};

export const dateFieldSx: SxProps<Theme> = {
  maxWidth: 300,
};

export const loadingWrapperSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  py: 4,
};

export const spinnerSx: SxProps<Theme> = {
  color: 'primary.main',
};

export const errorSx: SxProps<Theme> = {
  mb: 2,
};

export const noSlotsSx: SxProps<Theme> = {
  color: 'text.secondary',
  py: 2,
};

export const slotsLabelSx: SxProps<Theme> = {
  mb: 2,
  color: 'text.secondary',
};

export const slotsWrapperSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
};

export const slotChipSx = (isSelected: boolean): SxProps<Theme> => ({
  borderColor: '#c4a35a',
  color: isSelected ? '#0d0d0d' : '#c4a35a',
  backgroundColor: isSelected ? '#c4a35a' : 'transparent',
  fontWeight: 600,
  fontSize: '0.85rem',
  py: 2.5,
  px: 1,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isSelected ? '#d4b36a' : 'rgba(196, 163, 90, 0.1)',
  },
});
