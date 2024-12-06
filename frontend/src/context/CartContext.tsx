import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5020/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        await axios.put(
          `http://localhost:5020/cart/${existingProduct.id}`,
          updatedProduct
        );

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id ? updatedProduct : item
          )
        );
      } else {
        // Lägger till ny produkt i backend
        const newProduct = { ...product, quantity: 1 };
        await axios.post('http://localhost:5020/cart', newProduct);

        setCart((prevCart) => [...prevCart, newProduct]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5020/cart/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
