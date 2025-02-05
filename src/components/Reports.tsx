import React from 'react';
import { BarChart2, PieChart, LineChart, TrendingUp } from 'lucide-react';
import { useDeals } from '../hooks/useSupabase';

export function Reports() {
  const { deals } = useDeals();

  // Calculate metrics
  const totalDeals = deals.length;
  const closedDeals = deals.filter(deal => deal.stage === 'closed').length;
  const treasureDeals = deals.filter(deal => deal.stage === 'treasure').length;
  const conversionRate = totalDeals > 0 ? (closedDeals / totalDeals) * 100 : 0;

  const stageDistribution = [
    { stage: 'Baú de Leads', count: deals.filter(d => d.stage === 'treasure').length },
    { stage: 'Leads', count: deals.filter(d => d.stage === 'lead').length },
    { stage: 'Primeiro Contato', count: deals.filter(d => d.stage === 'contact').length },
    { stage: 'Proposta', count: deals.filter(d => d.stage === 'proposal').length },
    { stage: 'Negociação', count: deals.filter(d => d.stage === 'negotiation').length },
    { stage: 'Fechado', count: deals.filter(d => d.stage === 'closed').length },
  ];

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const averageValue = totalDeals > 0 ? totalValue / totalDeals : 0;

  // Calculate monthly trends
  const getMonthlyData = () => {
    const monthlyDeals = deals.reduce((acc, deal) => {
      const month = new Date(deal.expectedCloseDate).getMonth();
      acc[month] = (acc[month] || 0) + deal.value;
      return acc;
    }, {} as Record<number, number>);

    return Array.from({ length: 12 }, (_, month) => ({
      month: new Date(2024, month).toLocaleString('pt-BR', { month: 'short' }),
      value: monthlyDeals[month] || 0
    }));
  };

  const monthlyData = getMonthlyData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#BFFF04] mb-6">Relatórios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#BFFF04]">Distribuição por Status</h2>
            <PieChart className="h-6 w-6 text-[#BFFF04]" />
          </div>
          <div className="space-y-4">
            {stageDistribution.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white">{stage.stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#BFFF04]">{stage.count}</span>
                  <span className="text-gray-400">
                    ({((stage.count / totalDeals) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#BFFF04]">Métricas de Conversão</h2>
            <TrendingUp className="h-6 w-6 text-[#BFFF04]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Taxa de Conversão</span>
              <span className="text-[#BFFF04]">{conversionRate.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Negócios Fechados</span>
              <span className="text-[#BFFF04]">{closedDeals}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Negócios no Baú</span>
              <span className="text-[#BFFF04]">{treasureDeals}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#BFFF04]">Análise de Valores</h2>
            <BarChart2 className="h-6 w-6 text-[#BFFF04]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Valor Total em Pipeline</span>
              <span className="text-[#BFFF04]">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalValue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Ticket Médio</span>
              <span className="text-[#BFFF04]">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(averageValue)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#BFFF04]">Tendência Mensal</h2>
            <LineChart className="h-6 w-6 text-[#BFFF04]" />
          </div>
          <div className="space-y-2">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white capitalize">{month.month}</span>
                <span className="text-[#BFFF04]">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(month.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}