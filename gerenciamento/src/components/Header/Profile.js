import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ModalPerfilUsuario from "./ModalPerfilUsuario"
import ModalAlterarSenha from './ModalAlterarSenha';



export default function Profile() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenProfile, setModalOpenProfile] = useState(false)
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

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

    const handleCloseModalProfile = () => {
        setModalOpenProfile(false);
    };

    const handleClickOpenModalProfile = () => {
        setModalOpenProfile(true);
        handleClose();
    };






    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Configurações de Conta">
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
                <MenuItem onClick={handleClickOpenModalProfile}>
                    <ListItemIcon>
                        <PermContactCalendarIcon fontSize="small" />
                    </ListItemIcon>
                    Minha conta
                </MenuItem>

                <MenuItem onClick={handleClickOpenModal}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Alterar senha
                </MenuItem>

                <Divider />
                
                {!token && <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LoginIcon fontSize="small" />
                        </ListItemIcon>
                        Entrar
                    </MenuItem>
                </Link>}

                <Link to="/cadastro" style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Cadastro
                    </MenuItem>
                </Link>
            </Menu>

            {modalOpen && <ModalAlterarSenha open={modalOpen} onClose={handleCloseModal} />}

            {modalOpenProfile && <ModalPerfilUsuario open={modalOpenProfile} onClose={handleCloseModalProfile} />}

        </React.Fragment >
    );
}