import * as React from 'react'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Close from '@mui/icons-material/CloseOutlined';
import Save from '@mui/icons-material/SaveAltOutlined';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ModalAlterarSenha = (props) => {

    // const {  open,onClose} = props;
    const [loading, setLoading] = React.useState(false);


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


    };
    const { errors } = formState;

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (

        <BootstrapDialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Alterar senha
            </DialogTitle>
            <IconButton
                aria-label="close"
                // open={open} onClose={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                onClick={props.onClose}
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
                        onClick={props.onClose}

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
    )
}

export default ModalAlterarSenha