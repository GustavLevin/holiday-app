import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartPage from '../pages/CartPage';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

describe('CartPage component', () => {
  it('renders the correct heading', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartProvider>
    );

    const heading = screen.getByRole('heading', { name: /varukorg/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays empty cart message when the cart is empty', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartProvider>
    );

    const emptyMessage = screen.getByText(/varukorgen är tom/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
