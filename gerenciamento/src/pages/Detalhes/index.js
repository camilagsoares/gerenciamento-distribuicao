import * as React from 'react';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { Product, ProductDetails, ProductImages, Cta, BtnPrimary, ProductImageWrapper, ProductImage, ImageOverlay } from './style';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useApiRequestGet } from "../../services/api";


export const Detalhes = () => {

    let { id } = useParams();

    const { data } = useApiRequestGet(`/listar-produto/${id}`);


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

            <Product>
                <ProductImages>
                    <ImageOverlay  $showoverlay={String(!data)}>
                        {data && (
                            <ProductImageWrapper>
                                <ProductImage src={data.imagem} alt={data.nome} />
                            </ProductImageWrapper>
                        )}
                    </ImageOverlay>
                </ProductImages>
                <ProductDetails>
                    {data && (
                        <>
                            <h2>{data.nome}</h2>
                            <div className="about">
                                <p>Criado em: {data.criadoEm ? `${data.criadoEm.slice(8, 10)}/${data.criadoEm.slice(5, 7)}/${data.criadoEm.slice(0, 4)}` : ''}</p>
                                <p>Tipo de Produto: {data.tipoProduto.nome}</p>
                                <p>Número de Patrimônio: {data.numeroPatrimonio}</p>
                            </div>
                            <p>{data.descricao}</p>
                            <ul>
                                <li>Tipo</li>
                                <li>Local onde encontrar: {data.localOndeEncontra}</li>
                                <li>Situação: {data.situacao}</li>
                                <li>Número de Série: {data.numeroSerie}</li>
                                <li>Status: {data.status.nome}</li>
                                <li>Usuário: {data.usuario.nome}</li>
                            </ul>
                        </>
                    )}
                    <Cta>
                        <BtnPrimary>Reservar</BtnPrimary>
                    </Cta>
                </ProductDetails>
            </Product>

        </div>
    )
}