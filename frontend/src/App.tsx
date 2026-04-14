import { Routes, Route } from 'react-router-dom';
import NavbarContainer from './components/layout/NavbarContainer';
import Footer from './components/layout/Footer';
import HomePageContainer from './pages/homePage/HomePageContainer';
import ServicesPageContainer from './pages/servicesPage/ServicesPageContainer';
import BookingPageContainer from './pages/bookingPage/BookingPageContainer';
import BarberAgendaPageContainer from './pages/barberAgendaPage/BarberAgendaPageContainer';
import LoginPageContainer from './pages/loginPage/LoginPageContainer';
import AdminBarbersPageContainer from './pages/adminBarbersPage/AdminBarbersPageContainer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRouteContainer from './components/layout/ProtectedRouteContainer';

function App() {
  return (
    <AuthProvider>
      <NavbarContainer />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePageContainer />} />
          <Route path="/servicios" element={<ServicesPageContainer />} />
          <Route path="/agendar" element={<BookingPageContainer />} />
          <Route path="/login" element={<LoginPageContainer />} />

          <Route element={<ProtectedRouteContainer />}>
            <Route path="/agenda" element={<BarberAgendaPageContainer />} />
          </Route>

          <Route element={<ProtectedRouteContainer adminOnly={true} />}>
            <Route path="/admin/barberos" element={<AdminBarbersPageContainer />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
