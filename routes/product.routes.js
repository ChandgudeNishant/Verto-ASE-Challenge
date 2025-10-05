// routes/product.routes.js
import express from "express";
import * as controller from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         stock_quantity:
 *           type: integer
 *         low_stock_threshold:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - stock_quantity
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *               low_stock_threshold:
 *                 type: integer
 *             required:
 *               - name
 *               - stock_quantity
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", controller.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", controller.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
router.get("/:id", controller.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *               low_stock_threshold:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put("/:id", controller.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted product confirmation
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
router.delete("/:id", controller.deleteProduct);

/**
 * @swagger
 * /products/{id}/addStock:
 *   post:
 *     summary: Increase stock quantity for a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: Amount to add (positive integer)
 *     responses:
 *       200:
 *         description: Product with updated stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID or amount
 *       404:
 *         description: Product not found
 */
router.post("/:id/addStock", controller.addStock);

/**
 * @swagger
 * /products/{id}/reduceStock:
 *   post:
 *     summary: Decrease stock quantity for a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: Amount to remove (positive integer)
 *     responses:
 *       200:
 *         description: Product with updated stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID, amount, or insufficient stock
 *       404:
 *         description: Product not found
 */
router.post("/:id/reduceStock", controller.reduceStock);

/**
 * @swagger
 * /products/alerts/low-stock:
 *   get:
 *     summary: List products with stock below low_stock_threshold
 *     responses:
 *       200:
 *         description: Low stock products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/alerts/low-stock", controller.lowStockProducts);

export default router;
