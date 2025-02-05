import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the DnD context
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => children,
  Droppable: ({ children }: { children: Function }) => children({
    draggableProps: {},
    innerRef: null,
  }, {}),
  Draggable: ({ children }: { children: Function }) => children({
    draggableProps: {},
    dragHandleProps: {},
    innerRef: null,
  }, {}),
}));

describe('App Component', () => {
  it('shows login screen by default', () => {
    render(<App />);
    expect(screen.getByText('Acesse sua conta')).toBeInTheDocument();
  });

  it('shows pipeline after successful login', () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'mayko.machado@magusinteligencia.com.br' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Pipeline de Vendas')).toBeInTheDocument();
  });

  it('shows error for invalid credentials', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Credenciais inválidas');
    alertMock.mockRestore();
  });
});