import { SxProps, Theme } from '@mui/material/styles';

export const toolbar: SxProps<Theme> = {
  maxWidth: 1200,
  width: '100%',
  mx: 'auto',
  px: { xs: 2, md: 4 },
  py: 1,
};

export const logoText: SxProps<Theme> = {
  cursor: 'pointer',
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: '1.3rem',
  letterSpacing: '0.05em',
  flexGrow: 1,
};

export const navLinksContainer: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
};

export const navButton: SxProps<Theme> = {
  color: 'text.primary',
  fontSize: '0.8rem',
  letterSpacing: '0.08em',
  fontWeight: 500,
  '&:hover': {
    color: 'primary.main',
    backgroundColor: 'transparent',
  },
};

export const highlightNavButton: SxProps<Theme> = {
  color: 'primary.main',
  fontSize: '0.8rem',
  fontWeight: 500,
};

export const agendaButton: SxProps<Theme> = {
  fontSize: '0.75rem',
  px: 3,
  ml: 1,
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
