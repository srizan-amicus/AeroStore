import type { ReactNode } from "react";
import {
    StyleSheet,
    View,
    type StyleProp,
    type ViewProps,
    type ViewStyle,
} from "react-native";

type CardVariant = "default" | "outlined" | "elevated";
type CardPadding = "none" | "small" | "medium" | "large";

interface CardProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  style?: StyleProp<ViewStyle>;
}

export default function Card({
  children,
  variant = "default",
  padding = "medium",
  style,
  ...viewProps
}: CardProps) {
  return (
    <View
      {...viewProps}
      style={[
        styles.base,
        VARIANT_STYLES[variant],
        PADDING_STYLES[padding],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    overflow: "hidden",
  },

  default: {
    backgroundColor: "#EEE2CC",
  },

  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e2a602",
  },

  elevated: {
    backgroundColor: "#EEE2CC",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  none: {
    padding: 0,
  },

  small: {
    padding: 12,
  },

  medium: {
    padding: 18,
  },

  large: {
    padding: 26,
  },
});

const VARIANT_STYLES = {
  default: styles.default,
  outlined: styles.outlined,
  elevated: styles.elevated,
};

const PADDING_STYLES = {
  none: styles.none,
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};
