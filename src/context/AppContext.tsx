"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Vendor, MenuItem } from "@/lib/data";
import { initialVendors, initialSubscribers } from "@/lib/data";
import { useIsClient } from "@/hooks/use-is-client";

interface AppContextType {
  vendors: Vendor[];
  subscribers: string[];
  isAuthenticated: boolean;
  updatePrice: (vendorId: string, itemId: string, newPrice: number) => void;
  addSubscriber: (email: string) => void;
  login: () => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  vendors: [],
  subscribers: [],
  isAuthenticated: false,
  updatePrice: () => {},
  addSubscriber: () => {},
  login: () => {},
  logout: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [subscribers, setSubscribers] = useState<string[]>(initialSubscribers);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient) {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    }
  }, [isClient]);

  const login = () => {
    if (isClient) {
      localStorage.setItem("isAuthenticated", "true");
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (isClient) {
      localStorage.removeItem("isAuthenticated");
    }
    setIsAuthenticated(false);
  };

  const updatePrice = (vendorId: string, itemId: string, newPrice: number) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) => {
        if (vendor.id === vendorId) {
          return {
            ...vendor,
            menu: vendor.menu.map((item) => {
              if (item.id === itemId) {
                return { ...item, price: newPrice };
              }
              return item;
            }),
          };
        }
        return vendor;
      })
    );
  };

  const addSubscriber = (email: string) => {
    if (!subscribers.includes(email)) {
      setSubscribers((prev) => [...prev, email]);
    }
  };

  const contextValue = {
    vendors,
    subscribers,
    isAuthenticated,
    updatePrice,
    addSubscriber,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
