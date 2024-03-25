import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ContainerSignUp, AlignContainer } from './style'
import { Button, FormRow, InputData, Input, Underline, Label, BoxButton, StyledTextField } from './style';
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

  const [loading, setLoading] = React.useState(false);
  const { data: listaDptos } = useApiRequestGet("/listar-departamentos");
  const { data: listaPermissao, loading: loadingPermissao } = useApiRequestGet("/listar-permissao");
  // console.log(listaPermissao)

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
      permissaoId: '',
      departamentoId: '',
    },
  });

  const { errors } = formState;


  const handleCriarUsuario = async (data) => {
    try {
      setLoading(true);
      await axiosApi.post('/auth/criar-usuario', data);
      reset();
      toast.success('Usuário criado com sucesso');

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

              <Grid item xs={12} sm={6}>
                <InputData>

                  <Controller
                    name='departamentoId'
                    control={control}
                    render={({ field }) => {
                      const { onChange, name, onBlur, value, ref } = field;
                      return (
                        <Autocomplete
                          options={listaDptos || []}
                          className={classes.root}
                          getOptionLabel={(departamento) => departamento.nome}
                          value={
                            listaDptos &&
                            listaDptos.find((item) => item.id === value)
                          }
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

              <Grid item xs={12} sm={5.5} sx={{ marginLeft: '20.6px' }}>
                <Controller
                  name='permissaoId'
                  control={control}
                  render={({ field }) => {
                    const { onChange, name, onBlur, value, ref } = field;
                    return (
                      <TextField
                        required
                        ref={ref}

                        select
                        fullWidth={true}
                        key='permissao'
                        variant='standard'
                        onBlur={onBlur}
                        name={name}
                        label='Permissão'
                        value={value}
                        onChange={onChange}
                        error={!!errors.permissaoId}
                        className={classes.root}
                        helperText={errors.permissaoId?.message}
                      >
                        <MenuItem disabled value=''
                          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
                        >
                          <em>Nenhuma</em>
                        </MenuItem>
                        {!loadingPermissao &&
                          listaPermissao &&
                          listaPermissao.length &&
                          listaPermissao.map((permissao) => (
                            <MenuItem key={permissao.id} value={permissao.id}
                              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
                            >
                              {permissao.nome}
                            </MenuItem>
                          ))}
                      </TextField>
                    );
                  }}
                />

              </Grid>

            </Grid>


          </FormRow>



          <Button
            disabled={loading}
            type="submit"
            // fullWidth
            variant="contained"
          >
            Cadastrar
            {/* {!loading ? 'Entrar' : <imports.CircularProgress color='success' size={26} />} */}

          </Button>
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
