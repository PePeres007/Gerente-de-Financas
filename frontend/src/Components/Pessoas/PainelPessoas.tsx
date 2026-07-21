import { useState } from 'react';
import FormularioPessoa from './FormularioPessoa';
import ListaPessoas from './ListaPessoas';

export default function PainelPessoas() {
  const [exibindoCadastro, setExibindoCadastro] = useState(false);

  return (
    <div className="painel-container">
      
      <header className="painel-header">
        <div>
          <h1 className="painel-title">
            Gestão de Pessoas
          </h1>
          <p className="painel-subtitle">
            Administre os clientes e usuários do seu sistema.
          </p>
        </div>

        <button 
          className="btn-primario"
          onClick={() => setExibindoCadastro(!exibindoCadastro)}
        >
          {exibindoCadastro ? '← Voltar para Lista' : '+ Nova Pessoa'}
        </button>
      </header>

      <main className="bento-card-large">
        {exibindoCadastro ? (
          <FormularioPessoa />
        ) : (
          <ListaPessoas />
        )}
      </main>

    </div>
  );
}