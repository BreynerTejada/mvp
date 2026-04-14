import React from 'react';
import { Container, Typography, TextField, Box, Alert } from '@mui/material';
import DarkCard from '../../components/styled/DarkCard';
import GoldButton from '../../components/styled/GoldButton';
import {
  pageContainerSx,
  cardSx,
  alertSx,
  textFieldSx,
  passwordFieldSx,
  inputLabelStyle,
} from './loginPage.styles';

interface LoginPageViewProps {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginPageView: React.FC<LoginPageViewProps> = ({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <Container maxWidth="sm" sx={pageContainerSx}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Iniciar sesion
      </Typography>
      <DarkCard sx={cardSx}>
        {error && (
          <Alert severity="error" sx={alertSx}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Usuario o Email"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUsernameChange(e.target.value)
            }
            required
            InputLabelProps={{ style: inputLabelStyle }}
            sx={textFieldSx}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onPasswordChange(e.target.value)
            }
            required
            InputLabelProps={{ style: inputLabelStyle }}
            sx={passwordFieldSx}
          />
          <GoldButton type="submit" fullWidth size="large">
            Ingresar
          </GoldButton>
        </Box>
      </DarkCard>
    </Container>
  );
};

export default LoginPageView;
