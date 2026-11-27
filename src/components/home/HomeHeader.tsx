import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export default function HomeHeader() {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleViewProfile = () => {
    setIsProfileMenuOpen(false);
    router.push("/profile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>AEROSTORE</Text>

      <View style={styles.actions}>
        {/* Search */}
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

        {/* Profile menu */}
        <View style={styles.profileContainer}>
          <Pressable
            onPress={() => setIsProfileMenuOpen((previous) => !previous)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Open profile menu"
            accessibilityState={{ expanded: isProfileMenuOpen }}
          >
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={COLORS.textPrimary}
            />
          </Pressable>

          {isProfileMenuOpen && (
            <View style={styles.dropdown}>
              <Pressable
                onPress={handleViewProfile}
                style={styles.dropdownItem}
                accessibilityRole="button"
              >
                <Ionicons
                  name="person-outline"
                  size={17}
                  color={COLORS.textSecondary}
                />

                <Text style={styles.dropdownText}>View Profile</Text>
              </Pressable>
            </View>
          )}
        </View>
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
    zIndex: 100,
    elevation: 100,
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

  profileContainer: {
    position: "relative",
    zIndex: 100,
    elevation: 100,
  },

  dropdown: {
    position: "absolute",
    top: 44,
    right: 0,
    width: 155,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    borderRadius: 10,
    padding: 5,
    zIndex: 100,
    elevation: 100,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  dropdownText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
});
