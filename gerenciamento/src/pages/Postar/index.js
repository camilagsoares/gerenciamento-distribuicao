// POSTAR
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApiRequestGet } from '../../services/api';
import { InputField, Input, ContainerSelect, CardInput, ContainerButton, Container, Card, ArrowIcon, Title, Label, } from './style'
import { Box, Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputData, Underline } from '../Cadastro/style';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Postar() {

  const { data } = useApiRequestGet("/listar-status");
  const { data: dataProduto } = useApiRequestGet("/listar-tipoproduto");

  const tokenInStorage = localStorage.getItem('token');
  console.log("tokenInStorage", tokenInStorage)

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    localOndeEncontra: '',
    tipoProdutoId: null,
    // statusId: null,
    numeroPatrimonio: '',
    imagem: null,
  });

  useEffect(() => {
    if (data && dataProduto) {
      setFormData(prevState => ({
        ...prevState,
        tipoProdutoId: dataProduto[0].id,
        // statusId: data[0].id,
      }));
    }
  }, [data, dataProduto]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, imagem: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    try {
      await axios.post('http://10.1.0.187:3000/api/criar-produto', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tokenInStorage}`
        },
      });
      console.log('Produto criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
    }
    console.log(formPayload)
  };

  return (
    <Container>
      <Card>
        <ArrowIcon>
          <EditIcon style={{ color: 'white' }} />
        </ArrowIcon>

        <Title color="#1976D2">Poste um bem</Title>

        <form component='form' onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InputField>
                <label>Nome</label> <br />

                <Input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} />

              </InputField>
            </Grid>

            <Grid item xs={6}>
              <InputField>
                <label>Local onde Encontra</label> <br />

                <Input type="text" name="localOndeEncontra" placeholder='Local onde encontra' value={formData.localOndeEncontra} onChange={handleChange} />

              </InputField>
            </Grid>
            <Grid item xs={6}>
              <InputField>
                <label>Descrição</label> <br />
                <Input name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />

              </InputField>
            </Grid>

            <Grid item xs={6}>

              <InputField>
                <label>Tipo Produto</label> <br />
                <Select name="tipoProdutoId" value={formData.tipoProdutoId} onChange={handleChange}>
                  {dataProduto && dataProduto.map(item => (
                    <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </InputField>



            </Grid>


          </Grid>

          {/* <InputField>

            <label>Status ID</label>
            <select name="statusId" value={formData.statusId} onChange={handleChange}>
              {data && data.map(item => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </InputField> */}

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ContainerSelect>
                <label>Nome</label> <br />

                <Input type="text" placeholder='Número Patrimônio' name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} />

              </ContainerSelect>


            </Grid>

            <Grid item xs={6}>
              <ContainerSelect>
                <br />
                <input type="file" name="imagem" onChange={handleFileChange} />

              </ContainerSelect>

            </Grid>

          </Grid>

          <ContainerButton>
            <Button variant="outlined" type="submit" fullWidth style={{ height: '50px' }}>Postar</Button>
          </ContainerButton>
        </form>
      </Card>
    </Container>
  );
}

export default Postar;
