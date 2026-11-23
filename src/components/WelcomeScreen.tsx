import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/discover");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>AEROSTORE</Text>
          <View style={styles.brandLine} />
        </View>

        {/* Glass content panel */}
        <BlurView intensity={35} tint="default" style={styles.glassCard}>
          <View style={styles.cardContent}>
            <Text style={styles.eyebrow}>YOUR JOURNEY STARTS HERE</Text>

            <Text style={styles.title}>
              Welcome to{"\n"}
              <Text style={styles.titleHighlight}>AeroStore</Text>
            </Text>

            <Text style={styles.description}>
              Build amazing mobile apps with React Native and Expo.
            </Text>

            <Pressable
              onPress={handleGetStarted}
              accessibilityRole="button"
              accessibilityLabel="Get Started"
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Get Started</Text>

              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </View>
        </BlurView>

        {/* Footer */}
        <Text style={styles.footer}>DESIGNED FOR WHAT'S NEXT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
    paddingVertical: 32,
  },

  brandContainer: {
    alignItems: "center",
    gap: 10,
  },

  brandName: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 5,
    color: COLORS.textSecondary,
  },

  brandLine: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },

  glassCard: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    backgroundColor: COLORS.surface,
  },

  cardContent: {
    paddingHorizontal: 26,
    paddingVertical: 38,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },

  title: {
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 46,
    color: COLORS.textPrimary,
    letterSpacing: -1.5,
    textAlign: "center",
  },

  titleHighlight: {
    color: COLORS.accent,
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
    marginTop: 20,
    marginBottom: 32,
    textAlign: "center",
  },

  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    minHeight: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: COLORS.textOnAccent,
    fontSize: 16,
    fontWeight: "700",
  },

  buttonArrow: {
    color: COLORS.textOnAccent,
    fontSize: 20,
  },

  footer: {
    textAlign: "center",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 3,
    color: COLORS.textSecondary,
  },
});
