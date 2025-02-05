import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pipeline } from '../components/Pipeline';

const mockDeals = [
  { id: 1, title: 'Projeto A', value: 50000, stage: 'lead', company: 'Tech Corp' },
  { id: 2, title: 'Consultoria B', value: 75000, stage: 'contact', company: 'Inovação Ltd' },
];

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

describe('Pipeline Component', () => {
  it('renders all pipeline stages', () => {
    render(<Pipeline deals={mockDeals} setDeals={vi.fn()} />);
    
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Primeiro Contato')).toBeInTheDocument();
    expect(screen.getByText('Proposta')).toBeInTheDocument();
    expect(screen.getByText('Negociação')).toBeInTheDocument();
    expect(screen.getByText('Fechado')).toBeInTheDocument();
  });

  it('displays deals in correct stages', () => {
    render(<Pipeline deals={mockDeals} setDeals={vi.fn()} />);
    
    expect(screen.getByText('Projeto A')).toBeInTheDocument();
    expect(screen.getByText('Consultoria B')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Inovação Ltd')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<Pipeline deals={mockDeals} setDeals={vi.fn()} />);
    
    const formattedValues = mockDeals.map(deal => 
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(deal.value)
    );
    
    formattedValues.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});