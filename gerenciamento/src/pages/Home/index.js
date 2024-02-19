import React from "react";
import { Container, CardItem } from './style'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Home = () => {




    return (
        <div>
            Home
            <Container>
                <Card sx={{ width: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://qvim.itajuba.mg.gov.br/_next/static/media/logo-itajuba.1b07fad3.png"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Título
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Descrição
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Detalhes</Button>
                        <Button size="small">Reservar</Button>
                    </CardActions>
                </Card>

            </Container>
        </div>
    )
}