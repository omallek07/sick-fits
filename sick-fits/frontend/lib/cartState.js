import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  const value = {
    cartOpen,
    toggleCart,
    openCart,
    closeCart,
  };

  return <LocalStateProvider value={value}>{children}</LocalStateProvider>;
}

// Make a custom hook for access the cart local state
function useCart() {
  // useContext is the consumer
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
