import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { SafeAreaView } from "react-native-safe-area-context";

// --------------------------------------------------
// 1. CATEGORY DATA
// --------------------------------------------------

// Generate unique categories dynamically from product data.
const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function HomeScreen() {
  // --------------------------------------------------
  // 2. STATE AND SCREEN DIMENSIONS
  // --------------------------------------------------

  const [selectedCategory, setSelectedCategory] = useState("All");

  const { width } = useWindowDimensions();

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  // --------------------------------------------------
  // 3. FILTER PRODUCTS
  // --------------------------------------------------

  // Show all products or only products belonging to the selected category.
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // --------------------------------------------------
  // 4. PRODUCT LIST SCREEN
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            {/* Brand Name */}
            <Text style={styles.brand}>AEROSTORE</Text>

            {/* Screen Heading */}
            <Text style={styles.heading}>Discover Products</Text>

            <Text style={styles.subtitle}>
              Browse from a range of products.
            </Text>

            {/* Category Filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            >
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.selectedCategoryButton,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Dynamic Product Count */}
            <Text style={styles.productCount}>
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <ProductCard product={item} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No products found in this category.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

// --------------------------------------------------
// 5. SCREEN STYLES
// --------------------------------------------------

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

  // Horizontal category filter layout.
  categoryList: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 18,
  },

  // Default category button.
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(238, 226, 204, 0.35)",
    backgroundColor: "transparent",
  },

  // Selected category button.
  selectedCategoryButton: {
    backgroundColor: "#e2a602",
    borderColor: "#e2a602",
  },

  // Default category text.
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EBEBD8",
  },

  // Selected category text.
  selectedCategoryText: {
    color: "#062723",
  },

  // Dynamic product count.
  productCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EBEBD8",
    opacity: 0.75,
    marginBottom: 16,
  },

  // Product grid layout.
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // Empty category message.
  emptyMessage: {
    color: "#EBEBD8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
});
