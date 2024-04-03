import * as React from 'react';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { Product, ProductDetails, ProductImages, Cta, BtnPrimary, ProductImageWrapper, ProductImage, ImageOverlay } from './style';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useApiRequestGet, api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Alert from '@mui/material/Alert';


export const Detalhes = () => {

  let { id } = useParams();

  const { data } = useApiRequestGet(`/listar-produto/${id}`);
  console.log(data)

  const CustomAlertError = styled(Alert)(({ theme }) => ({
    backgroundColor: '#ffada4',
  }));


  const status = data?.situacao || '';
  const inativo = status === 'INATIVO';

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    margin: 0 auto;
    margin-top: 48px;
`;

  const InnerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 900px;
    height: 600px;
    background: #fff;
    margin: 20px;
`;

  const ImgBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background: ${props => props.backgroundColor};
    transition: .3s linear;
`;

  const Image = styled.img`
    position: relative;
   max-width:100%;
`;

  const Details = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px;
`;

  const Content = styled.div``;

  const Title = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 2.4em;
    line-height: 1em;
    color: ${props => props.color};
`;

  const Subtitle = styled.span`
    font-size: 0.4em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #999;
`;

  const Description = styled.p`
    max-width: 85%;
    margin-left: 15%;
    color: #333;
    font-size: 15px;
    margin-bottom: 36px;
`;

  const ButtonStyle = styled.button`
    background: #318CE7;
    color: #fff;
    border: none;
    outline: none;
    padding: 15px 20px;
    margin-top: 5px;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 300;
    border-radius: 40px;
    float: right;
    transition: background-color 1s;
    
    &:hover{
      background-color: #0058B8;
    }
`;



  const [currentColor, setCurrentColor] = React.useState('#000');
  const [background, setBackground] = React.useState('#212121');

  const reserva = () => {

    //id od usuario
    //produtoId

    api
      .post(`criar-reserva/${data.id}`, data)
      .then(() => {
        toast.success('Bem reservado com sucesso!', {
          autoClose: 2000
        });
        console.log("deu certo")
      })
      .catch((error) => {
        console.log("deu certo")

      });

  }

  return (
    <div>

      <Link to="/">
        <Button
          variant="outlined"
          startIcon={<ChevronLeftIcon />}
          sx={{ marginLeft: '1vw' }}
        >
          Voltar para página inicial
        </Button>
      </Link>

      {data && <Container>
        <InnerContainer>
          <ImgBox backgroundColor={background}>
            <Image src={data.imagem} alt={data.nome} />
          </ImgBox>
          <Details>
            <Content>
              <Title color={currentColor}>{data.nome} <br /><Subtitle>
                {data.criadoEm.slice(8, 10)}-{data.criadoEm.slice(5, 7)}-{data.criadoEm.slice(0, 4)}
              </Subtitle>
              </Title>
              <Description>
                {data.descricao}
              </Description>
              <div className="product-colors">
                <p>Tipo de Produto: {data.tipoProduto.nome}</p>
                <p>Número de Patrimônio: {data.numeroPatrimonio}</p>
              </div>
              <div className="product-colors">
                <ul>
                  <li>Tipo</li>
                  <li>Local onde encontrar: {data.localOndeEncontra}</li>
                  <li>Situação: {data.situacao}</li>
                  <li>Número de Série: {data.numeroSerie}</li>
                  <li>Status: {data.status.nome}</li>
                  <li>Usuário: {data.usuario.nome}</li>
                </ul>
              </div>
              
              {!inativo && (<ButtonStyle onClick={reserva}>Reservar</ButtonStyle>)}

              <ToastContainer />
              {inativo && (
                <CustomAlertError severity="error">Bem reservado</CustomAlertError>
              )}
            </Content>
          </Details>
        </InnerContainer>
      </Container>
      }
    </div>
  )
}