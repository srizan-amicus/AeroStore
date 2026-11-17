import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  const handleAddToCart = (product: Product) => {
    Alert.alert(
      "Added to Cart",
      `${product.title} has been added to your cart.`,
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>AEROSTORE</Text>

            <Text style={styles.heading}>Discover Products</Text>

            <Text style={styles.subtitle}>
              Browse from a range of products.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <View style={{ width: cardWidth }}>
              <ProductCard product={item} onAddToCart={handleAddToCart} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062723",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },

  header: {
    marginBottom: 24,
  },

  brand: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#e2a602",
    marginBottom: 18,
    textAlign: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#EBEBD8",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#EBEBD8",
    opacity: 0.7,
    marginTop: 8,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
