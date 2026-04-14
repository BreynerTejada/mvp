import { SxProps, Theme } from '@mui/material/styles';

export const getCardStyle = (selected?: boolean): SxProps<Theme> => ({
  backgroundColor: selected ? 'rgba(196, 163, 90, 0.08)' : '#1a1a1a',
  border: selected
    ? '2px solid #c4a35a'
    : '1px solid rgba(196, 163, 90, 0.15)',
  borderRadius: 8,
  padding: '20px 24px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(196, 163, 90, 0.5)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  },
});
