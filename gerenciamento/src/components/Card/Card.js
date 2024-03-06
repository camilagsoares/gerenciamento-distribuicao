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
import { useApiRequestGet } from "../../services/api";


export const Cartao = ({ searchTerm }) => {

    const { data } = useApiRequestGet("/listar-produtos");

    const [page, setPage] = useState(1);

    const cardsPerPage = 12;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return (

        <ContainerCards>
            <Grid container spacing={2}>
                {data && data.slice(startIndex, endIndex).map((produto, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Link to={`/detalhes/${produto.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ width: '100%', height: '400px', '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>

                                <img src={produto.imagem}
                                    alt={produto.nome}
                                    style={{ height: '200px', objectFit: 'cover' }}

                                />

                                <CardContent sx={{ backgroundColor: 'white', maxHeight: '300px', overflowY: 'auto' }}>

                                    <Typography gutterBottom variant="h5" component="div">
                                        {produto.nome}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {produto.descricao}
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