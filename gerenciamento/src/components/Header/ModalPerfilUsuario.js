import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalPerfilUsuario(props) {

  const [loading, setLoading] = React.useState(false);

  const sessionUser = JSON.parse(localStorage.getItem('session'))
  console.log("sessionUser",sessionUser)

  return (
    <React.Fragment  >

      <BootstrapDialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        PaperProps={{
          sx: {
            width: '500px',
            height: '340px'
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ paddingTop: 1, marginTop: 7 }}>
          <Box marginBottom={3}>

            <Stack direction='column' spacing={1} alignItems='center'>
              <Avatar alt='Foto Perfil' src='*' sx={{ width: 64, height: 64, bgcolor: 'ButtonShadow' }}>
                {loading ? (
                  <Skeleton variant='circular' width={40} height={40} />
                ) : (
                  <AccountCircle sx={{ width: 64, height: 64 }} color='primary' />
                )}
              </Avatar>
              <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: '2.5rem' }}>
                {loading ? <Skeleton variant='text' sx={{ fontSize: '2.65rem', width: 272 }} /> : `${sessionUser.nome}`}
              </Typography>
              <Typography variant='h5' color='text.secondary' sx={{ fontSize: '2rem'}} >
                {loading ? <Skeleton variant='text' sx={{ fontSize: '2rem', width: 272 }} /> : `${sessionUser.email}`}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ fontSize: '1.375rem'}}>
                {loading ? <Skeleton variant='text' sx={{ fontSize: '1.375rem', width: 272 }} /> : `${sessionUser.telefone}`}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}