import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <nav className="bg-[#1A1A1A] border-b border-[#BFFF04]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <img
                  src="https://raw.githubusercontent.com/stackblitz/stackblitz-bolt/main/assets/magus-logo.png"
                  alt="Magus"
                  className="h-8 w-auto"
                />
                <span className="text-[#BFFF04] text-xl font-bold">Magus CRM</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    className="bg-[#2A2A2A] text-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#BFFF04]"
                    placeholder="Pesquisar..."
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="ml-4 flex items-center space-x-4">
                <button className="text-[#FFFFFF] hover:text-[#BFFF04] transition-colors">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="text-[#FFFFFF] hover:text-[#BFFF04] transition-colors">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}