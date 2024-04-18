
import React, { useContext, useEffect, useState } from 'react';
import { Button, LeftPanel, Container, RightPanel, LoginForm, FormRow, InputData, Input, Underline, Label, BoxButton } from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useApiLogin } from '../../services/api';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // const [, setCookie] = useCookies(['token'])

  const handleLogin = async () => {
    try {
      const response = await api.post('http://10.1.0.187:3000/api/auth/login', {
        email: email,
        senha: senha,
      },
      {withCredentials: true}
      );

      const { token, session } = response?.data;

      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('token', token);

      setEmail('');
      setSenha('');

      toast.success('Login realizado com sucesso!', {
        autoClose: 2000
      });

      setTimeout(() => {
        navigate("/")
      }, 2000);
   
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

    return (
      <Container>
        <LeftPanel />
        <RightPanel>
          {/* */}
          {/* <div>
          <hsenha, setSenhaLogin</  h2=
          <input typeemail, setEmail="text" placeholder="E=mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <ToastContainer />

        </div> */}
          <LoginForm>
            <h1>Login</h1>
            <FormRow>
              <InputData>
                <Input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <Underline />
                <Label>E-mail</Label>
              </InputData>
              <br /> <br />
              <InputData>
                <Input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Underline />
                <Label>Senha</Label>
              </InputData>
            </FormRow>
            <BoxButton>
              <Button onClick={handleLogin}>Entrar</Button>
            </BoxButton>
            <ToastContainer />

          </LoginForm>

        </RightPanel>
      </Container>
    );
  };


export default Login;
