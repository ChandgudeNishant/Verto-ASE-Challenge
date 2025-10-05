// models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    stock_quantity: {
      type: Number,
      required: [true, "stock_quantity is required"],
      min: [0, "stock_quantity cannot be negative"],
    },
    low_stock_threshold: {
      type: Number,
      default: 5,
      min: [0, "low_stock_threshold cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
