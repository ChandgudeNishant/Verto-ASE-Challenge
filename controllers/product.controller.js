// controllers/product.controller.js
import * as service from "../services/product.service.js";

/**
 * Create product
 */
export async function createProduct(req, res, next) {
  try {
    const product = await service.createProduct(req.body);
    console.log("Controller: Created product", product._id);
    return res.status(201).json(product);
  } catch (err) {
    console.error("Controller Error (createProduct):", err.message);
    return next(err);
  }
}

/**
 * Get all products
 */
export async function getProducts(req, res, next) {
  try {
    const products = await service.getAllProducts();
    return res.json(products);
  } catch (err) {
    console.error("Controller Error (getProducts):", err.message);
    return next(err);
  }
}

/**
 * Get one product
 */
export async function getProduct(req, res, next) {
  try {
    const product = await service.getProductById(req.params.id);
    return res.json(product);
  } catch (err) {
    console.error("Controller Error (getProduct):", err.message);
    return next(err);
  }
}

/**
 * Update product
 */
export async function updateProduct(req, res, next) {
  try {
    const product = await service.updateProduct(req.params.id, req.body);
    return res.json(product);
  } catch (err) {
    console.error("Controller Error (updateProduct):", err.message);
    return next(err);
  }
}

/**
 * Delete product
 */
export async function deleteProduct(req, res, next) {
  try {
    const deleted = await service.deleteProduct(req.params.id);
    console.log("Controller: Deleted product", deleted._id);
    return res.json({ message: "Product deleted successfully", product: deleted });
  } catch (err) {
    console.error("Controller Error (deleteProduct):", err.message);
    return next(err);
  }
}

/**
 * Add stock
 */
export async function addStock(req, res, next) {
  try {
    const amount = Number(req.body.amount);
    const product = await service.addStock(req.params.id, amount);
    console.log("Controller: Added stock", { id: product._id, newStock: product.stock_quantity });
    return res.json(product);
  } catch (err) {
    console.error("Controller Error (addStock):", err.message);
    return next(err);
  }
}

/**
 * Reduce stock
 */
export async function reduceStock(req, res, next) {
  try {
    const amount = Number(req.body.amount);
    const product = await service.reduceStock(req.params.id, amount);
    console.log("Controller: Reduced stock", { id: product._id, newStock: product.stock_quantity });
    return res.json(product);
  } catch (err) {
    console.error("Controller Error (reduceStock):", err.message);
    return next(err);
  }
}

/**
 * Low stock products
 */
export async function lowStockProducts(req, res, next) {
  try {
    const results = await service.getLowStockProducts();
    return res.json(results);
  } catch (err) {
    console.error("Controller Error (lowStockProducts):", err.message);
    return next(err);
  }
}
