import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export default function CartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <Pressable style={styles.button} onPress={() => router.push("/checkout")}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.textOnAccent,
    fontWeight: "700",
  },
});
