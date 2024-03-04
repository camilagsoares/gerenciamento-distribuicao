import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ContainerCards } from './style'
import { Link } from 'react-router-dom';


export const Cartao = () => {

    const [page, setPage] = useState(1);
    const cardsPerPage = 12;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const title = ""


    return (

        <ContainerCards>
            <Grid container spacing={2}>
                {[...Array(30)].slice(startIndex, endIndex).map((_, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Link to={`/detalhes`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ width: '100%', height: '370px' }} display="flex" alignItems="center" justifyContent="center">
                                <CardMedia
                                    sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                                    image="https://www.metalfrio.com.br/portal/Principal/arquivos/galeriaProdutos/8/DA550_LATERAL-VAZIO.jpg"
                                    title={title}
                                />
                                <CardContent sx={{ backgroundColor: 'white' }}>

                                    <Typography gutterBottom variant="h5" component="div">
                                        Título
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Descrição
                                    </Typography>

                                </CardContent>
                                <CardActions sx={{ backgroundColor: 'white', marginTop: '60px' }}>
                                    <Button size="small" variant="outlined" sx={{ fontFamily: 'Poppins' }}>Detalhes</Button>
                                </CardActions>

                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <Stack spacing={2} display="flex" alignItems="flex-end" marginTop="20px">
                <Pagination color="primary" count={Math.ceil(30 / cardsPerPage)} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" />
            </Stack>

        </ContainerCards>
    )
}