import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Login } from '../components/Login.tsx';

describe('Login Component', () => {
  it('renders login form', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('handles successful login', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'mayko.machado@magusinteligencia.com.br' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledWith('mayko.machado@magusinteligencia.com.br', '123456');
  });

  it('validates required fields', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});