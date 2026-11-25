import { useCallback, useMemo, useState } from "react";

import type { Product } from "@/types/product";

export type SortOption =
  | "default"
  | "price-low-high"
  | "price-high-low"
  | "rating";

export default function useProductFilters(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Generate categories dynamically from API products.
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  // Apply search, category filtering and sorting together.
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        // Preserve the original API order.
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOption]);

  // Reset all filters.
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOption("default");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    categories,
    filteredProducts,
    resetFilters,
  };
}
