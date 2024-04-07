import mongoose, { Schema } from "mongoose";

// Define the schema for the User model with various fields
const UserSchema = new Schema(
  {
    firstName: { type: String }, // User's first name
    lastName: { type: String }, // User's last name
    email: { type: String }, // User's email address
    finance: {
      coins: { type: Number, default: 0 }, // Number of gold coins the user has (used as a free currency)
      cash: { type: Number, default: 0 }, // Amount of cash (treated as equivalent to USD)
      cashLimit: { type: Number }, // Maximum amount of cash that can be bet in a single play
      redeemedCashReferralBonus: { type: Number, default: 0 }, // Total amount of cash referral bonus redeemed by the user over time
      redeemedCoinsReferralBonus: { type: Number, default: 0 }, // Total amount of coins referral bonus redeemed by the user over time
    },
    crypto: {
      ethereum: { type: String }, // Ethereum address of the user
      privateKey: { type: String }, // Private key for the user's Ethereum address (Sensitive information)
    },
    banking: {
      authorizeNetId: { type: String }, // Authorize.net customer profile ID for the user
      paymentProfiles: [{ type: String }], // List of Authorize.net payment profile IDs associated with the user
    },
    balance: { type: Number, default: 0 }, // User's promotional balance in Ethereum (ETH) - Deprecated
    firebaseId: { type: String }, // User's Firebase ID for authentication
    referralCode: { type: String, unique: true }, // Unique referral code assigned to the user
    referredBy: { type: Schema.Types.ObjectId }, // Reference to another user who referred this user
    streams: [{ type: String }], // Collection of stream identifiers associated with the user
    freeCoinsGiven: { type: Date }, // Timestamp of the last time free coins were given to the user
    wonAlert: { type: Boolean, default: false }, // Flag to indicate if the user has received a winning alert
    feedbackGiven: { type: Boolean, default: false }, // Flag to indicate if the user has provided feedback
    ipAddresses: [{ type: String }], // List of IP addresses used by the user
    fingerprints: [{ type: String }], // Browser fingerprints to help identify the user
    visitorIds: [{ type: String }], // IDs assigned to the user by Fingerprint Pro for tracking
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps to the document
    toJSON: { virtuals: true }, // Ensures virtual fields are included when the document is converted to JSON
    toObject: { virtuals: true }, // Ensures virtual fields are included when the document is converted to a plain object
  }
);

// Define a virtual field 'parlays' for the User schema to reference documents from another collection
UserSchema.virtual("parlays", {
  ref: "Parlay", // The model to use
  localField: "_id", // Field in this schema to match against the foreign collection
  foreignField: "user", // Field in the foreign collection to match against the local field
});

// Compile the UserSchema into a model and export it
const User = mongoose.model("User", UserSchema);

export default User;
