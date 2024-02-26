import axios from 'axios';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const tokenInStorage = localStorage.getItem('token');

const axiosApi = axios.create({
    baseURL: `http://10.1.0.187:4001/api`,
    headers: {
        Authorization: `Bearer ${tokenInStorage}`,
        'Content-Type': 'application/json',
    },
})


const configHeaders = () => ({
    Authorization: `Bearer ${tokenInStorage}`,
    'Content-Type': 'application/json',
});


const useApiLogin = (path) => {
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`http://10.1.0.187:4001/api${path}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoginData(response.data);
      toast('Login efetuado com sucesso!', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response, {
        type: 'error',
      });
      setError(error);
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
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://10.1.0.187:4001/api${path}`, {
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
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { data, error, loading, refetchData: fetchData };
  };

  const useApiRequestSubmit = (method = 'post' | 'delete' | 'put', path, callback) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const submit = async () => {
      try {
        setLoading(true);
        const response = await axios({
          method,
          url: `http://10.1.0.187:4001/api${path}`,
        });
  
        setData(response.data);
        // window.location.reload()
  
        // Chame o callback após a conclusão bem-sucedida do POST ou PUT
        if (callback) {
          callback(response.data);
        }
      } catch (error) {
        toast(error.response.data.message, {
          type: 'error',
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, error, loading, handleSubmitData: () => submit() };
  };
  

  export { useApiLogin, useApiRequestGet, useApiRequestSubmit, axiosApi };
