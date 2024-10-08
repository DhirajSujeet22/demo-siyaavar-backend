const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [1, "minimum 1 rupee price at least"],
    },

    // discountPercentage: {
    //   type: Number,
    //   required: true,
    //   mix: [99, "maximum 99% discount allowed"],
    //   default: 0,
    // },

    // discountPrice: {
    //   type: Number,
    // },

    rating: {
      type: Number,
      required: true,
      mix: [5, "maximum 5 rating allowed"],
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: [0, "minimum 0 stock at least"],
      default: 0,
    },

    brand: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    sizes: {
      type: [String],
      required: true,
    },

    colors: {
      type: [String],
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// ===================================================

const virtualId = ProductSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// ===================================================

module.exports = mongoose.model("Product", ProductSchema);
