import * as React from 'react';
import { Button, Modal, Dialog, DialogContent, DialogTitle, Stack, IconButton, } from '@mui/material';
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


export const Detalhes = () => {

  let { id } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [numeroPatrimonio, setNumeroPatrimonio] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [tipoProduto, setTipoProduto] = React.useState('');
  const [numeroSerie, setNumeroSerie] = React.useState('')

  const { data, loadingData, refetchData } = useApiRequestGet(`/listar-produto/${id}`);
  // console.log(data)

  const { data: dataReserva } = useApiRequestGet(`/listar-reserva/${id}`);
  console.log("dataReserva", dataReserva)

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
      setStatus(data?.status.nome || '')
      setTipoProduto(data?.tipoProduto.nome || '')
      setNumeroSerie(data?.numeroSerie || '')
    }
  }, [loadingData, data]);

  const CustomAlertError = styled(Alert)(({ theme }) => ({
    backgroundColor: '#ffada4',
  }));

  const [modalOpen, setModalOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  const handleModalDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const statusBem = data?.situacao || '';
  const inativo = statusBem === 'INATIVO';


  const editaTelefone = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      nome: nome,
      descricao: descricao,
      numeroPatrimonio: numeroPatrimonio,
      status: status,
      tipoProduto: tipoProduto,
      numeroSerie: numeroSerie
      // cargoId:  parseInt(cargoId,10),
    };

    api
      .put(`/telefone/atualizar-telefone/${id}`, data)
      .then(() => {
        toast('Bem atualizado com sucesso', {
          type: 'success',
          autoClose: 3000,
        });

        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        });
        setLoading(false);
      })
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
          autoClose: 2000
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const usuarioQueReservou = dataReserva && dataReserva.length && dataReserva.map((data) => (
    data.usuario.nome
  ));


  const departamentoQueReservou = dataReserva && dataReserva.length && dataReserva.map((data) => (
    data.usuario.departamento.nome
  ));

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
                <Tooltip title='Editar' arrow>
                    <Button variant='outlined' onClick={handleModalOpen}sx={{marginTop: '-30px'}} > <EditIcon fontSize='20' /> </Button>
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
                  <li>Situação: {data.situacao}</li>
                  <li>Número de Série: {data.numeroSerie}</li>
                  <li>Status: {data.status.nome}</li>
                  <li>Usuário: {data.usuario.nome}</li>
                </ul>
              </div>

              {!inativo && (<ButtonStyle onClick={reserva}>Reservar</ButtonStyle>)}

              <ToastContainer />
              {inativo && (
                <div>
                  <CustomAlertError severity="error">Bem reservado por {usuarioQueReservou}
                  </CustomAlertError>
                  <Button sx={{ marginTop: '20px' }} variant="outlined" onClick={handleModalDetailsOpen}>Visualizar Detalhes Reserva</Button>

                </div>
              )}
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
                    <TextField
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      fullWidth
                      required
                      label='Status'
                      type='text'

                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={tipoProduto}
                      onChange={(e) => setTipoProduto(e.target.value)}
                      fullWidth
                      required
                      label='Tipo produto'
                      type='text'

                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      value={numeroSerie}
                      onChange={(e) => setNumeroSerie(e.target.value)}
                      fullWidth
                      required
                      label='Número serie'
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
                  {!loading ? 'Editar' : <CircularProgress color='success' size={23} />}
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
          <DialogContent dividers style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }} sx={{width: '500px'}}>

            <Box component='form' noValidate onSubmit={editaTelefone}>
              <DialogContent sx={{ paddingTop: 1 }}>
                <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                  <p>  <b>Departamento</b>: {departamentoQueReservou}</p>
                </Grid>
                <Grid container columnSpacing={2} rowSpacing={2} marginTop={0.5}>
                  <p><b>Usuário</b>: {usuarioQueReservou}</p>
                </Grid>
              </DialogContent>

            </Box>
          </DialogContent>
        </Dialog>
      </Container>
      }
    </div>
  )
}