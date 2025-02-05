import React from 'react';
import { BarChart2, Users, CheckCircle, XCircle, Calendar, FileText, TrendingUp } from 'lucide-react';
import { useDeals } from '../hooks/useSupabase';
import { Deal } from '../types';

export function Dashboard() {
  const { deals } = useDeals();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calculate metrics from real pipeline data
  const calculateMetrics = (deals: Deal[]) => {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = deals.filter(deal => deal.stage === 'closed').length;
    const lostDeals = deals.filter(deal => deal.stage === 'treasure').length;
    const activeDeals = deals.filter(deal => deal.stage !== 'closed' && deal.stage !== 'treasure').length;
    const conversionRate = deals.length > 0 
      ? ((wonDeals / deals.length) * 100).toFixed(1)
      : '0';

    return {
      totalValue,
      wonDeals,
      lostDeals,
      activeDeals,
      conversionRate
    };
  };

  const metrics = calculateMetrics(deals);

  const metricsData = [
    {
      title: 'Total em Negociações',
      value: formatCurrency(metrics.totalValue),
      icon: BarChart2,
      color: 'text-blue-500'
    },
    {
      title: 'Negócios Ativos',
      value: metrics.activeDeals,
      icon: Users,
      color: 'text-green-500'
    },
    {
      title: 'Negócios Ganhos',
      value: metrics.wonDeals,
      icon: CheckCircle,
      color: 'text-emerald-500'
    },
    {
      title: 'Negócios Perdidos',
      value: metrics.lostDeals,
      icon: XCircle,
      color: 'text-red-500'
    },
    {
      title: 'Taxa de Conversão',
      value: `${metrics.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-indigo-500'
    }
  ];

  // Calculate stage distribution for the funnel
  const calculateStageDistribution = (deals: Deal[]) => {
    const stages = ['lead', 'contact', 'proposal', 'negotiation', 'closed'];
    return stages.map(stage => ({
      stage: stage,
      count: deals.filter(deal => deal.stage === stage).length,
      value: deals.filter(deal => deal.stage === stage)
        .reduce((sum, deal) => sum + deal.value, 0)
    }));
  };

  const stageDistribution = calculateStageDistribution(deals);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#BFFF04] mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="bg-[#2A2A2A] rounded-lg p-6 shadow-lg hover:shadow-[#BFFF04]/5 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
              <span className="text-2xl font-bold text-white">{metric.value}</span>
            </div>
            <h3 className="text-[#BFFF04] font-medium">{metric.title}</h3>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#BFFF04] mb-4">Funil de Vendas</h2>
          <div className="space-y-4">
            {stageDistribution.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white capitalize">{stage.stage}</span>
                  <span className="text-[#BFFF04]">{stage.count} negócios</span>
                </div>
                <div className="w-full bg-[#1A1A1A] rounded-full h-4">
                  <div
                    className="bg-[#BFFF04] h-4 rounded-full transition-all"
                    style={{
                      width: `${(stage.count / deals.length * 100) || 0}%`
                    }}
                  />
                </div>
                <span className="text-gray-400 text-sm mt-1">
                  {formatCurrency(stage.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#BFFF04] mb-4">Análise de Valores</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white">Ticket Médio</span>
              <span className="text-[#BFFF04]">
                {formatCurrency(metrics.totalValue / deals.length || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Maior Negócio</span>
              <span className="text-[#BFFF04]">
                {formatCurrency(Math.max(...deals.map(deal => deal.value), 0))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Menor Negócio</span>
              <span className="text-[#BFFF04]">
                {formatCurrency(Math.min(...deals.map(deal => deal.value), 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}