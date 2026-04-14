import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import StepIndicator from '../../components/styled/StepIndicator';
import GoldButton from '../../components/styled/GoldButton';
import ServiceStepContainer from '../../components/appointment/serviceStep/ServiceStepContainer';
import BarberStepContainer from '../../components/appointment/barberStep/BarberStepContainer';
import DateTimeStepContainer from '../../components/appointment/dateTimeStep/DateTimeStepContainer';
import DetailsStepContainer from '../../components/appointment/detailsStep/DetailsStepContainer';
import ConfirmationView from '../../components/appointment/confirmationView/ConfirmationView';
import { BookingPageViewProps } from './types';
import {
  confirmationWrapperSx,
  pageWrapperSx,
  pageTitleSx,
  titleUnderlineSx,
  stepContentSx,
  navigationBarSx,
  backButtonSx,
} from './bookingPage.styles';

const BookingPageView: React.FC<BookingPageViewProps> = ({
  activeStep,
  selectedService,
  selectedBarber,
  selectedDate,
  selectedSlot,
  clientData,
  confirmed,
  loading,
  error,
  canGoNext,
  onServiceSelect,
  onBarberSelect,
  onDateChange,
  onSlotSelect,
  onClientDataChange,
  onNext,
  onBack,
  onConfirm,
  onBookAnother,
}) => {
  if (confirmed) {
    return (
      <Box sx={confirmationWrapperSx}>
        <ConfirmationView onBookAnother={onBookAnother} />
      </Box>
    );
  }

  return (
    <Box sx={pageWrapperSx}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={pageTitleSx}>
          AGENDA UNA CITA
        </Typography>
        <Box sx={titleUnderlineSx} />

        <StepIndicator activeStep={activeStep} />

        <Box sx={stepContentSx}>
          {activeStep === 0 && (
            <ServiceStepContainer
              selectedService={selectedService}
              onServiceSelect={onServiceSelect}
            />
          )}
          {activeStep === 1 && (
            <BarberStepContainer
              selectedBarber={selectedBarber}
              onBarberSelect={onBarberSelect}
            />
          )}
          {activeStep === 2 && (
            <DateTimeStepContainer
              barber={selectedBarber}
              service={selectedService}
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              selectedSlot={selectedSlot}
              onSlotSelect={onSlotSelect}
            />
          )}
          {activeStep === 3 && (
            <DetailsStepContainer
              service={selectedService}
              barber={selectedBarber}
              date={selectedDate}
              slot={selectedSlot}
              clientData={clientData}
              onClientDataChange={onClientDataChange}
              error={error}
            />
          )}
        </Box>

        <Box sx={navigationBarSx}>
          <Button
            onClick={onBack}
            disabled={activeStep === 0}
            sx={backButtonSx(activeStep > 0)}
          >
            Atrás
          </Button>

          {activeStep < 3 ? (
            <GoldButton
              onClick={onNext}
              disabled={!canGoNext}
              id="next-step-button"
            >
              SIGUIENTE
            </GoldButton>
          ) : (
            <GoldButton
              onClick={onConfirm}
              disabled={!canGoNext || loading}
              id="confirm-button"
            >
              {loading ? 'CONFIRMANDO...' : 'CONFIRMAR CITA'}
            </GoldButton>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default BookingPageView;
