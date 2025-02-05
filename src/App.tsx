import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Pipeline } from './components/Pipeline';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Contacts } from './components/Contacts';
import { Activities } from './components/Activities';
import { Proposals } from './components/Proposals';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { mockDeals } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [deals, setDeals] = useState(mockDeals);

  const handleLogin = (email: string, password: string) => {
    if (email === 'mayko.machado@magusinteligencia.com.br' && password === '123456') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <Pipeline deals={deals} setDeals={setDeals} />;
      case 'contacts':
        return <Contacts />;
      case 'activities':
        return <Activities />;
      case 'proposals':
        return <Proposals />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout>
      <div className="flex h-screen bg-[#1A1A1A]">
        <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </Layout>
  );
}

export default App;