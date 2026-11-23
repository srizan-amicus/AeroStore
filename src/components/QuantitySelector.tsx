import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui";

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  min = 1,
  max = 10,
  onQuantityChange,
}: QuantitySelectorProps) {
  return (
    <View style={styles.container}>
      <Button
        variant="outline"
        size="small"
        disabled={quantity <= min}
        onPress={() => onQuantityChange(quantity - 1)}
        accessibilityLabel="Decrease quantity"
        style={styles.controlButton}
        textStyle={styles.controlText}
      >
        −
      </Button>

      <Text style={styles.quantity} accessibilityLiveRegion="polite">
        {quantity}
      </Text>

      <Button
        variant="primary"
        size="small"
        disabled={quantity >= max}
        onPress={() => onQuantityChange(quantity + 1)}
        accessibilityLabel="Increase quantity"
        style={styles.controlButton}
        textStyle={styles.controlText}
      >
        +
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 12,
  },

  controlButton: {
    width: 28,
    minHeight: 28,
    paddingHorizontal: 0,
    borderRadius: 8,
  },

  controlText: {
    fontSize: 13,
  },

  quantity: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#062723",
  },
});
