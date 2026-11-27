export type ShippingMethod = "standard" | "express";

export interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type ShippingFormErrors = Partial<
  Record<keyof ShippingFormData, string>
>;

export interface CheckoutSubmission {
  shippingDetails: ShippingFormData;
  shippingMethod: ShippingMethod;
  shippingCost: number;
}
