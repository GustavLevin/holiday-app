import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

describe('HomePage component', () => {
  it('renders the correct heading', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage addToCart={() => {}} />
        </MemoryRouter>
      </CartProvider>
    );

    const heading = screen.getByRole('heading', { name: /produkter/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays a message if there are no products', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <HomePage addToCart={() => {}} />
        </MemoryRouter>
      </CartProvider>
    );

    const emptyMessage = screen.queryByText(/inga produkter tillgängliga/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });
});
