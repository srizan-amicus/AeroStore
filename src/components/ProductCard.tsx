import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
        accessibilityLabel={product.title}
      />

      <View style={styles.details}>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.price}>{formattedPrice}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => onAddToCart(product)}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.title} to cart`}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#EBEBD8",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },

  productImage: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(6, 39, 35, 0.08)",
  },

  details: {
    padding: 12,
  },

  category: {
    fontSize: 11,
    fontWeight: "600",
    color: "#062723",
    opacity: 0.65,
    marginBottom: 5,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#062723",
    minHeight: 40,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 14,
  },

  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#062723",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  star: {
    color: "#B98500",
    fontSize: 15,
  },

  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#062723",
  },

  button: {
    minHeight: 42,
    backgroundColor: "#062723",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#e2a602",
    fontSize: 13,
    fontWeight: "700",
  },
});
