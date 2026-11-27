import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import FormField from "@/components/checkout/FormField";
import ShippingMethodSelector from "@/components/checkout/ShippingMethodSelector";
import { COLORS } from "@/constants/theme";

import type {
    CheckoutSubmission,
    ShippingFormData,
    ShippingFormErrors,
    ShippingMethod,
} from "@/types/checkout";

interface ShippingFormProps {
  onSubmit: (data: CheckoutSubmission) => void;
}

const INITIAL_FORM: ShippingFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

function validateForm(form: ShippingFormData): ShippingFormErrors {
  const errors: ShippingFormErrors = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  if (form.address.trim().length < 5) {
    errors.address = "Please enter a valid street address.";
  }

  if (!form.city.trim()) {
    errors.city = "City is required.";
  }

  if (!form.state.trim()) {
    errors.state = "State is required.";
  }

  if (!/^[1-9]\d{5}$/.test(form.pinCode.trim())) {
    errors.pinCode = "Enter a valid 6-digit PIN code.";
  }

  return errors;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [form, setForm] = useState<ShippingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ShippingFormErrors>({});
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  const updateField = (field: keyof ShippingFormData, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Clear the field's error as the user corrects it.
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const submission: CheckoutSubmission = {
      shippingDetails: {
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pinCode: form.pinCode.trim(),
      },
      shippingMethod,
      shippingCost: shippingMethod === "express" ? 99 : 0,
    };

    onSubmit(submission);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>CHECKOUT · STEP 01</Text>
        <Text style={styles.heading}>Shipping Details</Text>
        <Text style={styles.subtitle}>Where should we deliver your order?</Text>
      </View>

      {/* Personal information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>

        <FormField
          label="Full Name"
          value={form.fullName}
          onChangeText={(value) => updateField("fullName", value)}
          placeholder="Enter your full name"
          error={errors.fullName}
        />

        <FormField
          label="Email Address"
          value={form.email}
          onChangeText={(value) => updateField("email", value)}
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <FormField
          label="Phone Number"
          value={form.phone}
          onChangeText={(value) => updateField("phone", value)}
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          error={errors.phone}
        />
      </View>

      {/* Delivery address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>

        <FormField
          label="Street Address"
          value={form.address}
          onChangeText={(value) => updateField("address", value)}
          placeholder="House number, street, area"
          error={errors.address}
        />

        <FormField
          label="City"
          value={form.city}
          onChangeText={(value) => updateField("city", value)}
          placeholder="Enter your city"
          error={errors.city}
        />

        <FormField
          label="State"
          value={form.state}
          onChangeText={(value) => updateField("state", value)}
          placeholder="Enter your state"
          error={errors.state}
        />

        <FormField
          label="PIN Code"
          value={form.pinCode}
          onChangeText={(value) => updateField("pinCode", value)}
          placeholder="6-digit PIN code"
          keyboardType="number-pad"
          maxLength={6}
          error={errors.pinCode}
        />
      </View>

      {/* Shipping method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SHIPPING METHOD</Text>

        <ShippingMethodSelector
          value={shippingMethod}
          onChange={setShippingMethod}
        />
      </View>

      {/* Submit */}
      <Pressable
        onPress={handleSubmit}
        style={styles.submitButton}
        accessibilityRole="button"
      >
        <Text style={styles.submitButtonText}>Continue to Review</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Your delivery information will be used for this order.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 30,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.6,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
    color: COLORS.accent,
    marginBottom: 18,
  },

  submitButton: {
    height: 54,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  submitButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.textOnAccent,
    letterSpacing: 0.4,
  },

  footerText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 16,
  },
});
