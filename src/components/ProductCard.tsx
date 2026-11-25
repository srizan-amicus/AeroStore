import { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Card } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const cardBackground = COLORS.card ?? COLORS.surface;

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const scale = useRef(new Animated.Value(0.8)).current;

  // Price formatting
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const totalPrice = product.price * (quantity || 1);
  const displayPrice = formattedPrice.format(totalPrice);

  // Animate quantity bar when it appears
  const showQuantityControls = () => {
    scale.setValue(0.8);

    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  // Quantity handlers
  const handleAdd = () => {
    setQuantity(1);
    showQuantityControls();
  };

  const handleDecrease = () => {
    setQuantity((current) => Math.max(0, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => Math.min(10, current + 1));
  };

  return (
    <Card variant="default" padding="none" style={styles.card}>
      {/* Product Image and Quantity Overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
          accessibilityLabel={product.title}
        />

        {/* Initial Add Button */}
        {quantity === 0 ? (
          <Pressable
            onPress={handleAdd}
            style={styles.addButton}
            accessibilityRole="button"
            accessibilityLabel={`Add ${product.title}`}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        ) : (
          /* Expanded Quantity Bar */
          <Animated.View
            style={[styles.quantityControls, { transform: [{ scale }] }]}
          >
            <Pressable
              onPress={handleDecrease}
              style={styles.quantityButton}
              accessibilityRole="button"
              accessibilityLabel="Decrease quantity"
            >
              <Text style={styles.controlText}>−</Text>
            </Pressable>

            <Text style={styles.quantity} accessibilityLiveRegion="polite">
              {quantity}
            </Text>

            <Pressable
              onPress={handleIncrease}
              style={styles.quantityButton}
              disabled={quantity >= 10}
              accessibilityRole="button"
              accessibilityLabel="Increase quantity"
            >
              <Text
                style={[
                  styles.controlText,
                  quantity >= 10 && styles.disabledText,
                ]}
              >
                +
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.details}>
        <View style={styles.titleRatingRow}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.price} numberOfLines={1}>
            {displayPrice}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: cardBackground,
    borderColor: COLORS.borderSubtle,
  },

  // Image wrapper allows controls to overlay the image.
  imageContainer: {
    height: 150,
    width: "100%",
    position: "relative",
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // Small circular Add button in the bottom-right corner.
  addButton: {
    position: "absolute",
    right: 7,
    bottom: 9,
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  addButtonText: {
    fontSize: 25,
    lineHeight: 20,
    fontWeight: "500",
    color: COLORS.textOnAccent,
  },

  // Full-width quantity bar at the bottom of the image.
  quantityControls: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 4,
    height: 23,
    borderRadius: 9,
    backgroundColor: COLORS.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    elevation: 3,
  },

  quantityButton: {
    width: 40,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  controlText: {
    fontSize: 21,
    fontWeight: "600",
    color: COLORS.textOnAccent,
  },

  quantity: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.textOnAccent,
    textAlign: "center",
  },

  disabledText: {
    opacity: 0.4,
  },

  details: {
    padding: 10,
  },

  titleRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
    minHeight: 36,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  star: {
    color: COLORS.accent,
    fontSize: 13,
  },

  rating: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  actionRow: {
    marginTop: 8,
  },

  price: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
});
