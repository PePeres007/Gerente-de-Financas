import { useState } from 'react';
import PainelPessoas from './Components/Pessoas/PainelPessoas'; 
import PainelTransacoes from './Components/Transacoes/PainelTransacoes'; 
// Já deixamos a importação pronta para o Dashboard que criaremos em seguida
import ConsultasDashboard from './Components/Dashboard/ConsultasDashboard'; 

export default function App() {
  // Adicionamos o 'dashboard' como aba inicial padrão para a Sprint 3
  const [abaAtiva, setAbaAtiva] = useState<'pessoas' | 'transacoes' | 'dashboard'>('dashboard');

  return (
    <div className="layout-container">
      
      {/* O antigo Sidebar virou um Header Superior */}
      <header className="layout-header">
        <h1 className="layout-header-title">
          Gerente Financeiro
        </h1>
        
        <nav className="layout-nav">
          <button 
            onClick={() => setAbaAtiva('dashboard')}
            className={abaAtiva === 'dashboard' ? 'btn-nav-ativo' : 'btn-nav'}
          >
            📊 Consultas & Dashboard
          </button>
          
          <button 
            onClick={() => setAbaAtiva('pessoas')}
            className={abaAtiva === 'pessoas' ? 'btn-nav-ativo' : 'btn-nav'}
          >
            👥 Gestão de Pessoas
          </button>
          
          <button 
            onClick={() => setAbaAtiva('transacoes')}
            className={abaAtiva === 'transacoes' ? 'btn-nav-ativo' : 'btn-nav'}
          >
            💸 Transações
          </button>
        </nav>
      </header>

      {/* Área Principal de Conteúdo sem poluição de estilos inline */}
      <main className="layout-content">
        {abaAtiva === 'dashboard' && <PainelPessoas />}
        {abaAtiva === 'pessoas' && <PainelPessoas />}
        {abaAtiva === 'transacoes' && <PainelTransacoes />}
      </main>
      
    </div>
  );
}