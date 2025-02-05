import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Building, Calendar } from 'lucide-react';
import { mockContacts } from '../data/mockData';
import type { Contact } from '../types';

export function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#BFFF04]">Contatos</h1>
        <button className="bg-[#BFFF04] text-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BFFF04]/90 transition-colors">
          <Plus className="h-5 w-5" />
          Novo Contato
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar contatos..."
            className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BFFF04]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-[#2A2A2A] rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                <p className="text-[#BFFF04]">{contact.position}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                contact.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
              }`}>
                {contact.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building className="h-4 w-4" />
                <span>{contact.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>Último contato: {new Date(contact.lastContact).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}