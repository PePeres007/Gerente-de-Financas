import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

// Definindo o formato exato dos dados que vêm do C#
interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function ListaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os dados na API
  const carregarPessoas = async () => {
    try {
      const resposta = await api.get('/pessoas');
      setPessoas(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar pessoas:", erro);
      alert("Não foi possível carregar a lista de pessoas.");
    } finally {
      setCarregando(false);
    }
  };

  // O useEffect faz a busca automática assim que o componente aparece na tela
  useEffect(() => {
    carregarPessoas();
  }, []);

  // Função para deletar acionando o Delete Cascade no Back-end
  const handleDelete = async (id: number, nome: string) => {
    const confirmacao = window.confirm(
      `Atenção! Você tem certeza que deseja excluir ${nome}?\n\nIsso também apagará TODOS os registros financeiros ligados a essa pessoa (Delete Cascade).`
    );

    if (confirmacao) {
      try {
        await api.delete(`/pessoas/${id}`);
        alert('Registro excluído com sucesso.');
        carregarPessoas();
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Ocorreu um erro ao tentar excluir a pessoa.");
      }
    }
  };

  if (carregando) {
    return <div className="loading-texto">Carregando dados...</div>;
  }

  return (
    <div className="lista-container">
      <h2 className="bento-title mb-6">Pessoas Cadastradas</h2>
      
      <div className="tabela-wrapper">
        <table className="tabela-padrao">
          <thead>
            <tr className="tabela-linha-cabecalho">
              <th className="tabela-cabecalho">ID</th>
              <th className="tabela-cabecalho">Nome</th>
              <th className="tabela-cabecalho">Idade</th>
              <th className="tabela-cabecalho-centro">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.length === 0 ? (
              <tr>
                <td colSpan={4} className="tabela-celula-vazia">
                  Nenhuma pessoa cadastrada ainda.
                </td>
              </tr>
            ) : (
              pessoas.map((pessoa) => (
                <tr key={pessoa.id} className="tabela-linha">
                  <td className="tabela-celula font-medium text-fin-300">#{pessoa.id}</td>
                  <td className="tabela-celula-destaque">{pessoa.nome}</td>
                  <td className="tabela-celula text-fin-300">{pessoa.idade} anos</td>
                  <td className="tabela-celula text-center">
                    <button 
                      onClick={() => handleDelete(pessoa.id, pessoa.nome)}
                      className="btn-excluir"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}