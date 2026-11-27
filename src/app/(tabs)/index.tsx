import { useMemo } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroBanner from "@/components/home/HeroBanner";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import { ErrorState } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import useProducts from "@/hooks/useProducts";

export default function HomeScreen() {
  const { products, isLoading, isRefreshing, error, refresh } = useProducts();

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
            progressBackgroundColor={COLORS.card}
          />
        }
      >
        <HomeHeader />
        <HeroBanner />

        {isLoading && products.length === 0 ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color={COLORS.accent} />
            <Text style={styles.stateText}>Loading products...</Text>
          </View>
        ) : error && products.length === 0 ? (
          <ErrorState
            title="Couldn't load products"
            message={error}
            onRetry={refresh}
          />
        ) : products.length === 0 ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>
              No products available right now.
            </Text>
          </View>
        ) : (
          <>
            {error && (
              <Text style={styles.refreshError}>
                Refresh failed. Showing previously loaded products.
              </Text>
            )}

            <CategorySection categories={categories} />
            <FeaturedProducts products={products} />
            <HomeFooter />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  stateContainer: {
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },

  stateText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  refreshError: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
