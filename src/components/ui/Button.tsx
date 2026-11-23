import {
    Pressable,
    StyleSheet,
    Text,
    type PressableProps,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <Pressable
      {...pressableProps}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        SIZE_STYLES[size],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, variantStyle.text, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 12,
  },

  primary: {
    backgroundColor: "#062723",
  },
  primaryText: {
    color: "#e2a602",
  },

  secondary: {
    backgroundColor: "#e2a602",
  },
  secondaryText: {
    color: "#062723",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#062723",
  },
  outlineText: {
    color: "#062723",
  },

  ghost: {
    backgroundColor: "transparent",
  },
  ghostText: {
    color: "#062723",
  },

  small: {
    minHeight: 34,
    paddingHorizontal: 12,
  },
  medium: {
    minHeight: 44,
    paddingHorizontal: 18,
  },
  large: {
    minHeight: 54,
    paddingHorizontal: 24,
  },

  text: {
    fontWeight: "700",
    fontSize: 14,
  },

  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

const VARIANT_STYLES = {
  primary: {
    container: styles.primary,
    text: styles.primaryText,
  },
  secondary: {
    container: styles.secondary,
    text: styles.secondaryText,
  },
  outline: {
    container: styles.outline,
    text: styles.outlineText,
  },
  ghost: {
    container: styles.ghost,
    text: styles.ghostText,
  },
};

const SIZE_STYLES = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};
