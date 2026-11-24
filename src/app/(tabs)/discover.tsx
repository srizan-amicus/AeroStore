import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants/theme";
import { products } from "@/data/products";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. CATEGORY DATA

// Generate unique categories dynamically from product data.
const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function HomeScreen() {
  // 2. STATE AND SCREEN DIMENSIONS

  const { category } = useLocalSearchParams<{ category?: string }>();

  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(category ?? "") ? category! : "All",
  );
  useEffect(() => {
    setSelectedCategory(
      categories.includes(category ?? "") ? category! : "All",
    );
  }, [category]);
  const { width } = useWindowDimensions();

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  // 3. FILTER PRODUCTS

  // Show all products or only products belonging to the selected category.
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // 4. PRODUCT LIST SCREEN

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

// 5. SCREEN STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 5,
    color: COLORS.accent,
    marginBottom: 18,
    textAlign: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    backgroundColor: COLORS.surface,
  },

  // Selected category button.
  selectedCategoryButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  // Default category text.
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPill,
    letterSpacing: 0.3,
  },

  // Selected category text.
  selectedCategoryText: {
    color: COLORS.textOnAccent,
    fontWeight: "700",
  },

  // Dynamic product count.
  productCount: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
    marginBottom: 16,
  },

  // Product grid layout.
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  // Empty category message.
  emptyMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
});
