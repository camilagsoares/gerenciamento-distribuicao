import React, { useState} from 'react';
import axios from 'axios';
import { Container, Card, ArrowIcon, Title, ContainerButton } from './style'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/base';

function Postar() {

  // const { data } = useApiRequestGet("/listar-status");
  // const { data: dataProduto } = useApiRequestGet("/const [tipoProdutoId, setTipoProdutoId] = useState('1d8cdc9b-ee76-4cc4-94ed-5e5c13912e0a');
  // listar-tipoproduto");
  // const [tipoProdutoId, setTipoProdutoId] = useState('1d8cdc9b-ee76-4cc4-94ed-5e5c13912e0a');
  // const [statusId, setStatusId] = useState('dd5c799d-5166-4db2-bf49-bb854db59704');
  // http://10.1.0.187:3000/api/criar-produto

  const [session, setSession] = React.useState(JSON.parse(localStorage.getItem('session')) || null);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localOndeEncontra, setLocalOndeEncontra] = useState('');
  const [numeroPatrimonio, setNumeroPatrimonio] = useState('');
  const [imagem, setImagem] = useState(null);
  const [tipoProdutoId, setTipoProdutoId] = useState('1d8cdc9b-ee76-4cc4-94ed-5e5c13912e0a');
  const [statusId, setStatusId] = useState('dd5c799d-5166-4db2-bf49-bb854db59704');
  const [usuarioId, setUsuarioId] = useState(session.id)


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('localOndeEncontra', localOndeEncontra);
    formData.append('tipoProdutoId', tipoProdutoId);
    formData.append('numeroPatrimonio', numeroPatrimonio);
    formData.append('statusId', statusId);
    formData.append('imagem', imagem);
    formData.append('usuarioId', usuarioId);
    try {
      await axios.post('http://10.1.0.187:3000/api/criar-produto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Produto criado com sucesso!');
      // Adicione aqui qualquer lógica adicional após a criação do produto
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };
  return (
    <Container>
      <Card>
        <ArrowIcon>
          <EditIcon style={{ color: 'white' }} />
        </ArrowIcon>
        <Title color="#1976D2">Poste um bem</Title>

        <form onSubmit={handleSubmit}>

          <label>Nome</label>
          <input type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <br /> <br />

          <label>Descrição</label>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <br /> <br />

          <label>Local onde encontra</label>
          <input
            type="text"
            placeholder="Local onde Encontra"
            value={localOndeEncontra}
            onChange={(e) => setLocalOndeEncontra(e.target.value)}
          />
          <br /> <br />

          <label>Tipo de produto ID</label>
          <input
            type="text"
            placeholder="Tipo de Produto ID"
            value={tipoProdutoId}
            onChange={(e) => setTipoProdutoId(e.target.value)}
          />
          <br /> <br />
          <label>Número de Patrimônio</label>

          <input
            type="text"
            placeholder="Número de Patrimônio"
            value={numeroPatrimonio}
            onChange={(e) => setNumeroPatrimonio(e.target.value)}
          />

          <br /> <br />

          <label>Status ID</label>
          <input
            type="text"
            placeholder="Status ID"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
          />

          <br /> <br />
          <label>Usuario ID</label>
          <input
            type="text"
            placeholder="Usuario ID"
            value={statusId}
            onChange={(e) => setUsuarioId(e.target.value)}
          />

          <br /> <br />
          <input
            type="file"
            onChange={(e) => setImagem(e.target.files[0])}
          />

          <br /> <br />
          
          <ContainerButton>
            <Button type="submit" fullWidth style={{ height: '50px' }}>Criar Produto</Button>
          </ContainerButton>
        </form>

      </Card>
    </Container>
  );
}

export default Postar;
