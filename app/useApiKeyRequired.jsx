import { useEffect } from "react";

export const useApiKeyRequired = () => {
  useEffect(() => {
    const localStorageApi = localStorage.getItem("apikey");

    if (!localStorageApi) {
      while (!localStorage.getItem("apikey")) {
        const apiKey = prompt("Enter your API key");
        if (apiKey) {
          localStorage.setItem("apikey", apiKey);
        }
      }
    }
  }, []);
};
