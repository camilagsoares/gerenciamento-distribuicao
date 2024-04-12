import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Pagination, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ContainerCards, BolinhaVerde, BolinhaVermelha, StatusProduct } from './style'
import { Link } from 'react-router-dom';
import { useApiRequestGet } from "../../services/api";
import SearchIcon from '@mui/icons-material/Search';
import CardMedia from '@mui/material/CardMedia';
import { MenuItem } from '@mui/material';
import styled from 'styled-components';


export const Cartao = () => {
    //280 - 335
    // 900 - 1040
    const sessionUser = JSON.parse(localStorage.getItem('session'))
    const [token, setToken] = React.useState(localStorage.getItem('token') || null);


    const { data } = useApiRequestGet(sessionUser && token ? "/listar-produtos-permissao" : "/listar-produtos");


    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('todos');
    const [tipoProdutoFilter, setTipoProdutoFilter] = useState('todos');
    const [tipoProdutos, setTipoProdutos] = useState([]);

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

    // const filteredData = data ? data.filter(produto =>
    //     produto.nome.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    //     produto.descricao.toLowerCase().includes(searchTerm.trim().toLowerCase())
    // ) : [];

    useEffect(() => {
        if (data) {
            const newData = data.filter(produto =>
                (produto.nome.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                    produto.descricao.toLowerCase().includes(searchTerm.trim().toLowerCase())) &&
                (statusFilter === 'todos' || produto.status.nome.toLowerCase() === statusFilter.toLowerCase())
            );
            setFilteredData(newData);
        }
    }, [data, searchTerm, statusFilter]);

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    useEffect(() => {
        if (data) {
            setFilteredData(data);
            const tiposUnicos = [...new Set(data.map(produto => produto.tipoProduto.nome))];
            setTipoProdutos(tiposUnicos);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const newData = data.filter(produto =>
                (produto.nome.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                    produto.descricao.toLowerCase().includes(searchTerm.trim().toLowerCase())) &&
                (statusFilter === 'todos' || produto.status.nome.toLowerCase() === statusFilter.toLowerCase()) &&
                (tipoProdutoFilter === 'todos' || produto.tipoProduto.nome.toLowerCase() === tipoProdutoFilter.toLowerCase())
            );
            setFilteredData(newData);
        }
    }, [data, searchTerm, statusFilter, tipoProdutoFilter]);


    const handleTipoProdutoFilterChange = (e) => {
        setTipoProdutoFilter(e.target.value);
    };

    const getBackgroundColor = (cor) => {
        return cor === 'green' ? '#dff5df' : '#fae9e3';
    };


    const TextoComCorDeFundo = styled.p`
  background-color: ${(props) => getBackgroundColor(props.cor)};
  border-radius: 4px;
`;
    return (

        <ContainerCards>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>

                <TextField
                    select
                    label="Tipo de produto"
                    value={tipoProdutoFilter}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    onChange={handleTipoProdutoFilterChange}
                    sx={{ width: '200px' }}
                >
                    <MenuItem value="todos">Todos</MenuItem>
                    {tipoProdutos.map(tipo => (
                        <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    sx={{ marginRight: '10px', marginLeft: '10px', width: '200px' }}
                    select
                    label="Filtrar por status"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    variant="outlined"
                    size="small"
                    margin="normal"
                >
                    <MenuItem value="todos">Todos</MenuItem>
                    <MenuItem value="disponível">Disponível</MenuItem>
                    <MenuItem value="reservado">Reservado</MenuItem>
                </TextField>

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

                {filteredData && filteredData.slice(startIndex, endIndex).map((produto, index) => {
                    return (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <Link to={`/detalhes/${produto.id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ width: '100%', height: '500px', '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' } }}>

                                    <CardMedia
                                        component="img"
                                        height="340"
                                        image={produto.imagem} />
                                    {/* <img
                                        height="320"
                                        width="100%"
                                        src={produto.imagem} /> */}
                                    <CardContent sx={{ backgroundColor: 'white', maxHeight: '200px', overflowY: 'auto' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {produto.nome}
                                        </Typography>

                                        {/* <Typography variant="body2" color="text.secondary">
                                            {produto.descricao}
                                            {produto.descricao.substring(0, 100)}


                                        </Typography> */}
                                        <Typography variant="body2" color="text.secondary">
                                            <TextoComCorDeFundo cor={produto.situacaoDeReserva === 'DISPONIVEL' ? 'green' : 'red'}>
                                                {produto.situacaoDeReserva === 'DISPONIVEL' ? (
                                                    <BolinhaVerde className="BolinhaVerde" />
                                                ) : (
                                                    <BolinhaVermelha className="BolinhaVerde" />
                                                )}{' '}
                                                {produto.situacaoDeReserva}
                                            </TextoComCorDeFundo>
                                            <span> {produto.descricao}</span>

                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>


                            <Box sx={{
                                backgroundColor: 'transparent',
                                marginTop: '-64px',
                            }}>

                                <Link to={`/detalhes/${produto.id}`} >
                                    <Button size="small" variant="outlined" sx={{ fontFamily: 'Poppins', margin: '20px' }}>Detalhes</Button>
                                </Link>
                            </Box>
                        </Grid>
                    );
                })}

            </Grid>

            <Stack spacing={2} display="flex" alignItems="flex-end" marginTop="20px">
                <Pagination color="primary" count={Math.ceil(filteredData.length / cardsPerPage)} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" />
            </Stack>

        </ContainerCards>
    )
}