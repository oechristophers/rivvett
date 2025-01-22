import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, unique: false },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    provider: { type: String, default: null },
    emailVerified: {
      type: Date, // Stores the timestamp when the email was verified
      default: null, // Null means not verified
    },
    addresses: [
      {
        type: { type: String, enum: ['shipping', 'billing'], required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    orderHistory: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        status: { type: String },
        trackingNumber: { type: String, default: 'SIM123456789' },
        estimatedDeliveryDate: { type: Date, default: null },
        status: {
          type: String,
        },
        nextUpdateAt: { type: Date },
        total: { type: Number },
        createdAt: { type: Date },
      },
    ],
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        properties: { type: Object },
      },
    ],
    paymentMethods: [
      {
        type: { type: String, enum: ['card', 'paypal'] },
        cardHolderName: { type: String },
        last4: { type: String },
        expiry: { type: String },
      },
    ],
    role: {
      type: String,
      enum: ['admin', 'customer', 'staff'], // You can add more roles if needed
      default: 'customer', // Default role is customer
    },
  },

  { timestamps: true },
);

export const Users = models?.Users || model('Users', UserSchema);
