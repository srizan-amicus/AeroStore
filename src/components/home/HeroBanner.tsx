import { useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/constants/theme";

const HERO_IMAGE =
  "https://plus.unsplash.com/premium_photo-1683288706157-9913483dffc8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

export default function HeroBanner() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: HERO_IMAGE }}
      style={styles.banner}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>THE NEW COLLECTION</Text>

          <Text style={styles.heading}>Everyday{"\n"}Elegance.</Text>

          <Text style={styles.description}>
            Discover pieces that define your style.
          </Text>

          <Pressable
            onPress={() => router.navigate("/discover")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Explore Collection</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 330,
    marginHorizontal: 0,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: COLORS.surface,
  },

  image: {
    borderRadius: 18,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(24, 23, 23, 0.58)",
  },
  content: {
    alignItems: "flex-start",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: "#FFFFFF",
    marginBottom: 14,
  },

  heading: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#FFFFFF",
  },

  description: {
    fontSize: 13,
    fontWeight: "500",
    color: "#E2E6EA",
    marginTop: 12,
    marginBottom: 22,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: COLORS.textOnAccent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
