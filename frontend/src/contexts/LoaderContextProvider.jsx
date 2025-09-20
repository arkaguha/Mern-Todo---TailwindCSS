import { useState, useCallback } from "react";
import { LoaderContext } from "./UseLoader";
// const LoaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}
