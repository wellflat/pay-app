import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatementTable from './StatementTable';

describe('StatementTable Component', () => {
  test('renders without crashing', () => {
    const mockStatements = [
      { id: 1, amount: 1000, payment_date: '2025-01-01', store: 'Store A', card_id: 1, payment_month: 1 },
      { id: 2, amount: 2000, payment_date: '2025-01-02', store: 'Store B', card_id: 2, payment_month: 2 },
    ];
    render(<StatementTable statements={mockStatements} />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});
