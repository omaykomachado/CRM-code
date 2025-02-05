/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend expect with React Testing Library matchers
expect.extend(matchers);

// Mock DragDropContext since it's causing issues in tests
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

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});