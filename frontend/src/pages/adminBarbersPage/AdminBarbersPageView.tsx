import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DarkCard from '../../components/styled/DarkCard';
import GoldButton from '../../components/styled/GoldButton';
import { AdminBarbersPageViewProps } from './types';
import {
  pageWrapperSx,
  tableHeaderCellSx,
  tableCellSx,
  textFieldSx,
  textFieldLabelStyle,
} from './adminBarbersPage.styles';

const AdminBarbersPageView: React.FC<AdminBarbersPageViewProps> = ({
  barbers,
  formData,
  message,
  onFormChange,
  onSubmit,
}) => {
  return (
    <Container maxWidth="lg" sx={pageWrapperSx}>
      <Typography variant="h3" color="primary" gutterBottom>
        Administración de Barberos
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <DarkCard sx={{ p: 3 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Nuevo Barbero
            </Typography>
            {message && (
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            )}
            <Box component="form" onSubmit={onSubmit}>
              <TextField
                fullWidth
                name="first_name"
                label="Nombres"
                margin="normal"
                required
                value={formData.first_name}
                onChange={onFormChange}
                InputLabelProps={{ style: textFieldLabelStyle }}
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                name="last_name"
                label="Apellidos"
                margin="normal"
                required
                value={formData.last_name}
                onChange={onFormChange}
                InputLabelProps={{ style: textFieldLabelStyle }}
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                name="phone"
                label="Teléfono"
                margin="normal"
                required
                value={formData.phone}
                onChange={onFormChange}
                InputLabelProps={{ style: textFieldLabelStyle }}
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                margin="normal"
                required
                value={formData.email}
                onChange={onFormChange}
                InputLabelProps={{ style: textFieldLabelStyle }}
                sx={textFieldSx}
              />
              <TextField
                fullWidth
                name="specialty"
                label="Especialidad"
                margin="normal"
                value={formData.specialty}
                onChange={onFormChange}
                InputLabelProps={{ style: textFieldLabelStyle }}
                sx={textFieldSx}
              />
              <GoldButton type="submit" fullWidth sx={{ mt: 3 }}>
                Agregar Barbero
              </GoldButton>
            </Box>
          </DarkCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={{ bgcolor: 'secondary.main' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeaderCellSx}>Nombre</TableCell>
                  <TableCell sx={tableHeaderCellSx}>Especialidad</TableCell>
                  <TableCell sx={tableHeaderCellSx}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {barbers.map((barber) => (
                  <TableRow key={barber.id}>
                    <TableCell sx={tableCellSx}>{barber.full_name}</TableCell>
                    <TableCell sx={tableCellSx}>{barber.specialty}</TableCell>
                    <TableCell sx={tableCellSx}>
                      {barber.is_active ? 'Activo' : 'Inactivo'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminBarbersPageView;
