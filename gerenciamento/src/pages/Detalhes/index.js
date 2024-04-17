import * as React from 'react';
import { Button, Modal, Dialog, DialogContent, DialogTitle, Stack, IconButton, InputLabel, Drawer, Divider, } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { Container, InnerContainer, ImgBox, Image, Details, Content, Title, Subtitle, Description, ButtonStyle } from './style';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useApiRequestGet, api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DialogActions from '@mui/material/DialogActions';
import Close from '@mui/icons-material/CloseOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { ModalCriarEtapa } from './ModalCriarEtapa';

export const Detalhes = () => {

  let { id } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [numeroPatrimonio, setNumeroPatrimonio] = React.useState('');
  const [tipoProdutoId, setTipoProdutoId] = React.useState('');
  const [localOndeEncontra, setLocalOndeEncontra] = React.useState('')
  const [tipoProduto, setTipoProduto] = React.useState('');
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);
  // const [numeroSerie, setNumeroSerie] = React.useState('')
  // const [status, setStatus] = React.useState('');

  const { data: dataProduto } = useApiRequestGet("/listar-tipoproduto");


  const sessionUser = JSON.parse(localStorage.getItem('session'))
  const { data, loadingData, refetchData } = useApiRequestGet(`/listar-produto/${id}`);
  console.log("data", data)

  if (data && data.usuarioId) {
    console.log("data.usuarioId", data.usuarioId);
  } else {
    console.log("Data é nulo ou não possui a propriedade 'usuarioId'");
  }

  const { data: dataReserva } = useApiRequestGet(`/listar-reserva/${id}`);

  // const { data: listarEtapas } = useApiRequestGet(`/listar-etapa/${id}`);
  // console.log(listarEtapas)


  // React.useEffect(() => {
  //   if (id) {
  //     refetchData();
  //   }
  // }, [id]);

  React.useEffect(() => {
    if (!loadingData && data) {
      setDescricao(data?.descricao || '');
      setNome(data?.nome || '');
      setNumeroPatrimonio(data?.numeroPatrimonio || '')
      setTipoProdutoId(data?.tipoProdutoId || '')
      setLocalOndeEncontra(data?.localOndeEncontra || '')
      setTipoProduto(data?.tipoProduto?.nome || '');
      // setNumeroSerie(data?.numeroSerie || '')
      // setStatus(data?.status.nome || '')
    }
  }, [loadingData, data]);

  const CustomAlertError = styled(Alert)(({ theme }) => ({
    backgroundColor: '#ffada4',
  }));

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalEtapaOpen, setModalEtapaOpen] = React.useState(false)
  const [detailsOpen, setDetailsOpen] = React.useState(false)




  const handleEtapaOpen = () => {
    setModalEtapaOpen(true);
  };

  const handleEtapaClose = () => {
    setModalEtapaOpen(false);
  };


  const handleModalDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleModalDetailsClose = () => {
    setDetailsOpen(false);
  };


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };



  const statusBem = data?.situacao || '';
  const inativo = statusBem === 'INATIVO';
  const ativo = statusBem === 'ATIVO'

  const handleChange = (event) => {
    setTipoProdutoId(event.target.value);
  };

  const editaTelefone = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      nome: nome,
      descricao: descricao,
      numeroPatrimonio: numeroPatrimonio,

      tipoProdutoId: tipoProdutoId,
      localOndeEncontra: localOndeEncontra
      // numeroSerie: numeroSerie
      // status: status,
      //imagem
      // cargoId:  parseInt(cargoId,10),
    };

    api
      .put(`/atualizar-produto/${id}`, data)
      .then(() => {
        toast('Bem atualizado com sucesso', {
          type: 'success',
          autoClose: 3000,
        });
        // console.log("data", JSON.stringify(data))
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 3000);
      })
      // .catch((error) => {
      //   // toast(error.message, {
      //   //   type: 'error',
      //   // });
      //   setLoading(false);
      // })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
    console.log(data)

  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerZIndex, setDrawerZIndex] = React.useState(-1);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setDrawerZIndex(1);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawerZIndex(-1);
  };

  const [currentColor, setCurrentColor] = React.useState('#000');
  const [background, setBackground] = React.useState('#212121');

  const reserva = () => {
    //id do usuario
    //produtoId

    api
      .post(`criar-reserva/${data.id}`, data)
      .then(() => {
        toast.success('Bem reservado com sucesso!', {
          autoClose: 1000
        });
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error)
      });
  }



  return (
    <div>

      <Link to="/">
        <Button
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
          sx={{ marginLeft: '1vw' }}
        >
          Voltar para página inicial
        </Button>
      </Link>

      {data && <Container>
        <InnerContainer>
          <ImgBox backgroundColor={background}>
            <Image src={data.imagem} alt={data.nome} />
          </ImgBox>
          <Details>
            <Content>
              {/* <Title color={currentColor}>
                {data.nome}
                <Tooltip title='Editar' arrow>
                  <Button variant='outlined' sx={{ marginLeft: '100px' }} onClick={handleModalOpen}> <EditIcon fontSize='20' /> </Button>
                </Tooltip>
                <br />
                <Subtitle>
                  {data.criadoEm.slice(8, 10)}-{data.criadoEm.slice(5, 7)}-{data.criadoEm.slice(0, 4)}
                </Subtitle>
              </Title> */}
              <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Title color={currentColor}>
                  {data.nome}

                  <br />
                  <Subtitle>
                    {data.criadoEm.slice(8, 10)}-{data.criadoEm.slice(5, 7)}-{data.criadoEm.slice(0, 4)}
                  </Subtitle>
                </Title>

                {data?.usuarioId === sessionUser?.id ? (
                  <Tooltip title='Editar' arrow>
                    <Button variant='outlined' onClick={handleModalOpen} sx={{ marginTop: '-30px' }}> <EditIcon fontSize='20' /> </Button>
                  </Tooltip>
                ) : (
                  null
                )}

                <Tooltip title='Detalhes Etapa' arrow>
                  <Button variant='outlined' onClick={handleDrawerOpen} sx={{ marginTop: '-30px', marginLeft: '7px', }}> <AddToPhotosIcon fontSize='20' /> </Button>
                </Tooltip>

              </Stack>


              <Description>
                {data.descricao}
              </Description>

              <div className="product-colors">
                <p>Tipo de Produto: {data.tipoProduto.nome}</p>
                <p>Número de Patrimônio: {data.numeroPatrimonio}</p>
              </div>
              <div className="product-colors">
                <ul>
                  <li>Tipo</li>
                  <li>Local onde encontrar: {data.localOndeEncontra}</li>
                  {/* <li>Situação: {data.situacao}</li> */}
                  <li>Número de Série: {data.numeroSerie}</li>
                  {/* <li>Status: {data.status.nome}</li> */}
                  <li>Usuário: {data.usuario.nome}</li>
                </ul>
              </div>

              {data.situacaoDeReserva === "DISPONIVEL" && <ButtonStyle onClick={reserva} disabled={!token}>
                Reservar
              </ButtonStyle>}

              <ToastContainer />
              {data.situacaoDeReserva === "RESERVADO" && <div>
                <CustomAlertError severity="error">
                  {dataReserva && dataReserva.map(reserva => (
                    <div key={reserva.id}>
                      Bem reservado por  {reserva.usuario.nome}
                    </div>
                  ))}
                </CustomAlertError>
                <Button sx={{ marginTop: '20px' }} variant="outlined" onClick={handleModalDetailsOpen}>Visualizar Detalhes Reserva</Button>
              </div>
              }
            </Content>
          </Details>
        </InnerContainer>
        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogContent dividers style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }}>

            <h2>Editar Bem</h2>
            <Box component='form' noValidate onSubmit={editaTelefone}>
              <DialogContent dividers sx={{ paddingTop: 1 }}>
                <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      fullWidth
                      required
                      label='Nome'
                      type='text'
                    />
                  </Grid>


                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      fullWidth
                      required
                      label='Descrição'
                      type='text'
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={numeroPatrimonio}
                      onChange={(e) => setNumeroPatrimonio(e.target.value)}
                      fullWidth
                      required
                      label='Número de Patrimônio'
                      type='number'
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo Produto</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Tipo Produto"
                          onChange={handleChange}
                        >
                          {dataProduto && dataProduto.map(item => (
                            <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>



                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={localOndeEncontra}
                      onChange={(e) => setLocalOndeEncontra(e.target.value)}
                      fullWidth
                      required
                      label='Local onde encontra'
                      type='text'
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  startIcon={<Close width={24} />}
                  variant='outlined'
                  color='info'
                  onClick={handleModalClose}
                  sx={{ minWidth: 156, height: '100%' }}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  // disabled={loading || isButtonDisabled}
                  // startIcon={<Save width={24} />}
                  variant='outlined'
                  color='success'
                  sx={{ minWidth: 156, height: '100%' }}
                >
                  {!loading ? 'Salvar' : <CircularProgress color='success' size={23} />}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog open={detailsOpen} onClose={handleModalDetailsClose} >
          <DialogTitle>
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2> Visualizar Detalhes</h2>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='close modal change password'
                onClick={handleModalDetailsClose}
              >
                <Close color='action' />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent dividers style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }} sx={{ width: '500px' }}>

            <Box component='form' noValidate onSubmit={editaTelefone}>
              <DialogContent sx={{ paddingTop: 1 }}>
                {dataReserva && dataReserva.map(reserva => (
                  <div key={reserva.id}>
                    <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                      <p>Nome do Usuário: {reserva.usuario.nome}</p>
                    </Grid>
                    <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                      <p>Departamento: {reserva.usuario.departamento.nome}</p>
                    </Grid>
                    <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                      <p>Telefone: {reserva.usuario.telefone}</p>
                    </Grid>
                  </div>
                ))}
              </DialogContent>
            </Box>
          </DialogContent>
        </Dialog>


        <ModalCriarEtapa drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose}
        
        />
      </Container>
      }
    </div>
  )
}