import React from 'react';
import { Button, LeftPanel, Container, RightPanel, LoginForm, FormRow, InputData, Input, Underline, Label } from './styles';



const Login = () => {
  return (
    <Container>
      <LeftPanel />
      <RightPanel>
        <LoginForm>
          <h1>Login</h1>
          <FormRow>
            <InputData>
              <Input type="text" required />
              <Underline />
              <Label>Nome</Label>
            </InputData>
            <br /> <br />
            <InputData>
              <Input type="text" required />
              <Underline />
              <Label>Senha</Label>
            </InputData>
          </FormRow>
          <Button>Entrar</Button>

        </LoginForm>
      </RightPanel>
    </Container>
  );
};


export default Login;
