import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants/theme";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const featuredProducts = products.slice(0, 4);

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View>
          <Text style={styles.heading}>Curated For You</Text>
          <Text style={styles.subtitle}>A selection worth discovering.</Text>
        </View>

        <Pressable
          onPress={() => router.navigate("/discover")}
          accessibilityRole="button"
        >
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.productGrid}>
        {featuredProducts.map((product) => (
          <View
            key={product.id}
            style={[styles.productItem, { width: cardWidth }]}
          >
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
    marginBottom: 28,
  },

  headingContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
    letterSpacing: 0.3,
  },

  productGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },

  productItem: {
    overflow: "hidden",
  },
});
