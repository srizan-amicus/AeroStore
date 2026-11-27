import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    type TextInputProps,
    View,
} from "react-native";

import { COLORS } from "@/constants/theme";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  maxLength?: number;
}

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  autoCapitalize = "sentences",
  maxLength,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
        ]}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 9,
    letterSpacing: 0.3,
  },

  input: {
    height: 52,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 11,
    paddingHorizontal: 15,
    fontSize: 13,
    color: COLORS.textPrimary,
  },

  focusedInput: {
    borderColor: COLORS.accent,
  },

  errorInput: {
    borderColor: "#D46A6A",
  },

  errorText: {
    fontSize: 11,
    color: "#D46A6A",
    marginTop: 7,
  },
});
