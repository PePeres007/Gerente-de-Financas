import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; 
  data: string;
  pessoa: {
    nome: string;
  };
}

export default function ListaTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarTransacoes = async () => {
    try {
      const resposta = await api.get('/transacoes');
      setTransacoes(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar transações:", erro);
      alert("Não foi possível carregar o extrato.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await api.delete(`/transacoes/${id}`);
        carregarTransacoes();
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
      }
    }
  };

  if (carregando) return <div className="loading-texto">Carregando extrato...</div>;

  return (
    <div className="lista-container">
      <h2 className="lista-title">Extrato de Movimentações</h2>
      
      <div className="tabela-wrapper">
        <table className="tabela-padrao">
          <thead>
            <tr className="tabela-linha-cabecalho">
              <th className="tabela-cabecalho">Data</th>
              <th className="tabela-cabecalho">Pessoa</th>
              <th className="tabela-cabecalho">Descrição</th>
              <th className="tabela-cabecalho">Valor</th>
              <th className="tabela-cabecalho-centro">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.length === 0 ? (
              <tr>
                <td colSpan={5} className="tabela-celula-vazia">Nenhuma transação registrada.</td>
              </tr>
            ) : (
              transacoes.map((t) => (
                <tr key={t.id} className="tabela-linha">
                  <td className="tabela-celula">{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                  <td className="tabela-celula-destaque">{t.pessoa?.nome || 'Desconhecida'}</td>
                  <td className="tabela-celula">{t.descricao}</td>
                  <td className={`tabela-celula-valor ${t.tipo === 1 ? 'texto-receita' : 'texto-despesa'}`}>
                    {t.tipo === 1 ? '+ ' : '- '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                  </td>
                  <td className="tabela-celula-centro">
                    <button onClick={() => handleDelete(t.id)} className="btn-excluir">
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