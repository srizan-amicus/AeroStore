import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export type ShippingMethod = "standard" | "express";

interface ShippingMethodSelectorProps {
  value: ShippingMethod;
  onChange: (method: ShippingMethod) => void;
}

const SHIPPING_OPTIONS: {
  id: ShippingMethod;
  title: string;
  description: string;
  price: string;
}[] = [
  {
    id: "standard",
    title: "Standard Delivery",
    description: "Delivered within 5–7 business days",
    price: "FREE",
  },
  {
    id: "express",
    title: "Express Delivery",
    description: "Delivered within 1–2 business days",
    price: "₹99",
  },
];

export default function ShippingMethodSelector({
  value,
  onChange,
}: ShippingMethodSelectorProps) {
  return (
    <View style={styles.container}>
      {SHIPPING_OPTIONS.map((option) => {
        const isSelected = value === option.id;

        return (
          <Pressable
            key={option.id}
            onPress={() => onChange(option.id)}
            style={[styles.option, isSelected && styles.selectedOption]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.selectedRadioOuter,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>

              <View style={styles.details}>
                <Text style={styles.title}>{option.title}</Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>
            </View>

            <Text style={styles.price}>{option.price}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },

  selectedOption: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surface,
  },

  optionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedRadioOuter: {
    borderColor: COLORS.accent,
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },

  details: {
    flex: 1,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  description: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  price: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
    marginLeft: 8,
  },
});
