import React, { useState } from 'react';
import { Calendar, Phone, Video, Mail, CheckCircle, Clock } from 'lucide-react';
import { mockActivities } from '../data/mockData';
import type { Activity } from '../types';

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'meeting':
        return Video;
      case 'email':
        return Mail;
      case 'task':
        return CheckCircle;
      default:
        return Calendar;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#BFFF04]">Atividades</h1>
        <button className="bg-[#BFFF04] text-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#BFFF04]/90 transition-colors">
          <Calendar className="h-5 w-5" />
          Nova Atividade
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#BFFF04] mb-4">Próximas Atividades</h2>
          <div className="space-y-4">
            {activities
              .filter(activity => activity.status === 'pending')
              .map(activity => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="bg-[#1A1A1A] rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="bg-[#BFFF04]/10 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-[#BFFF04]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{activity.title}</h3>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-[#BFFF04]">
                          {new Date(activity.date).toLocaleString('pt-BR')}
                        </span>
                        <span className="text-sm text-gray-400">
                          {activity.relatedTo.type === 'deal' ? 'Negócio: ' : 'Contato: '}
                          {activity.relatedTo.name}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#BFFF04] hover:text-[#BFFF04]/80 transition-colors">
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#BFFF04] mb-4">Atividades Concluídas</h2>
          <div className="space-y-4">
            {activities
              .filter(activity => activity.status === 'completed')
              .map(activity => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="bg-[#1A1A1A] rounded-lg p-4 flex items-start gap-4 opacity-75"
                  >
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{activity.title}</h3>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-green-500">Concluído</span>
                        <span className="text-sm text-gray-400">
                          {activity.relatedTo.type === 'deal' ? 'Negócio: ' : 'Contato: '}
                          {activity.relatedTo.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}