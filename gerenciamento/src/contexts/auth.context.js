import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import { axiosApi } from '../services/api';


const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await axiosApi.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const { session } = response.data;

      localStorage.setItem("@estock:user", JSON.stringify(session));

      setData({ session });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  };

  function signOut() {
    localStorage.removeItem("@estock:user");

    setData({});
  }


  useEffect(() => {
    const user = localStorage.getItem("@estock:user");

    if (user) {
      setData({
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user: data.session
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };