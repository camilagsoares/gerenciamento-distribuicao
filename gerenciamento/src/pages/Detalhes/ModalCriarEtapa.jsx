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
import AddCircle from '@mui/icons-material/AddCircleOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { format } from 'date-fns';

export function ModalCriarEtapa({ handleDrawerOpen, handleDrawerClose, drawerOpen }) {


    let { id } = useParams();

    const [loading, setLoading] = React.useState(false);
    const [descricao, setDescricao] = React.useState('');
    const [produtoConcluido, setProdutoConcluido] = React.useState('');
    const [ concluidoEm,setConcluidoEm] = React.useState(null)

    const { data, loadingData, refetchData } = useApiRequestGet(`/listar-produto/${id}`);

    const situacao = data?.produtoConcluido || '';

    React.useEffect(() => {
        if (!loadingData && data) {
            setProdutoConcluido(data?.produtoConcluido || '');

        }
    }, [loadingData, data]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: '#1976d2',
        color: '#ffffff',
        fontSize: 14,
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5', // Cor de fundo para linhas ímpares
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [modalEtapaOpen, setModalEtapaOpen] = React.useState(false);
    const [modalConcluirOpen, setModalConcluirOpen] = React.useState(false);

    const handleEtapaOpen = () => {
        setModalEtapaOpen(true);
    };

    const handleEtapaClose = () => {
        setModalEtapaOpen(false);
    };

    const handleConcluirOpen = () => {
        setModalConcluirOpen(true);
    };

    const handleConcluirClose = () => {
        setModalConcluirOpen(false);
    };

    const CustomAlert = styled(Alert)(({ theme }) => ({
        backgroundColor: '#b9dab9',
    }));


    const criarEtapa = (e) => {

        const newData = {
            ...data,
            produtoConcluido: true,
            concluidoEm: new Date() 
        };

        
        e.preventDefault();
        setLoading(true);
        const data = {
            descricao: descricao,

        };

        api
            .post(`/criar-etapa/${id}`, newData)
            .then(() => {
                toast('Etapa criada com sucesso', {
                    type: 'success',
                    autoClose: 1000,
                });
                setTimeout(() => {
                    setLoading(false);
                    window.location.reload();
                }, 1000);
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

    };




    const concluirEtapa = (e) => {
        // produtoConcluido para true

        e.preventDefault();
        setLoading(true);

        data.produtoConcluido = true;
        data.concluidoEm = new Date()
        // const data = {
        //     produtoConcluido: produtoConcluido
        // };

        api
            .put(`/atualizar-produto/${id}`, data)
            .then(() => {
                toast('Bem concluído com sucesso', {
                    type: 'success',
                    autoClose: 1000,
                });
                // setTimeout(() => {
                //     setLoading(false);
                //     window.location.reload();
                // }, 3000);
            })

            .catch((error) => {
                console.log(error);

                setLoading(false);
            });
        console.log(data)

    };

    const formatDateToDDMMYYYY = (date) => {
        if (!date) return '';
        return format(new Date(date), 'dd-MM-yyyy');
      };
      const concluidoEmData = data?.concluidoEm || '';

      const formattedConcluidoEm = formatDateToDDMMYYYY(concluidoEmData);

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            style={{ zIndex: 9999 }}
            sx={{ padding: '100px' }}
        >
            {/* Conteúdo do Drawer */}
            <Stack
                direction='row'
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                padding={1.5}
            >
                <Typography component='h5'>Visualizar detalhes</Typography>

                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='close drawer view project'
                    onClick={handleDrawerClose}
                >
                    <Close color='action' />
                </IconButton>
            </Stack>
            <Divider />
            <Stack
                direction='row'
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                paddingY={1.5}
            >

                {situacao !== true && (
                    <><Button
                        startIcon={<AddCircle />}
                        variant='outlined'
                        color='success'
                        sx={{ marginLeft: 'auto', marginRight: '10px' }}
                        onClick={handleEtapaOpen}
                    >
                        Nova etapa
                    </Button><Button variant='outlined' onClick={concluirEtapa} sx={{ marginRight: '10px' }}>Concluir</Button></>
                )}



                {/* //atualizadoEm */}

                {situacao === true && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginLeft: '10px' }}>
                        <CustomAlert severity="success" >Bem concluído em: {formattedConcluidoEm}</CustomAlert>
                    </div>
                )}

            </Stack>

            <Box sx={{ width: 800 }} padding={1.5}>
                <p>Etapas:</p>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Descrição</StyledTableCell>
                                <StyledTableCell>Criado Em</StyledTableCell>
                                <StyledTableCell>Alterado Em</StyledTableCell>
                                <StyledTableCell>Usuário</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.etapa.map((etapa) => (
                                <TableRow key={etapa.id}>
                                    <TableCell>{etapa.descricao}</TableCell>

                                    <TableCell>
                                        {etapa.criadoEm ? `${etapa.criadoEm.slice(8, 10)}/${etapa.criadoEm.slice(5, 7)}/${etapa.criadoEm.slice(0, 4)}` : ''}
                                    </TableCell>
                                    <TableCell>
                                        {etapa.alteradoEm ? `${etapa.alteradoEm.slice(8, 10)}/${etapa.alteradoEm.slice(5, 7)}/${etapa.alteradoEm.slice(0, 4)}` : ''}
                                    </TableCell>
                                    <TableCell>{etapa.usuario.nome}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={modalEtapaOpen} onClose={handleEtapaClose} style={{ zIndex: 10000 }}>
                    <DialogTitle>
                        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2>Criar etapa</h2>
                            <IconButton edge='start' color='inherit' aria-label='close modal change password' onClick={handleEtapaClose}>
                                <Close color='action' />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent dividers style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }} sx={{ width: '500px' }}>
                        <Box component='form' noValidate onSubmit={criarEtapa}>

                            <Grid container columnSpacing={2} rowSpacing={2} >
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

                            </Grid>
                            <DialogActions>
                                <Button
                                    startIcon={<Close width={24} />}
                                    variant='outlined'
                                    color='info'
                                    onClick={handleEtapaClose}
                                    sx={{ minWidth: 156, height: '100%' }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type='submit'
                                    // disabled={loading || isButtonDisabled}
                                    startIcon={<SaveAltIcon width={24} />}
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

                {/* <Dialog open={modalConcluirOpen} onClose={handleConcluirClose} style={{ zIndex: 10000 }}>
                    <DialogTitle>
                        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2>Concluir Etapa</h2>
                            <IconButton edge='start' color='inherit' aria-label='close modal change password' onClick={handleConcluirClose}>
                                <Close color='action' />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent dividers style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }} sx={{ width: '500px' }}>
                        <Box component='form' noValidate onSubmit={concluirEtapa}>
                            <DialogContent sx={{ paddingTop: 1 }}>
                                CONCLUIR ETAPA
                            </DialogContent>
                        </Box>
                    </DialogContent>
                </Dialog> */}

                <ToastContainer />


            </Box>
        </Drawer>
    )
}