import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreHorizontal, DollarSign, Plus, Filter, Search, X, Edit2, LayoutGrid, Columns, Calendar, List, ArrowUpDown } from 'lucide-react';
import type { Deal, DetailModalData } from '../types';

interface PipelineProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

export function Pipeline({ deals, setDeals }: PipelineProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Deal>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const stages = [
    { id: 'treasure', name: 'Baú de Leads' },
    { id: 'lead', name: 'Leads' },
    { id: 'contact', name: 'Primeiro Contato' },
    { id: 'proposal', name: 'Proposta' },
    { id: 'negotiation', name: 'Negociação' },
    { id: 'closed', name: 'Fechado' }
  ];

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(deals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, {
      ...reorderedItem,
      stage: result.destination.droppableId
    });

    setDeals(items);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortField === 'value') {
      return sortDirection === 'asc' ? a.value - b.value : b.value - a.value;
    }
    return sortDirection === 'asc'
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  const handleSort = (field: keyof Deal) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDetailClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#BFFF04]">Pipeline de Vendas</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
            className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors"
          >
            {viewMode === 'kanban' ? (
              <List className="h-6 w-6" />
            ) : (
              <LayoutGrid className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors"
          >
            <Filter className="h-6 w-6" />
          </button>
          <button className="bg-[#BFFF04] text-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BFFF04]/90 transition-colors">
            <Plus className="h-5 w-5" />
            Novo Negócio
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar negócios..."
            className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BFFF04]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {stages.map((stage) => (
              <div key={stage.id} className="bg-[#2A2A2A] rounded-lg p-4">
                <h2 className="text-lg font-semibold text-[#BFFF04] mb-4">{stage.name}</h2>
                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-4"
                    >
                      {sortedDeals
                        .filter((deal) => deal.stage === stage.id)
                        .map((deal, index) => (
                          <Draggable
                            key={deal.id}
                            draggableId={String(deal.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-[#1A1A1A] rounded-lg p-4 cursor-grab active:cursor-grabbing"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-white font-medium">{deal.title}</h3>
                                  <button
                                    onClick={() => handleDetailClick(deal)}
                                    className="text-gray-400 hover:text-[#BFFF04] transition-colors"
                                  >
                                    <MoreHorizontal className="h-5 w-5" />
                                  </button>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">{deal.company}</p>
                                <div className="flex items-center gap-2 text-[#BFFF04]">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{formatCurrency(deal.value)}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A]">
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('title')}
                    className="text-[#BFFF04] font-medium flex items-center gap-2"
                  >
                    Título
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('company')}
                    className="text-[#BFFF04] font-medium flex items-center gap-2"
                  >
                    Empresa
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('value')}
                    className="text-[#BFFF04] font-medium flex items-center gap-2"
                  >
                    Valor
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('stage')}
                    className="text-[#BFFF04] font-medium flex items-center gap-2"
                  >
                    Estágio
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sortedDeals.map((deal) => (
                <tr key={deal.id} className="border-t border-[#1A1A1A] hover:bg-[#1A1A1A]/50">
                  <td className="px-4 py-3 text-white">{deal.title}</td>
                  <td className="px-4 py-3 text-gray-400">{deal.company}</td>
                  <td className="px-4 py-3 text-[#BFFF04]">{formatCurrency(deal.value)}</td>
                  <td className="px-4 py-3">
                    <span className="text-white">
                      {stages.find(s => s.id === deal.stage)?.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDetailClick(deal)}
                      className="text-gray-400 hover:text-[#BFFF04] transition-colors"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetailModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#2A2A2A] rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-[#BFFF04]">{selectedDeal.title}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-[#BFFF04] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-4">Informações do Negócio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Empresa</label>
                    <p className="text-white">{selectedDeal.company}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Valor</label>
                    <p className="text-[#BFFF04]">{formatCurrency(selectedDeal.value)}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Estágio</label>
                    <p className="text-white">
                      {stages.find(s => s.id === selectedDeal.stage)?.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Probabilidade</label>
                    <p className="text-white">{selectedDeal.probability}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4">Contato</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nome</label>
                    <p className="text-white">{selectedDeal.contact}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">E-mail</label>
                    <p className="text-white">{selectedDeal.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Telefone</label>
                    <p className="text-white">{selectedDeal.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-white font-medium mb-4">Histórico</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Última Atividade</label>
                  <p className="text-white">{selectedDeal.lastActivity}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Data Prevista de Fechamento</label>
                  <p className="text-white">
                    {new Date(selectedDeal.expectedCloseDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Fechar
              </button>
              <button className="bg-[#BFFF04] text-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BFFF04]/90 transition-colors">
                <Edit2 className="h-5 w-5" />
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}