import React from 'react';
import { Home, Users, BarChart2, Settings, Phone, FileText, Target } from 'lucide-react';

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export function Sidebar({ onPageChange, currentPage }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'pipeline', icon: Target, label: 'Pipeline' },
    { id: 'contacts', icon: Users, label: 'Contatos' },
    { id: 'activities', icon: Phone, label: 'Atividades' },
    { id: 'proposals', icon: FileText, label: 'Propostas' },
    { id: 'reports', icon: BarChart2, label: 'Relatórios' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 bg-[#1A1A1A] border-r border-[#BFFF04]/20">
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-[#FFFFFF] hover:bg-[#2A2A2A] hover:text-[#BFFF04] transition-colors group ${
                    currentPage === item.id ? 'bg-[#2A2A2A] text-[#BFFF04]' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}