import axios from 'axios';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
// http://10.1.0.187:3000/api

const tokenInStorage = localStorage.getItem('token');

const api = axios.create({
  // baseURL: `http://10.1.0.187:3000/api`,
  baseURL: `http://10.1.0.187:3000/api`,
  headers: {
    Authorization: `Bearer ${tokenInStorage}`,
    'Content-Type': 'application/json',
  },
});

const configHeaders = () => ({
  Authorization: `Bearer ${tokenInStorage}`,
  'Content-Type': 'application/json',
});

const useApiLogin = () => {
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`http://10.1.0.187:3000/api/auth/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoginData(response.data);
      toast('Login efetuado com sucesso!', {
        type: 'success',
      });
    } catch (error) {
      const errorMessage = error?.response ? error?.response?.data?.message : 'Ocorreu um erro durante o login';
      console.log(errorMessage)
      toast(errorMessage, {
        type: 'error',
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return { loginData, error, loading, handlerSubmitLogin: (payload) => login(payload) };
};

const useApiRequestGet = (path, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://10.1.0.187:3000/api${path}`, {
          data: payload,
          headers: configHeaders(),
        });
        setData(response.data.content);
      } catch (error) {
        toast(error.response.data.message, {
          type: 'error',
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  return { data, error, loading };
};

const useApiRequestSubmit = (method = 'post' | 'delete' | 'put', path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    try {
      setLoading(true);
      const response = await axios({
        method,
        url: `http://10.1.0.187:3000/api${path}`,
        data: payload,
        headers: configHeaders(),
      });

      setData(response.data);
    } catch (error) {
      toast(error.response.data.message, {
        type: 'error',
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, handleSubmitData: (payload) => submit(payload) };
};

export { useApiLogin, useApiRequestGet, useApiRequestSubmit, api }
