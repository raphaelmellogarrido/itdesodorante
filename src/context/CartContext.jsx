import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "itdesodorante_cart";

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(produto, quantidade = 1) {
    setItems((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [
        ...atual,
        {
          id: produto.id,
          collectionId: produto.collectionId,
          collectionName: produto.collectionName,
          name: produto.name,
          price: produto.price,
          featured_image: produto.featured_image,
          quantidade,
        },
      ];
    });
  }

  function removeItem(id) {
    setItems((atual) => atual.filter((item) => item.id !== id));
  }

  function updateQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      removeItem(id);
      return;
    }
    setItems((atual) =>
      atual.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantidade, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantidade,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
