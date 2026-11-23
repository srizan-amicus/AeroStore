import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export default function HomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>AEROSTORE</Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.navigate("/discover")}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Search products"
        >
          <Ionicons
            name="search-outline"
            size={22}
            color={COLORS.textPrimary}
          />
        </Pressable>

        <Pressable
          onPress={() => router.navigate("/cart")}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Open shopping cart"
        >
          <Ionicons name="bag-outline" size={22} color={COLORS.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  brand: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 4,
    color: COLORS.accent,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  iconButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
});
