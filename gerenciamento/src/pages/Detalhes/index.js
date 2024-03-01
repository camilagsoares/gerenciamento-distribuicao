import * as React from 'react'
import { Button } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { ContainerDetails, Box, Separete } from './style'

export const Detalhes = () => {
    return (
        <div>
            <Link to="/">
                <Button
                    variant="outlined"
                    startIcon={<ChevronLeftIcon />}
                    sx={{marginLeft: '1vw'}}

                >
                    Voltar para página inicial
                </Button>
            </Link>

            <ContainerDetails>
                {/* <Box>
            Pagina detalhes
            </Box> */}


                <Separete>
                    <div>
                        <p>IMAGEM</p>
                    </div>

                    <p>Texto

                        <Button>Reservar</Button>
                    </p>
                </Separete>
            </ContainerDetails>
        </div>
    )
}