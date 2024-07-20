import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "./GlobalProvider";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      loadCart();
      loadWishlist();
      loadOrderedItems();
    }
  }, [user]);

  useEffect(() => {
    saveCart();
  }, [cart]);

  useEffect(() => {
    saveWishlist();
  }, [wishlist]);

  useEffect(() => {
    saveOrderedItems();
  }, [orderedItems]);

  const handleError = (error) => {
    console.error(error);
    setErrors((prevErrors) => [
      ...prevErrors,
      error.message || "An error occurred",
    ]);
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      handleError(error);
    }
  };

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      handleError(error);
    }
  };

  const saveWishlist = async () => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      handleError(error);
    }
  };

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (error) {
      handleError(error);
    }
  };

  const saveOrderedItems = async () => {
    try {
      await AsyncStorage.setItem("orderedItems", JSON.stringify(orderedItems));
    } catch (error) {
      handleError(error);
    }
  };

  const loadOrderedItems = async () => {
    try {
      const storedOrderedItems = await AsyncStorage.getItem("orderedItems");
      if (storedOrderedItems) setOrderedItems(JSON.parse(storedOrderedItems));
    } catch (error) {
      handleError(error);
    }
  };

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

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
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
        wishlist,
        addToWishlist,
        removeFromWishlist,
        orderedItems,
        setOrderedItems,
        selectedOrder,
        setSelectedOrder,
        errors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
