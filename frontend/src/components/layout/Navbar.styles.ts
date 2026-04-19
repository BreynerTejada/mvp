import { SxProps, Theme } from '@mui/material/styles';

export const toolbar: SxProps<Theme> = {
  maxWidth: 1200,
  width: '100%',
  mx: 'auto',
  px: { xs: 2, md: 4 },
  py: 1.1,
};

export const logoText: SxProps<Theme> = {
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: '1.34rem',
  letterSpacing: '0.05em',
  flexGrow: 1,
};

export const navLinksContainer: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2.2,
};

export const navButton: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.73rem',
  letterSpacing: '0.1em',
  fontWeight: 500,
  '&:hover': {
    color: 'primary.main',
    backgroundColor: 'transparent',
  },
};

export const highlightNavButton: SxProps<Theme> = {
  color: 'primary.main',
  fontSize: '0.73rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
};

export const agendaButton: SxProps<Theme> = {
  fontSize: '0.71rem',
  px: 2.6,
  py: 0.9,
  ml: 0.6,
  borderRadius: 1,
  fontWeight: 700,
  letterSpacing: '0.09em',
  boxShadow: '0 4px 18px rgba(196, 163, 90, 0.28)',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(196, 163, 90, 0.4)',
    transform: 'translateY(-1px)',
  },
};

export const loginButton: SxProps<Theme> = {
  color: 'text.secondary',
  ml: 2,
  fontSize: '0.75rem',
};

export const logoutButton: SxProps<Theme> = {
  color: 'error.main',
  ml: 2,
  fontSize: '0.75rem',
};

export const drawerPaper: SxProps<Theme> = {
  backgroundColor: '#1a1a1a',
  width: 260,
  pt: 2,
};

export const drawerListItem: SxProps<Theme> = {
  cursor: 'pointer',
  '&:hover': { bgcolor: 'rgba(196,163,90,0.1)' },
};

export const drawerListItemText: SxProps<Theme> = {
  letterSpacing: '0.08em',
  fontSize: '0.85rem',
};

export const drawerHighlightText: SxProps<Theme> = {
  color: 'primary.main',
  fontSize: '0.85rem',
};

export const drawerActionItem: SxProps<Theme> = {
  cursor: 'pointer',
  mt: 2,
};

export const drawerFooterItem: SxProps<Theme> = {
  mt: 2,
  justifyContent: 'center',
};
