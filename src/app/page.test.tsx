import React from 'react';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );
    expect(screen.getByText('支払履歴を確認')).toBeInTheDocument();
  });

  test('displays sign-in component when not authenticated', () => {
    render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );
    expect(screen.getByText('Googleアカウントで認証')).toBeInTheDocument();
  });
});
