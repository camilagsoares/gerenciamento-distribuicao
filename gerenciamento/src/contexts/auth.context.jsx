import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')) || null);
  const storedSession = localStorage.getItem('session');
  const initialSession = storedSession ? JSON.parse(storedSession) : null;
  const [session, setSession] = useState(initialSession);
  console.log("TOKEN",token)
  const [profileLoaded, setProfileLoaded] = useState(false);

  const criarPerfil = (objectUser) => {
    localStorage.setItem('session', JSON.stringify(objectUser.content?.session));
    setSession(objectUser.content?.session);
    setProfileLoaded(true);
  };

  const criarSessao = (objectSessionUser) => {
    const { content } = objectSessionUser;
    localStorage.setItem('token', content?.token);
    localStorage.setItem('session', JSON.stringify(content?.session));
    setSession(content?.session);
    setToken(content?.token);
    setProfileLoaded(true);
    navigate('/');
    window.location.reload(); // Força a recarga da página

  };

  const encerrarSessao = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    setToken(null);
    setSession(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, criarSessao, criarPerfil, session, encerrarSessao }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = { children: PropTypes.element };
