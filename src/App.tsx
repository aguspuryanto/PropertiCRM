import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Pipeline from './pages/Pipeline';
import Agents from './pages/Agents';
import Messages from './pages/Messages';
import Schedule from './pages/Schedule';
import Reports from './pages/Reports';
import Valuation from './pages/Valuation';
import Documents from './pages/Documents';

// Placeholder components for unfinished pages
const PlaceholderPage = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
    <div className="p-6 bg-slate-100 rounded-full mb-4">
      <Icon className="w-12 h-12" />
    </div>
    <h2 className="text-xl font-semibold text-slate-600">{title}</h2>
    <p className="mt-2">Fitur ini sedang dalam pengembangan.</p>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      setCurrentView(e.detail);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'properties': return <Properties />;
      case 'leads': return <Pipeline />;
      case 'agents': return <Agents />;
      case 'messages': return <Messages />;
      case 'schedule': return <Schedule />;
      case 'reports': return <Reports />;
      case 'valuation': return <Valuation />;
      case 'documents': return <Documents />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}
