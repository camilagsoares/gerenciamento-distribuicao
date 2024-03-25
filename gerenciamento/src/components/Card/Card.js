import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Pagination, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ContainerCards } from './style'
import { Link } from 'react-router-dom';
import { useApiRequestGet } from "../../services/api";
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';


export const Cartao = () => {
    const sessionUser = JSON.parse(localStorage.getItem('session'))
    console.log(sessionUser)
    const { data } = useApiRequestGet(sessionUser ? "/listar-produtos-permissao" : "/listar-produtos");
    console.log(data)
    // const { data } = useApiRequestGet("/listar-produtos");

    // const { data: dataProduto } = useApiRequestGet("/listar-produtos-permissao");


    // const { data } = useApiRequestGet("/listar-produtos-permissao");



    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const cardsPerPage = 12;

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const filteredData = data ? data.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.trim().toLowerCase())
    ) : [];

    return (

        <ContainerCards>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <TextField

                    label="Buscar Produto"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon color="action" />
                        ),
                    }}
                />
            </Box>

            <Grid container spacing={2}>
                {filteredData && filteredData.slice(startIndex, endIndex).map((produto, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Link to={`/detalhes/${produto.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ width: '100%', height: '400px', '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={produto.imagem}
                                />

                                <CardContent sx={{ backgroundColor: 'white', maxHeight: '300px', overflowY: 'auto' }}>

                                    <Typography gutterBottom variant="h5" component="div">
                                        {produto.nome}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {produto.descricao}
                                    </Typography>

                                </CardContent>
                                <CardActions sx={{ backgroundColor: 'white', marginTop: '130px' }}>
                                    <Button size="small" variant="outlined" sx={{ fontFamily: 'Poppins' }}>Detalhes</Button>
                                </CardActions>

                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <Stack spacing={2} display="flex" alignItems="flex-end" marginTop="20px">
                <Pagination color="primary" count={Math.ceil(filteredData.length / cardsPerPage)} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" />
            </Stack>

        </ContainerCards>
    )
}