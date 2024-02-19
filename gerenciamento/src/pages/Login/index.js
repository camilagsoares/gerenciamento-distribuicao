import React, { useState } from 'react'
import * as imports from "./imports"

const Login = () => {


    // const schema = yup
    //     .object({
    //         email: yup.string().email('E-mail inválido').required('Campo obrigatorio'),
    //         senha: yup.string().min(4, 'Mínimo 4 caracteres').required('Campo obrigatorio'),
    //     })
    //     .required();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <imports.Grid container component='main' sx={{ height: '100vh' }}>
            <imports.Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(itajuba-cover-image.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <imports.Grid item xs={12} sm={8} md={5} component={imports.Paper} square>
                <imports.Box
                    sx={{
                        height: '100%',
                        marginX: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <imports.Box
                        xs={12}
                        sm={4}
                        md={7}
                        width={320}
                        height={109}
                        marginY={8}
                    // sx={{
                    // backgroundImage: 'url(logo-itajuba.png)',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // }}
                    />
                    <imports.Typography component='h1' variant='h5' fontWeight={700}>
                        Login
                    </imports.Typography>
                    <imports.Box component='form' noValidate sx={{ marginTop: 1 }}>
                        <imports.TextField
                            //   {...register('email')}
                            //   disabled={loading}
                            required
                            fullWidth
                            autoFocus
                            id='email'
                            label='E-mail'
                            margin='normal'
                            type='email'
                        //   error={!!errors.email}
                        //   helperText={errors.email?.message}
                        />
                        <imports.FormControl variant="outlined">
                            <imports.InputLabel htmlFor="outlined-adornment-password">Password</imports.InputLabel>
                            <imports.OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <imports.InputAdornment position="end">
                                        <imports.IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <imports.VisibilityOff /> : <imports.Visibility />}
                                        </imports.IconButton>
                                    </imports.InputAdornment>
                                }
                                label="Password"
                            />
                        </imports.FormControl>
                        <imports.Button
                            //   disabled={loading}
                            fullWidth
                            type='submit'
                            variant='contained'
                            // color='#0DE64A'
                            size='large'
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Entrar
                            {/* {!loading ? 'Entrar' : <CircularProgress color='success' size={26} />} */}
                        </imports.Button>
                        <imports.Button
                            //   disabled={loading}
                            fullWidth
                            type='submit'
                            variant='contained'
                            // color='#90caf9'
                            size='large'
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                           Cadastrar
                            {/* {!loading ? 'Entrar' : <CircularProgress color='success' size={26} />} */}
                        </imports.Button>
                    </imports.Box>
                </imports.Box>
            </imports.Grid>
        </imports.Grid>
    )
}

export default Login