import React from 'react';
import { User, Bell, Shield, Database, Globe, Palette } from 'lucide-react';

export function Settings() {
  const settingsSections = [
    {
      title: 'Perfil',
      icon: User,
      description: 'Gerencie suas informações pessoais e preferências',
      fields: ['Nome', 'E-mail', 'Telefone', 'Cargo']
    },
    {
      title: 'Notificações',
      icon: Bell,
      description: 'Configure suas preferências de notificações',
      fields: ['E-mail', 'Push', 'Desktop', 'Frequência']
    },
    {
      title: 'Segurança',
      icon: Shield,
      description: 'Gerencie suas configurações de segurança',
      fields: ['Senha', 'Autenticação em 2 fatores', 'Sessões ativas']
    },
    {
      title: 'Dados',
      icon: Database,
      description: 'Configure suas preferências de dados',
      fields: ['Importação', 'Exportação', 'Backup', 'Limpeza']
    },
    {
      title: 'Personalização',
      icon: Palette,
      description: 'Personalize a aparência do sistema',
      fields: ['Tema', 'Cores', 'Layout', 'Fonte']
    },
    {
      title: 'Integrações',
      icon: Globe,
      description: 'Gerencie suas integrações com outros sistemas',
      fields: ['E-mail', 'Calendário', 'CRM', 'API']
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#BFFF04] mb-6">Configurações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-[#2A2A2A] rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#BFFF04]/10 p-2 rounded-lg">
                <section.icon className="h-6 w-6 text-[#BFFF04]" />
              </div>
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>
            <p className="text-gray-400 mb-4">{section.description}</p>
            <div className="space-y-3">
              {section.fields.map((field, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className="flex items-center justify-between p-2 bg-[#1A1A1A] rounded-lg"
                >
                  <span className="text-white">{field}</span>
                  <button className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors text-sm">
                    Configurar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}