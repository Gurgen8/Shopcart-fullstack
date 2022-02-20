import express from "express"
import {verifyTokenAdmin } from "./verifyToken";
import ProductController from "../controller/ProductController"
const router = express.Router()

///create-product
router.put("/", verifyTokenAdmin,  ProductController.createProduct)

///update-product
router.put("/:id", verifyTokenAdmin, ProductController.updateProduct)

///delete-product
router.delete("/:id", verifyTokenAdmin, ProductController.deleteProduct)

///get-product
router.get("/find/:id", ProductController.getProduct)

///getALL-products
router.get("/find", ProductController.getAllProduct)



export default router