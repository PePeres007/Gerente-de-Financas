import { useState } from 'react';
import { api } from '../../Services/Api';

export default function FormularioPessoa() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post('/pessoas', {
        nome: nome,
        idade: parseInt(idade, 10) 
      });
      
      alert('Pessoa cadastrada com sucesso!');
      
      setNome('');
      setIdade('');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert('Ocorreu um erro ao tentar salvar os dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Nova Pessoa</h2>
      
      <div className="form-grid">
        
        <div className="grupo-form">
          <label className="label-padrao" htmlFor="nome">Nome Completo</label>
          <input 
            type="text" 
            id="nome"
            className="input-padrao" 
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="grupo-form">
          <label className="label-padrao" htmlFor="idade">Idade</label>
          <input 
            type="number" 
            id="idade"
            className="input-padrao" 
            placeholder="Ex: 30"
            min="0"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>

      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="btn-secundario"
          onClick={() => {
            setNome('');
            setIdade('');
          }}
        >
          Limpar
        </button>
        <button type="submit" className="btn-primario">
          Salvar Cadastro
        </button>
      </div>
    </form>
  );
}