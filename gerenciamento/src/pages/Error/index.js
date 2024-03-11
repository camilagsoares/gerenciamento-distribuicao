import { Container, Button } from './styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Error() {


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container>
                <Grid container >
                    <Grid>
                        <h1>
                            404
                        </h1>
                        <Typography variant="h6">
                            A página que você procura não existe.
                        </Typography>

                        <Link to="/">
                            <Button>

                                Voltar para o início

                            </Button>
                        </Link>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Error