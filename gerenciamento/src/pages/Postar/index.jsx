import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApiRequestGet } from '../../services/api';
import { InputField, Input, ContainerSelect,  ContainerButton, Container, Card, ArrowIcon, Title,  FileImage, FileInput, LabelUpload } from './style'
import { Grid, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { InputData, Underline } from '../Cadastro/style';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';
// import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Postar() {

  const sessionUser = JSON.parse(localStorage.getItem('session'))
  const { data } = useApiRequestGet("/listar-status");
  const { data: dataProduto } = useApiRequestGet("/listar-tipoproduto");

  const { data: dadoUsuario } = useApiRequestGet("/auth");
  // console.log("dadoUsuario",dadoUsuario[0].id)
  const tokenInStorage = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    // localOndeEncontra: '',
    tipoProdutoId: null,
    usuarioMandarProduto_id: null,
    // statusId: null,
    numeroPatrimonio: '',
    imagem: null,
  });


  useEffect(() => {
    if (dataProduto && dataProduto.length > 0 && dadoUsuario && dadoUsuario.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        tipoProdutoId: dataProduto[0].id,
        usuarioMandarProduto_id: dadoUsuario[0].id
      }));
    }
  }, [dataProduto, dadoUsuario]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value === 'Nenhum' ? null : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue,
      // usuarioMandarProduto_id: newValue
    }));
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   const newValue = value === 'Nenhum' ? null : value;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: newValue
  //   }));
  // };

  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFormData({ ...formData, imagem: event.target.files[0] });
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formPayload.append(key, value);
      }
    });

    try {
      await axios.post('http://10.1.0.187:3000/api/criar-produto', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tokenInStorage}`
        },
      });
      toast.success('Bem criado com sucesso!', {
        autoClose: 2000
      });
      console.log('Produto criado com sucesso');
    } catch (error) {
      toast(error.response.data.message, {
        type: 'error',
      });
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
                <label>Descrição</label> <br />
                <Input name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />

              </InputField>
            </Grid>

            <Grid item xs={6}>
              <InputField>
                <label>Tipo Produto</label> <br />
                <Select fullWidth name="tipoProdutoId" value={formData.tipoProdutoId || ''} onChange={handleChange}>
                  {dataProduto && dataProduto.map(item => (
                    <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </InputField>
            </Grid>

            

            {sessionUser.permissaoId === "e6d935c0-fc71-4918-b609-8785773d02f2" &&
              <Grid item xs={6}>
                <InputField>
                  <label>Enviar a um usuário específico</label>  <br />
                  <Select fullWidth name="usuarioMandarProduto_id" value={formData.usuarioMandarProduto_id} onChange={handleChange}>
                    <MenuItem value="Nenhum">Nenhum</MenuItem> 
                    <MenuItem value="">Por favor selecione</MenuItem>
                    {dadoUsuario && dadoUsuario.map(user => (
                      <MenuItem key={user.id} value={user.id}>{user.nome}</MenuItem>
                    ))}
                  </Select>


                </InputField>
              </Grid>
            }
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ContainerSelect>
                <label>Número Patrimônio</label> <br />
                <Input type="text" placeholder='Número Patrimônio' name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} />
              </ContainerSelect>

            </Grid>

            <Grid item xs={6}>
              <ContainerSelect>
                <LabelUpload htmlFor="file-upload">
                  {!preview && <CloudUploadIcon fontSize="large" sx={{ color: '#318ce7' }} />}
                  <FileImage src={preview && URL.createObjectURL(file)} preview={preview} alt="Preview" />
                  {!preview && <div>Selecione um arquivo ou arraste aqui</div>}
                </LabelUpload>

                <FileInput id="file-upload" type="file" name="fileUpload" accept="image/*" onChange={handleFileChange} />
              </ContainerSelect>

            </Grid>

          </Grid>

          <ContainerButton>
            <Button variant="outlined" type="submit" fullWidth style={{ height: '50px' }}>Postar</Button>
          </ContainerButton>

          <ToastContainer />

        </form>
      </Card>
    </Container>
  );
}

export default Postar;
