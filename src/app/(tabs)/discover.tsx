import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/discover/SearchBar";
import SortSelector from "@/components/discover/SortSelector";
import { ErrorState } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import useProductFilters from "@/hooks/useProductFilters";
import useProducts from "@/hooks/useProducts";

import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

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
  const { products, isLoading, isRefreshing, error, refresh } = useProducts();

  const { category } = useLocalSearchParams<{ category?: string }>();

  const { width } = useWindowDimensions();

  const horizontalPadding = 20;
  const columnGap = 14;

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    categories,
    filteredProducts,
    resetFilters,
  } = useProductFilters(products);

  // Sync category received from Home navigation.
  useEffect(() => {
    const requestedCategory = Array.isArray(category) ? category[0] : category;

    setSelectedCategory(
      categories.includes(requestedCategory ?? "")
        ? (requestedCategory ?? "All")
        : "All",
    );
  }, [category, categories, setSelectedCategory]);

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

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ErrorState
          title="Couldn't load products"
          message={error}
          onRetry={refresh}
        />
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

            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

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

            <View style={styles.resultsToolbar}>
              <Text style={styles.productCount}>
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </Text>

              <SortSelector value={sortOption} onChange={setSortOption} />
            </View>

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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {searchQuery.trim()
                ? "No matching products"
                : "No products found"}
            </Text>

            <Text style={styles.emptyMessage}>
              {searchQuery.trim()
                ? `We couldn't find products matching "${searchQuery.trim()}".`
                : "Try changing your category or search filters."}
            </Text>

            <Pressable
              onPress={resetFilters}
              style={styles.resetButton}
              accessibilityRole="button"
            >
              <Text style={styles.resetButtonText}>Clear Filters</Text>
            </Pressable>
          </View>
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
    zIndex: 100,
    elevation: 100,
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

  resultsToolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    zIndex: 100,
    elevation: 100,
  },

  productCount: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },

  emptyMessage: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },

  resetButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  resetButtonText: {
    color: COLORS.textOnAccent,
    fontSize: 12,
    fontWeight: "700",
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

  refreshError: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
});
