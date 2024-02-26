import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Save from '@mui/icons-material/SaveAltOutlined';
import Close from '@mui/icons-material/CloseOutlined';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function Profile() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleClickOpenModal = () => {
        setModalOpen(true);
        handleClose();
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    //
    const schema = yup
        .object({
            senha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres').max(32, 'Máximo 32 caracteres'),
            // confirmarSenha: yup.string().required('Campo obrigatorio').min(5, 'Mínimo 5 caracteres').max(32, 'Máximo 32 caracteres').oneOf([yup.ref('senha'), null], 'Senhas não coicidem'),
        }).required();


    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { senha: '', confirmarSenha: '' },
    });

    const handleConfirmarAlteracaoSenha = (data) => {
        // setLoading(true);
        // const { senha, confirmarSenha } = data;
        // if (senha !== confirmarSenha) {
        //   // Senha e confirmação de senha não coincidem, exiba um erro
        //   toast('A confirmação de senha não coincide com a senha.', {
        //     type: 'error',
        //   });
        //   setLoading(false);
        //   return;
        // }
        // axiosApi
        //   .put(`/auth/usuario-senha/${session.id}`, { senha })
        //   .then(() => {
        //      toast('Senha alterada com sucesso', {
        //      type: 'success',
        //      });

        //     reset();
        //     // handleFecharModalForm();
        //   }) 
        //   .catch((error) => {
        //      toast(error.message, {
        //        type: 'error',
        //     });
        //   })
        //   .finally(() => {
        //     setLoading(false);
        //   });


    };
    const { errors } = formState;

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PermContactCalendarIcon fontSize="small" />
                        </ListItemIcon>
                        Minha conta
                    </MenuItem>
                </Link>

                <MenuItem onClick={handleClickOpenModal}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>

                    Alterar senha
                </MenuItem>
                <Divider />
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LoginIcon fontSize="small" />
                        </ListItemIcon>
                        Entrar
                    </MenuItem>
                </Link>

                <Link to="/cadastro" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Cadastro
                    </MenuItem>
                </Link>
            </Menu>

            <BootstrapDialog
                onClose={handleCloseModal}
                aria-labelledby="customized-dialog-title"
                open={modalOpen}            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Alterar senha
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box component='form' noValidate onSubmit={handleSubmit(handleConfirmarAlteracaoSenha)}>
                    <DialogContent dividers sx={{ paddingTop: 1 }}>
                        <Grid container columnSpacing={2} rowSpacing={2} paddingTop={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    {...register('senha')}
                                    autoFocus
                                    fullWidth
                                    required
                                    label='Senha'
                                    type='password'
                                    error={!!errors.senha}
                                    helperText={errors.senha?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    {...register('confirmarSenha')}
                                    fullWidth
                                    required
                                    label='Confirmação senha'
                                    type='password'
                                    error={!!errors.confirmarSenha}
                                    helperText={errors.confirmarSenha?.message}
                                />
                                {/* {isAlertVisible && <Alert severity='success'>Senha alterada com sucesso!</Alert>} */}
                            </Grid>
                        </Grid>
                        {/* {error && (
              <Box display='flex' flexDirection='row' gap={4} color='red' fontSize={14}>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </Box>
            )} */}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disabled={loading}
                            startIcon={<Close />}
                            variant='outlined'
                            color='info'
                            onClick={handleCloseModal}
                        //   onClick={handleFecharModalForm}
                        >
                            Cancelar
                        </Button>
                        <Button
                            startIcon={<Save />}
                            disabled={loading}
                            type='submit' variant='outlined' color='success'>
                            {!loading ? 'Salvar' : <CircularProgress color='success' size={26} />}
                        </Button>
                    </DialogActions>
                </Box>
                <DialogActions>

                </DialogActions>
            </BootstrapDialog>
        </React.Fragment >
    );
}