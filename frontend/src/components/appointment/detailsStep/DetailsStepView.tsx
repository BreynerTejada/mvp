import React from 'react';
import { Typography, Box, TextField, Divider, Alert } from '@mui/material';
import { DetailsStepViewProps, ClientData } from '../types';
import {
  titleSx,
  errorAlertSx,
  summaryCardSx,
  summaryTitleSx,
  summaryGridSx,
  labelSx,
  valueSx,
  priceValueSx,
  dividerSx,
  formSectionTitleSx,
  formWrapperSx,
  nameRowSx,
} from './detailsStep.styles';

function DetailsStepView({
  service,
  barber,
  date,
  slot,
  clientData,
  onClientDataChange,
  error,
}: DetailsStepViewProps) {
  const handleChange = (field: keyof ClientData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onClientDataChange({ ...clientData, [field]: e.target.value });
  };

  return (
    <Box>
      <Typography variant="h5" sx={titleSx}>
        Confirma tu información
      </Typography>

      {error && (
        <Alert severity="error" sx={errorAlertSx}>
          {error}
        </Alert>
      )}

      <Box sx={summaryCardSx}>
        <Typography variant="h6" sx={summaryTitleSx}>
          Resumen de tu cita
        </Typography>
        <Box sx={summaryGridSx}>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Servicio
            </Typography>
            <Typography variant="body1" sx={valueSx}>
              {service?.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Precio
            </Typography>
            <Typography variant="body1" sx={priceValueSx}>
              ${Number(service?.price).toLocaleString('es-CO')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Barbero
            </Typography>
            <Typography variant="body1" sx={valueSx}>
              {barber?.full_name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Duración
            </Typography>
            <Typography variant="body1" sx={valueSx}>
              {service?.duration_minutes} min
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Fecha
            </Typography>
            <Typography variant="body1" sx={valueSx}>
              {date}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={labelSx}>
              Hora
            </Typography>
            <Typography variant="body1" sx={valueSx}>
              {slot?.start_time} - {slot?.end_time}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={dividerSx} />

      <Typography variant="h6" sx={formSectionTitleSx}>
        Tus datos
      </Typography>
      <Box sx={formWrapperSx}>
        <Box sx={nameRowSx}>
          <TextField
            label="Nombre"
            value={clientData.firstName}
            onChange={handleChange('firstName')}
            fullWidth
            required
            id="client-first-name"
          />
          <TextField
            label="Apellido"
            value={clientData.lastName}
            onChange={handleChange('lastName')}
            fullWidth
            required
            id="client-last-name"
          />
        </Box>
        <TextField
          label="Teléfono"
          value={clientData.phone}
          onChange={handleChange('phone')}
          fullWidth
          required
          placeholder="3001234567"
          id="client-phone"
        />
        <TextField
          label="Email (opcional)"
          value={clientData.email}
          onChange={handleChange('email')}
          fullWidth
          type="email"
          id="client-email"
        />
      </Box>
    </Box>
  );
}

export default DetailsStepView;
