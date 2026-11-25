import { useCallback, useEffect, useState } from "react";

import { fetchProducts } from "@/services/product-api";
import type { Product } from "@/types/product";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshKey((previous) => previous + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      if (refreshKey === 0) {
        setIsLoading(true);
      }

      setError(null);

      try {
        const data = await fetchProducts(controller.signal);

        setProducts(data);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong while loading products.";

        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [refreshKey]);

  return {
    products,
    isLoading,
    isRefreshing,
    error,
    refresh,
  };
}
