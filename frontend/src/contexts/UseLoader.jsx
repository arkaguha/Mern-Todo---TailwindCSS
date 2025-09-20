import { createContext, useContext } from "react";

export const LoaderContext = createContext();

export function useLoader() {
  return useContext(LoaderContext);
}
