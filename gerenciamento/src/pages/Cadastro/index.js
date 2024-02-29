import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ContainerSignUp, AlignContainer } from './style'
import { Button, FormRow, InputData, Input, Underline, Label, BoxButton, } from './style';


export const Cadastro = () => {


  return (
    <div style={{ background: 'linear-gradient(to right, #007bff, #0056b3)', minHeight: '100vh' }}>
      <AlignContainer>
        <ContainerSignUp>

          <Box
            sx={{
              // marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>

              <Avatar sx={{ m: 1, bgcolor: "#007BFF", marginTop: '25px', size: '40px', height: '40px', width: '40px' }}>
                <LockOutlinedIcon />
              </Avatar>

              <h1>Cadastro</h1>
            </Box>


          </Box>
          <FormRow>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputData>
                  <Input type="text" required />
                  <Underline />
                  <Label>Nome</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input type="text" required />
                  <Underline />
                  <Label>Email</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputData>
                  <Input type="password" required />
                  <Underline />
                  <Label>Senha</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input type="text" required />
                  <Underline />
                  <Label>Matrícula</Label>
                </InputData>
              </Grid>
              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input type="text" required />
                  <Underline />
                  <Label>Telefone</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input type="text" required />
                  <Underline />
                  <Label>Departamento</Label>
                </InputData>
              </Grid>
            </Grid>
          </FormRow>

          <BoxButton>
            <Button>Cadastrar</Button>
          </BoxButton>

          <Grid container justifyContent="center" marginTop="10px">
            <Grid item>
              <Link to="/login"
              >

                <span style={{
                  color: 'black',
                  fontFamily: 'Poppins',
                  textDecoration: 'none',
                  fontSize: '15px'
                }}> Já possui uma conta? Entrar</span>
              </Link>
            </Grid>
          </Grid>
        </ContainerSignUp>

      </AlignContainer>
    </div>
  )
}