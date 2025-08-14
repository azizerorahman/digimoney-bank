import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [loadingOperations, setLoadingOperations] = useState(new Set());

  const startLoading = (operationId, message = "Loading...") => {
    setLoadingOperations((prev) => new Set([...prev, operationId]));
    setLoadingMessage(message);
    setGlobalLoading(true);
  };

  const stopLoading = (operationId) => {
    setLoadingOperations((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(operationId);

      if (newSet.size === 0) {
        setGlobalLoading(false);
      }

      return newSet;
    });
  };

  const isOperationLoading = (operationId) => {
    return loadingOperations.has(operationId);
  };

  return (
    <LoadingContext.Provider
      value={{
        globalLoading,
        loadingMessage,
        startLoading,
        stopLoading,
        isOperationLoading,
        hasActiveOperations: loadingOperations.size > 0,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
