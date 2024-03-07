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
    tipoProdutoId: null, 
    statusId: null, 
    numeroPatrimonio: '',
    usuarioId: null, 
    imagem: null,
  });

  useEffect(() => {
    if (data && dataProduto) {
      setFormData(prevState => ({
        ...prevState,
        tipoProdutoId: dataProduto[0].id,
        statusId: data[0].id,
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
      await axios.post('http://10.1.0.187:4002/api/criar-produto', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Produto criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar o produto:', error); 
    }
  };

  return (
    <div>
      <h1>Criar Produto</h1>
      {data && dataProduto && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Nome:
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </label>
          <br />
          <label>
            Descrição:
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} />
          </label>
          <br />
          <label>
            Local onde encontra:
            <input type="text" name="localOndeEncontra" value={formData.localOndeEncontra} onChange={handleChange} />
          </label>
          <br />
          <label>
            Tipo de Produto ID:
            <input type="text" name="tipoProdutoId" value={formData.tipoProdutoId} onChange={handleChange} />
          </label>
          <br />
          <label>
            Status ID:
            <input type="text" name="statusId" value={formData.statusId} onChange={handleChange} />
          </label>
          <br />
          <label>
            Número de Patrimônio:
            <input type="text" name="numeroPatrimonio" value={formData.numeroPatrimonio} onChange={handleChange} />
          </label>
          <br />
          <label>
            Usuário ID:
            <input type="text" name="usuarioId" value={formData.usuarioId} onChange={handleChange} />
          </label>
          <br />
          <label>
            Imagem:
            <input type="file" name="imagem" onChange={handleFileChange} />
          </label>
          <br />
          <button type="submit">Criar Produto</button>
        </form>
      )}
    </div>
  );
}

export default Postar;
