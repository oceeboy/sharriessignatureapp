import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total:
                  (item.quantity + quantity) * product.current_price[0].NGN[0],
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            total: quantity * product.current_price[0].NGN[0],
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getItemCount,
        selectedProduct,
        setSelectedProduct,
        recentlyViewedItems,
        setRecentlyViewedItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
