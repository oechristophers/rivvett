import { model, models, Schema } from 'mongoose';
const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    streetAddress: String,
    country: String,
    postalCode: String,
    paid: Boolean,
    deliveryDetails: {
      carrier: { type: String, default: 'Custom Carrier' },
      trackingNumber: { type: String, default: 'SIM123456789' },
      estimatedDeliveryDate: { type: Date, default: null },
      status: {
        type: String,
      },
      nextUpdateAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model('Order', OrderSchema);
