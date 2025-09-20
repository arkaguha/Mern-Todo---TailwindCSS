import { createContext, useContext } from "react";

export const LogContext = createContext();

export function useLog() {
  return useContext(LogContext);
}
