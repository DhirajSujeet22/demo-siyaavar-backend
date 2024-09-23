const mongoose = require("mongoose");
const { Schema } = mongoose;

const indexSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    addresses: {
      type: [Schema.Types.Mixed],
    },

    // phone: {
    //   type: String,
    //   required: [true, "Phone number is required"],
    //   trim: true,
    // },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", indexSchema);
