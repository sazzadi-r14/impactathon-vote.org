import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    finance: {
      coins: { type: Number, default: 0 }, // Gold coins (free)
      cash: { type: Number, default: 0 }, // Cash (1:1 with USD)
      cashLimit: { type: Number }, // max cash that can be bet per play
      redeemedCashReferralBonus: { type: Number, default: 0 }, // Amount of the lifetime cash referral bonus redeemed
      redeemedCoinsReferralBonus: { type: Number, default: 0 }, // Amount of the lifetime coins referral bonus redeemed
    },
    crypto: {
      ethereum: { type: String },
      privateKey: { type: String },
    },
    banking: {
      authorizeNetId: { type: String }, // Authorize.net customer profile ID
      paymentProfiles: [{ type: String }], // Authorize.net payment profile IDs
    },
    balance: { type: Number, default: 0 }, // Promo balance in ETH (deprecated)
    firebaseId: { type: String },
    referralCode: { type: String, unique: true },
    referredBy: { type: Schema.Types.ObjectId },
    streams: [{ type: String }],
    freeCoinsGiven: { type: Date }, // Last time free coins were gievn
    wonAlert: { type: Boolean, default: false }, // Won alert
    feedbackGiven: { type: Boolean, default: false },
    ipAddresses: [{ type: String }],
    fingerprints: [{ type: String }], // Browser fingerprints
    visitorIds: [{ type: String }], // IDs from Fingerprint Pro
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("parlays", {
  ref: "Parlay",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", UserSchema);

export default User;
