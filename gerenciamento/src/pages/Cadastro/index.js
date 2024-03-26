import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ContainerSignUp, AlignContainer } from './style'
import { Button, FormRow, InputData, Input, Underline, Label } from './style';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApiRequestGet, axiosApi } from '../../services/api';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-input': {
      color: 'black',
      fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiFormLabel-root': {
      color: 'black',
      fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: '2px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: '2px',
    },
  },
}));


export const Cadastro = () => {

  const classes = useStyles();
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(false);
  const { data: listaDptos } = useApiRequestGet("/listar-departamentos");

  const schema = yup
    .object({
      nome: yup.string().required('Campo obrigatorio'),
      email: yup.string().required('Campo obrigatorio'),
      senha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
      telefone: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres'),
      permissaoId: yup.string().required('Campo obrigatorio'),
      departamentoId: yup.string().required('Campo obrigatorio'),
    })
    .required();

  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      permissaoId: '2076f00d-1b51-4645-9533-388b52d3bbab',
      departamentoId: '',
    },
  });

  const { errors } = formState;


  const handleCriarUsuario = async (data) => {
    try {
      setLoading(true);
      await axiosApi.post('/auth/criar-usuario', data);
      reset();
      toast.success('Usuário criado com sucesso!', {
        autoClose: 2000
      });

      setTimeout(() => {
        navigate("/login")
      }, 2000);


    } catch (error) {
      console.error('Erro ao criar usuário:', error.response.data.message);
      toast.error(`${error.response.data.message}`);

    } finally {
      setLoading(false);
    }
  };

  return (
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
        <form component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleCriarUsuario)}>
          <FormRow>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputData>
                  <Input
                    type="text"
                    required
                    {...register('nome')}
                  />
                  <Underline />
                  <Label>Nome</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input type="text"
                    required
                    {...register('email')} />
                  <Underline />
                  <Label>Email</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputData>
                  <Input
                    type="password"
                    required
                    {...register('senha')}
                  />
                  <Underline />
                  <Label>Senha</Label>
                </InputData>
              </Grid>


              <Grid item xs={12} sm={6}>

                <InputData>
                  <Input
                    {...register('telefone')}

                    type="text"
                    required />
                  <Underline />
                  <Label>Telefone</Label>
                </InputData>
              </Grid>

              <Grid item xs={12} sm={12}>
                <InputData>

                  <Controller
                    name='departamentoId'
                    control={control}
                    render={({ field }) => {
                      const { onChange, name, onBlur, value, ref } = field;
                      // Verificar se listaDptos é uma matriz válida antes de usar o método find
                      const selectedDepartamento = listaDptos && listaDptos.find(item => item.id === value);
                      return (
                        <Autocomplete
                          options={listaDptos || []}
                          className={classes.root}
                          getOptionLabel={(departamento) => departamento.nome}
                          value={selectedDepartamento || null} // Define como null se não houver correspondência
                          onChange={(event, newValue) => {
                            const selectedValue = newValue ? newValue.id : '';
                            onChange(selectedValue);
                          }}
                          onBlur={onBlur}
                          isOptionEqualToValue={(option, value) => option.id === value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.root}
                              label='Departamento'
                              variant='standard'
                              name={name}
                              error={!!errors.departamentoId}
                              helperText={errors.departamentoId?.message}
                            />
                          )}
                        />
                      );
                    }}
                  />

                </InputData>
              </Grid>
            </Grid>


          </FormRow>


          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              disabled={loading}
              type="submit"
            >
              Cadastrar
              {/* {!loading ? 'Entrar' : <imports.CircularProgress color='success' size={26} />} */}
            </Button>
          </Box>
          
          <ToastContainer />

        </form>

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
  )
}
