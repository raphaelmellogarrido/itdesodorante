import { createContext, useContext, useEffect, useRef, useState } from "react";
import { pb } from "../lib/pocketbase";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const STORAGE_KEY = "itdesodorante_cart_guest";

function readGuestCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const userIdRef = useRef(undefined);
  const skipNextSave = useRef(false);

  // Switch cart source whenever the logged-in user changes (login/logout).
  useEffect(() => {
    const currentUserId = user?.id || null;
    if (currentUserId === userIdRef.current) return;

    skipNextSave.current = true;
    setItems(user ? (Array.isArray(user.cart) ? user.cart : []) : readGuestCart());
    userIdRef.current = currentUserId;
  }, [user]);

  // Persist on every change: to the account if logged in, to this browser otherwise.
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (user) {
      pb.collection("users")
        .update(user.id, { cart: items })
        .catch((error) => console.error(error));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
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
