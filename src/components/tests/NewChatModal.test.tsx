import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NewChatModal from '@/components/NewChatModal';
import { describe, expect, it, vi } from 'vitest';
const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('NewChatModal', () => {
  let onClose: () => void;
  let onConfirm: () => void;

  beforeEach(() => {
    onClose = vi.fn();
    onConfirm = vi.fn();
    sessionStorage.clear();
  });

  it('renders modal with content when isOpen is true', () => {
    renderWithChakra(
      <NewChatModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );
    // You can add assertions here if needed, e.g.:
    expect(screen.getByText(/new chat session\?/i)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { queryByText } = renderWithChakra(
      <NewChatModal isOpen={false} onClose={onClose} onConfirm={onConfirm} />,
    );

    expect(queryByText(/new chat session\?/i)).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    renderWithChakra(
      <NewChatModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm and onClose, and sets session_id when New Chat is clicked', () => {
    renderWithChakra(
      <NewChatModal isOpen={true} onClose={onClose} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /new chat/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    const sessionId = sessionStorage.getItem('session_id');
    expect(sessionId).toBeTruthy();
    expect(sessionId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });
});
