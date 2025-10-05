// services/product.service.js
import mongoose from "mongoose";
import Product from "../models/product.model.js";

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Create a product
 */
export async function createProduct(data) {
  console.log("Service: createProduct", data);
  const product = new Product(data);
  return await product.save();
}

/**
 * Get all products
 */
export async function getAllProducts() {
  console.log("Service: getAllProducts");
  return await Product.find().sort({ createdAt: -1 });
}

/**
 * Get product by id (throws on invalid id or not found)
 */
export async function getProductById(id) {
  console.log("Service: getProductById", id);
  if (!isValidObjectId(id)) throw new Error("Invalid Product ID");
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  return product;
}

/**
 * Update product (throws on invalid id, negative stock, or not found)
 */
export async function updateProduct(id, data) {
  console.log("Service: updateProduct", id, data);
  if (!isValidObjectId(id)) throw new Error("Invalid Product ID");
  if (data.stock_quantity !== undefined && data.stock_quantity < 0) {
    throw new Error("Stock quantity cannot be negative");
  }
  const updated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!updated) throw new Error("Product not found");
  return updated;
}

/**
 * Delete product (throws on invalid id or not found)
 */
export async function deleteProduct(id) {
  console.log("Service: deleteProduct", id);
  if (!isValidObjectId(id)) throw new Error("Invalid Product ID");
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Product not found");
  return deleted;
}

/**
 * Add stock (throws on invalid id, invalid amount, or not found)
 */
export async function addStock(id, amount) {
  console.log("Service: addStock", id, amount);
  if (!isValidObjectId(id)) throw new Error("Invalid Product ID");
  if (typeof amount !== "number" || amount <= 0) throw new Error("Invalid amount; must be a positive number");

  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.stock_quantity += amount;
  return await product.save();
}

/**
 * Reduce stock (throws on invalid id, invalid amount, insufficient stock, or not found)
 */
export async function reduceStock(id, amount) {
  console.log("Service: reduceStock", id, amount);
  if (!isValidObjectId(id)) throw new Error("Invalid Product ID");
  if (typeof amount !== "number" || amount <= 0) throw new Error("Invalid amount; must be a positive number");

  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  if (product.stock_quantity < amount) throw new Error("Insufficient stock");

  product.stock_quantity -= amount;
  return await product.save();
}

/**
 * Get products where stock_quantity < low_stock_threshold
 */
export async function getLowStockProducts() {
  console.log("Service: getLowStockProducts");
  return await Product.find({ $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] } });
}
