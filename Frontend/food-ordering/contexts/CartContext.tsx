import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updatedFields: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotal: () => number;
};

// 1. Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Custom hook for using the context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// 3. Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updatedFields: Partial<CartItem>) => {
  setCartItems((prevItems) =>
    prevItems.map((item) => {
      if (item.id !== id) return item;

      // Prevent negative quantity
      const updatedQuantity = updatedFields.quantity !== undefined
        ? Math.max(updatedFields.quantity, 0)
        : item.quantity;

      return {
        ...item,
        ...updatedFields,
        quantity: updatedQuantity,
      };
    })
  );
};


  const clearCart = () => setCartItems([]);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, updateItem, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
