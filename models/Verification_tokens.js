import mongoose, { model, models, Schema } from "mongoose";

const VerificationTokenSchema = new Schema({
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expiration: { type: Date, required: true }
});

export const Verification_Tokens = models?.Verification_Tokens || model("Verification_Tokens", VerificationTokenSchema);