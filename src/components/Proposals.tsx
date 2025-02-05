import React, { useState } from 'react';
import { FileText, Download, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockProposals } from '../data/mockData';
import type { Proposal } from '../types';

export function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'draft':
        return Clock;
      case 'sent':
        return Send;
      case 'accepted':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'draft':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'sent':
        return 'text-blue-500 bg-blue-500/10';
      case 'accepted':
        return 'text-green-500 bg-green-500/10';
      case 'rejected':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#BFFF04]">Propostas</h1>
        <button className="bg-[#BFFF04] text-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BFFF04]/90 transition-colors">
          <FileText className="h-5 w-5" />
          Nova Proposta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.map(proposal => {
          const StatusIcon = getStatusIcon(proposal.status);
          const statusColor = getStatusColor(proposal.status);

          return (
            <div
              key={proposal.id}
              className="bg-[#2A2A2A] rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
                  <p className="text-[#BFFF04]">{proposal.company}</p>
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusColor}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm capitalize">{proposal.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Valor</p>
                  <p className="text-white font-medium">{formatCurrency(proposal.value)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Criado em</p>
                  <p className="text-white font-medium">
                    {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Válido até</p>
                  <p className="text-white font-medium">
                    {new Date(proposal.validUntil).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}