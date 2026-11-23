import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { COLORS } from "@/constants/theme";
import { products } from "@/data/products";

const categoryImages: Record<string, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=85",

  Accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85",

  Footwear:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85",

  Lifestyle:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=85",

  Fashion:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=85",

  "Home & Living":
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=85",
};

// Generate unique categories dynamically.
const categories = [...new Set(products.map((product) => product.category))];

export default function CategorySection() {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    router.navigate({
      pathname: "/discover",
      params: { category },
    });
  };

  return (
    <View style={styles.container}>
      {/* Centered section heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Explore Categories</Text>

        <Text style={styles.subtitle}>Find your everyday essentials.</Text>
      </View>

      {/* Horizontal category cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => handleCategoryPress(category)}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.cardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Explore ${category}`}
          >
            <Image
              source={{
                uri:
                  categoryImages[category] ??
                  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=85",
              }}
              style={styles.categoryImage}
            />

            <View style={styles.imageOverlay} />

            <Text style={styles.categoryName}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },

  headingContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "flex-start",
  },

  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
    textAlign: "center",
  },

  categoryList: {
    paddingHorizontal: 10,
    gap: 10,
  },

  categoryCard: {
    width: 115,
    height: 135,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
  },

  categoryImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(20, 18, 16, 0.25)",
  },

  categoryName: {
    position: "absolute",
    bottom: 12,
    left: 8,
    right: 8,
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
