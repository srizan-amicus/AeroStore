import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export default function HomeFooter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Brand */}
      <Text style={styles.brand}>AEROSTORE</Text>

      <Text style={styles.tagline}>
        Curated essentials. Timeless style. Everyday luxury.
      </Text>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Text style={styles.sectionTitle}>EXPLORE</Text>

        <View style={styles.links}>
          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.link}>Home</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/discover")}>
            <Text style={styles.link}>Discover</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/cart")}>
            <Text style={styles.link}>Cart</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/profile")}>
            <Text style={styles.link}>Profile</Text>
          </Pressable>
        </View>
      </View>

      {/* Copyright */}
      <View style={styles.divider} />

      <Text style={styles.copyright}>
        © 2026 AEROSTORE. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 28,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },

  brand: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 5,
    color: COLORS.textPrimary,
  },

  tagline: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 10,
    lineHeight: 19,
  },

  navigation: {
    marginTop: 28,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },

  link: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.borderSubtle,
    marginTop: 28,
    marginBottom: 18,
  },

  copyright: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
