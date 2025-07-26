
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Product } from "@/lib/data";
import { useAuth } from "./use-auth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, getDocs, collection, writeBatch, query, where } from "firebase/firestore";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  // Effect to load cart from local storage initially for guests
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setLocalCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from local storage", error);
      setLocalCart([]);
    }
    setLoading(false);
  }, []);

  // Effect to handle cart state based on auth status
  useEffect(() => {
    if (user) {
      setLoading(true);
      const cartRef = doc(db, "carts", user.uid);
      const unsubscribe = onSnapshot(
        cartRef,
        async (docSnap) => {
          if (docSnap.exists()) {
            const firestoreCartItems = docSnap.data().items || [];
            
            const productIds = firestoreCartItems.map((item: { id: string, quantity: number }) => item.id);
            let productsData: Product[] = [];

            if (productIds.length > 0) {
              const productsRef = collection(db, "products");
              const q = query(productsRef, where("__name__", "in", productIds));
              const querySnapshot = await getDocs(q);
              productsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
            }

            const firestoreCart = firestoreCartItems.map((item: { id: string, quantity: number }) => {
              const productData = productsData.find(p => p.id === item.id);
              return { ...productData, ...item };
            });

            // Merge local cart with Firestore cart on login
            if (localCart.length > 0) {
              const mergedCart = [...firestoreCart];
              localCart.forEach((localItem) => {
                const existingItemIndex = mergedCart.findIndex(
                  (item) => item.id === localItem.id
                );
                if (existingItemIndex !== -1) {
                  mergedCart[existingItemIndex].quantity += localItem.quantity;
                } else {
                  mergedCart.push(localItem);
                }
              });
              setCart(mergedCart);
              const itemsToStore = mergedCart.map(({id, quantity}) => ({id, quantity}))
              await setDoc(cartRef, { items: itemsToStore }, { merge: true });
              setLocalCart([]); // Clear local cart after merging
              localStorage.removeItem("cart");
            } else {
              setCart(firestoreCart);
            }
          } else if (localCart.length > 0) {
            // New user with a local cart
            setCart(localCart);
            const itemsToStore = localCart.map(({id, quantity}) => ({id, quantity}))
            await setDoc(cartRef, { items: itemsToStore });
            setLocalCart([]);
            localStorage.removeItem("cart");
          } else {
            setCart([]);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Firestore snapshot error:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      // User is logged out, use local cart
      setCart(localCart);
    }
  }, [user]);

  // Effect to update Firestore or Local Storage when cart changes
  useEffect(() => {
    const updateDataSource = async () => {
       if (user && !loading) {
        const cartRef = doc(db, "carts", user.uid);
        const itemsToStore = cart.map(({id, quantity}) => ({id, quantity}));
        await setDoc(cartRef, { items: itemsToStore });
      } else if (!user) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    };
    updateDataSource();
  }, [cart, user, loading]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
