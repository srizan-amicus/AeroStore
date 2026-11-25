import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants/theme";
import useProducts from "@/hooks/useProducts";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoverScreen() {
  // API products and request states
  const { products, isLoading, isRefreshing, error, refresh } = useProducts();

  // Category received from Home screen navigation
  const { category } = useLocalSearchParams<{ category?: string }>();

  // Screen dimensions
  const { width } = useWindowDimensions();

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  // Generate categories from API products
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  // Selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sync selected category with navigation params
  useEffect(() => {
    const requestedCategory = Array.isArray(category) ? category[0] : category;

    setSelectedCategory(
      categories.includes(requestedCategory ?? "") ? requestedCategory! : "All",
    );
  }, [category, categories]);

  // Filter products based on selected category
  const filteredProducts = useMemo(
    () =>
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory],
  );

  // Retry handler
  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  // Loading state
  if (isLoading && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={styles.stateText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.stateContainer}>
          <Text style={styles.errorTitle}>Couldn't load products</Text>

          <Text style={styles.stateText}>{error}</Text>

          <Pressable
            onPress={handleRetry}
            style={styles.retryButton}
            accessibilityRole="button"
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
            progressBackgroundColor={COLORS.card}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>AEROSTORE</Text>

            <Text style={styles.heading}>Discover Products</Text>

            <Text style={styles.subtitle}>
              Browse from a range of products.
            </Text>

            {/* Category filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            >
              {categories.map((itemCategory) => {
                const isSelected = selectedCategory === itemCategory;

                return (
                  <Pressable
                    key={itemCategory}
                    onPress={() => setSelectedCategory(itemCategory)}
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
                      {itemCategory}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Product count */}
            <Text style={styles.productCount}>
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </Text>

            {error && (
              <Text style={styles.refreshError}>
                Refresh failed. Showing previously loaded products.
              </Text>
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flexGrow: 1,
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

  categoryList: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 18,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    backgroundColor: COLORS.surface,
  },

  selectedCategoryButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPill,
    letterSpacing: 0.3,
    textTransform: "capitalize",
  },

  selectedCategoryText: {
    color: COLORS.textOnAccent,
    fontWeight: "700",
  },

  productCount: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
    marginBottom: 16,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  emptyMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },

  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },

  stateText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: "center",
  },

  errorTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },

  retryButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
    marginTop: 4,
  },

  retryButtonText: {
    color: COLORS.textOnAccent,
    fontSize: 13,
    fontWeight: "700",
  },

  refreshError: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 12,
  },
});
