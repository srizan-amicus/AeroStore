import { useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import { Button, Card } from "@/components/ui";
import { COLORS } from "@/constants/theme";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const cardBackground = COLORS.card ?? COLORS.surface;

export default function ProductCard({ product }: ProductCardProps) {
  // --------------------------------------------------
  // 1. LOCAL STATE
  // --------------------------------------------------

  // Quantity starts at 0, so the Add button appears initially.
  const [quantity, setQuantity] = useState(0);

  // Animated value used for the quantity controls transition.
  const scale = useRef(new Animated.Value(0.8)).current;

  // --------------------------------------------------
  // 2. PRICE FORMATTING
  // --------------------------------------------------

  // Format prices using Indian Rupee currency formatting.
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  // Display unit price initially and total price after adding.
  const totalPrice = product.price * (quantity || 1);
  const displayPrice = formattedPrice.format(totalPrice);

  // --------------------------------------------------
  // 3. ANIMATION
  // --------------------------------------------------

  // Animate quantity controls from a smaller size to normal size.
  const showQuantityControls = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  // --------------------------------------------------
  // 4. QUANTITY HANDLERS
  // --------------------------------------------------

  // Add the product with an initial quantity of 1.
  const handleAdd = () => {
    scale.setValue(0.8);
    setQuantity(1);
    showQuantityControls();
  };

  // Decrease quantity. At 1, the product returns to the Add state.
  const handleDecrease = () => {
    setQuantity((current) => Math.max(0, current - 1));
  };

  // Increase quantity, with a maximum limit of 10.
  const handleIncrease = () => {
    setQuantity((current) => Math.min(10, current + 1));
  };

  // --------------------------------------------------
  // 5. PRODUCT CARD UI
  // --------------------------------------------------

  return (
    <Card variant="default" padding="none" style={styles.card}>
      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
        accessibilityLabel={product.title}
      />

      <View style={styles.details}>
        {/* Product Name */}
        <View style={styles.titleRatingRow}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Price and Action Controls */}
        <View style={styles.actionRow}>
          {/* Dynamic Product Price */}
          <Text style={styles.price} numberOfLines={1}>
            {displayPrice}
          </Text>

          {/* Show Add Button when quantity is 0 */}
          {quantity === 0 ? (
            <Button
              variant="primary"
              size="small"
              onPress={handleAdd}
              accessibilityLabel={`Add ${product.title}`}
              style={styles.addButton}
              textStyle={styles.buttonText}
            >
              Add
            </Button>
          ) : (
            // Show animated quantity controls when product is added.
            <Animated.View
              style={{
                transform: [{ scale }],
              }}
            >
              <View style={styles.quantityControls}>
                {/* Decrease Quantity */}
                <Button
                  variant="primary"
                  size="small"
                  onPress={handleDecrease}
                  accessibilityLabel="Decrease quantity"
                  style={styles.quantityButton}
                  textStyle={styles.buttonText}
                >
                  −
                </Button>

                {/* Current Quantity */}
                <Text style={styles.quantity} accessibilityLiveRegion="polite">
                  {quantity}
                </Text>

                {/* Increase Quantity */}
                <Button
                  variant="primary"
                  size="small"
                  onPress={handleIncrease}
                  disabled={quantity >= 10}
                  accessibilityLabel="Increase quantity"
                  style={styles.quantityButton}
                  textStyle={styles.buttonText}
                >
                  +
                </Button>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </Card>
  );
}

// --------------------------------------------------
// 6. COMPONENT STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: cardBackground,
    borderColor: COLORS.borderSubtle,
  },

  // Product image dimensions and fallback background.
  productImage: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.borderSubtle,
  },

  // Spacing inside the product card.
  details: {
    padding: 10,
  },

  // Product name typography.
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
    minHeight: 36,
  },

  // Places price and action controls on the same row.
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 8,
  },

  // Dynamic price styling.
  price: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },

  // Initial Add button styling.
  addButton: {
    minHeight: 30,
    width: 58,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
  },

  // Horizontal layout for minus, quantity and plus.
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  // Compact quantity control buttons.
  quantityButton: {
    width: 28,
    minHeight: 28,
    paddingHorizontal: 0,
    borderRadius: 7,
    backgroundColor: COLORS.accent,
  },

  // Text styling shared by Add and quantity buttons.
  buttonText: {
    fontSize: 13,
    color: COLORS.textOnAccent,
  },

  // Current quantity display.
  quantity: {
    minWidth: 16,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  // Rating layout.
  titleRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
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
});
