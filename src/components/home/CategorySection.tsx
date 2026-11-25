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

interface CategorySectionProps {
  categories: string[];
}

const categoryImages: Record<string, string> = {
  electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=85",
  jewelery:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=85",
  "men's clothing":
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=85",
  "women's clothing":
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=85",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=85";

export default function CategorySection({ categories }: CategorySectionProps) {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    router.navigate({
      pathname: "/discover",
      params: { category },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Explore Categories</Text>
        <Text style={styles.subtitle}>Find your everyday essentials.</Text>
      </View>

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
                uri: categoryImages[category] ?? FALLBACK_IMAGE,
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
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  categoryName: {
    position: "absolute",
    bottom: 12,
    left: 8,
    right: 8,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
    textTransform: "capitalize",
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
