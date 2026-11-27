import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ShippingForm from "@/components/checkout/ShippingForm";
import { COLORS } from "@/constants/theme";
import type { CheckoutSubmission } from "@/types/checkout";

export default function CheckoutScreen() {
  const router = useRouter();
  const [submission, setSubmission] = useState<CheckoutSubmission | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={21} color={COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerTitle}>
          <Text style={styles.brand}>AEROSTORE</Text>
          <Text style={styles.headerSubtitle}>CHECKOUT</Text>
        </View>
      </View>

      {submission ? (
        <ScrollView
          contentContainerStyle={styles.confirmationContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={34} color={COLORS.textOnAccent} />
          </View>

          <Text style={styles.successTitle}>Shipping Details Saved</Text>

          <Text style={styles.successDescription}>
            Your delivery information has been validated successfully.
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryHeading}>DELIVERY SUMMARY</Text>

            <Text style={styles.customerName}>
              {submission.shippingDetails.fullName}
            </Text>

            <Text style={styles.summaryText}>
              {submission.shippingDetails.address}
            </Text>
            <Text style={styles.summaryText}>
              {submission.shippingDetails.city},{" "}
              {submission.shippingDetails.state} -{" "}
              {submission.shippingDetails.pinCode}
            </Text>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Method</Text>
              <Text style={styles.summaryValue}>
                {submission.shippingMethod === "express"
                  ? "Express Delivery"
                  : "Standard Delivery"}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Cost</Text>
              <Text style={styles.summaryValue}>
                {submission.shippingCost === 0
                  ? "FREE"
                  : `₹${submission.shippingCost}`}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Email</Text>
              <Text style={styles.summaryValue}>
                {submission.shippingDetails.email}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phone</Text>
              <Text style={styles.summaryValue}>
                {submission.shippingDetails.phone}
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.replace("/(tabs)")}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={COLORS.textOnAccent}
            />
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => setSubmission(null)}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryButtonText}>
              Edit Shipping Details
            </Text>
          </Pressable>
        </ScrollView>
      ) : (
        <View style={styles.formContainer}>
          <ShippingForm onSubmit={setSubmission} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
    marginRight: 38,
  },
  brand: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2.5,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    marginTop: 3,
  },
  formContainer: {
    flex: 1,
  },
  confirmationContainer: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 42,
    alignItems: "center",
  },
  successIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  successTitle: {
    color: COLORS.textPrimary,
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
  },
  successDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 9,
    marginBottom: 30,
  },
  summaryCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: 20,
  },
  summaryHeading: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 18,
  },
  customerName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  summaryText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.borderSubtle,
    marginVertical: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  summaryValue: {
    flexShrink: 1,
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  primaryButton: {
    width: "100%",
    height: 54,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryButtonText: {
    color: COLORS.textOnAccent,
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryButton: {
    padding: 16,
    marginTop: 6,
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
});
