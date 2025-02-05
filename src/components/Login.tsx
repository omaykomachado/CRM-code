import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-bolt/main/assets/magus-logo.png"
            alt="Magus"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#BFFF04]">
            Acesse sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-[#BFFF04]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-12 py-3 bg-[#2A2A2A] text-[#FFFFFF] rounded-t-md focus:outline-none focus:ring-[#BFFF04] focus:border-[#BFFF04] focus:z-10 sm:text-sm border border-[#BFFF04]/20"
                placeholder="E-mail"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-[#BFFF04]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-12 py-3 bg-[#2A2A2A] text-[#FFFFFF] rounded-b-md focus:outline-none focus:ring-[#BFFF04] focus:border-[#BFFF04] focus:z-10 sm:text-sm border border-[#BFFF04]/20"
                placeholder="Senha"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-[#1A1A1A] bg-[#BFFF04] hover:bg-[#BFFF04]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BFFF04] transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}