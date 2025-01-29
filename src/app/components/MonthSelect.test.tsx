import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthSelect from './MonthSelect';

describe('MonthSelect Component', () => {
  test('renders without crashing', () => {
    const mockHandleChange = jest.fn();
    render(<MonthSelect handleChange={mockHandleChange} loading={false} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
});
