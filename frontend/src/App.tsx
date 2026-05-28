import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import NavbarContainer from './components/layout/NavbarContainer';
import Footer from './components/layout/Footer';
import HomePageContainer from './pages/homePage/HomePageContainer';
import ServicesPageContainer from './pages/servicesPage/ServicesPageContainer';
import BookingPageContainer from './pages/bookingPage/BookingPageContainer';
import LoginPageContainer from './pages/loginPage/LoginPageContainer';
import AdminLayout from './components/layout/portalLayouts/AdminLayout';
import BarberLayout from './components/layout/portalLayouts/BarberLayout';
import ClientLayout from './components/layout/portalLayouts/ClientLayout';
import AdminCitasPageContainer from './pages/adminCitasPage/AdminCitasPageContainer';
import AdminBarberosPageContainer from './pages/adminBarberosPage/AdminBarberosPageContainer';
import AdminClientesPageContainer from './pages/adminClientesPage/AdminClientesPageContainer';
import AdminServiciosPageContainer from './pages/adminServiciosPage/AdminServiciosPageContainer';
import BarberHorarioPageContainer from './pages/barberHorarioPage/BarberHorarioPageContainer';
import BarberDisponibilidadPageContainer from './pages/barberDisponibilidadPage/BarberDisponibilidadPageContainer';
import ClienteHistorialPageContainer from './pages/clienteHistorialPage/ClienteHistorialPageContainer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRouteContainer from './components/layout/ProtectedRouteContainer';

const PublicSite: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <NavbarContainer />
    <Box component="main" sx={{ flex: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicSite>
              <HomePageContainer />
            </PublicSite>
          }
        />
        <Route
          path="/servicios"
          element={
            <PublicSite>
              <ServicesPageContainer />
            </PublicSite>
          }
        />
        <Route
          path="/agendar"
          element={
            <PublicSite>
              <BookingPageContainer />
            </PublicSite>
          }
        />
        <Route
          path="/login"
          element={
            <PublicSite>
              <LoginPageContainer />
            </PublicSite>
          }
        />

        <Route element={<ProtectedRouteContainer allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/citas" element={<AdminCitasPageContainer />} />
            <Route path="/admin/barberos" element={<AdminBarberosPageContainer />} />
            <Route path="/admin/clientes" element={<AdminClientesPageContainer />} />
            <Route path="/admin/servicios" element={<AdminServiciosPageContainer />} />
          </Route>
        </Route>

        <Route element={<ProtectedRouteContainer allowedRoles={['barber']} />}>
          <Route element={<BarberLayout />}>
            <Route path="/barbero/horario" element={<BarberHorarioPageContainer />} />
            <Route path="/barbero/disponibilidad" element={<BarberDisponibilidadPageContainer />} />
          </Route>
        </Route>

        <Route element={<ProtectedRouteContainer allowedRoles={['client']} />}>
          <Route element={<ClientLayout />}>
            <Route path="/cliente/historial" element={<ClienteHistorialPageContainer />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
