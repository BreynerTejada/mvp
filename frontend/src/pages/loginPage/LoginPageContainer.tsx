import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserRole } from '../../api/types';
import LoginPageView from './LoginPageView';

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  admin: '/admin/citas',
  barber: '/barbero/horario',
  client: '/cliente/historial',
  guest: '/',
};

const LoginPageContainer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.user) {
      navigate(DEFAULT_ROUTE_BY_ROLE[authContext.user.role], { replace: true });
    }
  }, [authContext.user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await authContext.login(username, password);
    } catch {
      setError('Credenciales inválidas. Por favor intente de nuevo.');
    }
  };

  return (
    <LoginPageView
      username={username}
      password={password}
      error={error}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPageContainer;
