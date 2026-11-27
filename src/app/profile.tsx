import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface ProfileMenuItemProps {
  icon: IconName;
  title: string;
  subtitle: string;
}

function ProfileMenuItem({ icon, title, subtitle }: ProfileMenuItemProps) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={21} color={COLORS.accent} />
      </View>

      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="arrow-forward" size={18} color={COLORS.textSecondary} />
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={21} color={COLORS.textPrimary} />
          </Pressable>

          <Text style={styles.headerBrand}>AEROSTORE</Text>

          <View style={styles.headerButton} />
        </View>

        {/* Profile hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.guestBadge}>
              <View style={styles.guestDot} />
              <Text style={styles.guestBadgeText}>GUEST ACCOUNT</Text>
            </View>

            <Ionicons name="sparkles-outline" size={22} color={COLORS.accent} />
          </View>

          <View style={styles.profileIdentity}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={38} color={COLORS.accent} />
            </View>

            <View style={styles.identityContent}>
              <Text style={styles.greeting}>Hello,</Text>
              <Text style={styles.userName}>Guest.</Text>
              <Text style={styles.welcomeMessage}>
                Welcome to a more elevated experience.
              </Text>
            </View>
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.heroBottom}>
            <View>
              <Text style={styles.heroEyebrow}>YOUR ACCOUNT</Text>
              <Text style={styles.heroTitle}>Make it yours.</Text>
            </View>

            <Ionicons name="arrow-forward" size={23} color={COLORS.accent} />
          </View>
        </View>

        {/* Account menu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <Text style={styles.sectionIndex}>01 — 03</Text>
        </View>

        <View style={styles.menuContainer}>
          <ProfileMenuItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Your personal details"
          />

          <View style={styles.menuDivider} />

          <ProfileMenuItem
            icon="location-outline"
            title="Saved Addresses"
            subtitle="Your delivery destinations"
          />

          <View style={styles.menuDivider} />

          <ProfileMenuItem
            icon="cube-outline"
            title="My Orders"
            subtitle="Your shopping history"
          />
        </View>

        {/* Support */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>NEED ASSISTANCE?</Text>
        </View>

        <View style={styles.supportCard}>
          <View style={styles.menuIcon}>
            <Ionicons name="headset-outline" size={22} color={COLORS.accent} />
          </View>

          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Customer Support</Text>
            <Text style={styles.menuSubtitle}>
              We're here when you need us.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={COLORS.textSecondary}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>AEROSTORE</Text>

          <Text style={styles.footerTagline}>ELEVATE YOUR EVERYDAY</Text>

          <Text style={styles.copyright}>
            © 2026 AEROSTORE. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 18,
  },

  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },

  headerBrand: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 4,
    color: COLORS.textPrimary,
  },

  // Hero card
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 20,
    overflow: "hidden",
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  guestBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },

  guestDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
  },

  guestBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.3,
    color: COLORS.textSecondary,
  },

  profileIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 30,
    marginBottom: 28,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
  },

  identityContent: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  userName: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: COLORS.textPrimary,
    marginTop: 2,
  },

  welcomeMessage: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginTop: 5,
  },

  heroDivider: {
    height: 1,
    backgroundColor: COLORS.borderSubtle,
  },

  heroBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },

  heroEyebrow: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.8,
    color: COLORS.textSecondary,
  },

  heroTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 6,
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: COLORS.textPrimary,
  },

  sectionIndex: {
    fontSize: 10,
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },

  // Menu
  menuContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    paddingHorizontal: 15,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingVertical: 17,
  },

  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  menuSubtitle: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  menuDivider: {
    height: 1,
    backgroundColor: COLORS.borderSubtle,
    marginLeft: 56,
  },

  // Support
  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 15,
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 42,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },

  footerBrand: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 5,
    color: COLORS.accent,
  },

  footerTagline: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    color: COLORS.textSecondary,
    marginTop: 9,
  },

  copyright: {
    fontSize: 9,
    color: COLORS.textSecondary,
    marginTop: 20,
  },
});
