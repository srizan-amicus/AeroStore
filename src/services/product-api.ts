import type { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com/products";

// Shape returned by Fake Store API
interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch products. Status: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid product data received from API.");
  }

  const apiProducts = data as ApiProduct[];

  return apiProducts.map((item) => ({
    id: String(item.id),
    title: item.title,
    price: item.price,
    category: item.category,
    rating: item.rating.rate,
    image: item.image,
  }));
}
