import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApiRequestGet } from '../../services/api'; 

function Postar() {

  const { data } = useApiRequestGet("/listar-status");
  const { data: dataProduto } = useApiRequestGet("/listar-tipoproduto");

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    localOndeEncontra: '',
    tipoProdutoId: '1d8cdc9b-ee76-4cc4-94ed-5e5c13912e0a', 
    statusId: 'dd5c799d-5166-4db2-bf49-bb854db59704', 
    numeroPatrimonio: '',
    usuarioId: null, 
    imagem: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('descricao', formData.descricao);
    data.append('localOndeEncontra', formData.localOndeEncontra);
    data.append('tipoProdutoId', formData.tipoProdutoId);
    data.append('statusId', formData.statusId);
    data.append('numeroPatrimonio', formDatsa.numeroPatrimonio);
    data.append('usuarioId', formData.usuarioId);

    data.append('image', formData.imagem);
    console.log("data",data )

    try {
      await axios.post('http://10.1.0.187:3000/api/criar-produto', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Produto criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div>
      <h1>Criar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>descricao:</label>
          <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>
        <div>
          <label>localOndeEncontra:</label>
          <input type="text" name="localOndeEncontra" value={formData.localOndeEncontra} onChange={handleChange} required />
        </div>
        <div>
          <label>numeroPatrimonio:</label>
          <input type="text" name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} required />
        </div>
        <div>
          <label>StatusId:</label>
          <textarea name="description" value={formData.statusId} onChange={handleChange} required />
        </div>
        <div>
          <label>tipoProdutoId:</label>
          <textarea name="description" value={formData.tipoProdutoId} onChange={handleChange} required />
        </div>
        <div>
          <label>Imagem:</label>
          <input type="file" name="image" onChange={handleChange} required />
        </div>
        <button type="submit">Criar Produto</button>
      </form>
    </div>
  );
}

export default Postar;
