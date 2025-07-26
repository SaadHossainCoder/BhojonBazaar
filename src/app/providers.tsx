"use client";

import { AppContextProvider } from "@/context/AppContext";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
