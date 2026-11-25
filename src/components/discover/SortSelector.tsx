import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";

import { COLORS } from "@/constants/theme";
import type { SortOption } from "@/hooks/useProductFilters";

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
  { label: "Top Rated", value: "rating" },
];

export default function SortSelector({ value, onChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    sortOptions.find((option) => option.value === value) ?? sortOptions[0];

  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (option: SortOption) => {
    onChange(option);
    closeDropdown();
  };

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setIsOpen(true)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Ionicons
          name="swap-vertical-outline"
          size={16}
          color={COLORS.accent}
        />

        <Text style={styles.triggerText}>{selectedOption.label}</Text>

        <Ionicons name="chevron-down" size={15} color={COLORS.textSecondary} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
        statusBarTranslucent
      >
        <Pressable style={styles.backdrop} onPress={closeDropdown}>
          <Pressable
            style={styles.options}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.optionsTitle}>Sort products</Text>

            {sortOptions.map((option) => {
              const isSelected = option.value === value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  style={[styles.option, isSelected && styles.selectedOption]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={COLORS.textOnAccent}
                    />
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 9,
  },

  triggerText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  options: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 12,
    padding: 10,
    elevation: 10,
  },

  optionsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 8,
  },

  selectedOption: {
    backgroundColor: COLORS.accent,
  },

  optionText: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },

  selectedOptionText: {
    fontWeight: "700",
    color: COLORS.textOnAccent,
  },
});
