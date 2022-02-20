import express from "express"
import {verifyTokenAdmin,verifyToken,verifyTokenAndAuthorization } from "./verifyToken";
import CartController from "../controller/CartController"
const router = express.Router()

///create-product
router.post("/", verifyToken,  CartController.createCart)

///update-cart
router.put("/:id", verifyTokenAndAuthorization,  CartController.updateCart)

///delete-cart
router.delete("/:id", verifyTokenAndAuthorization,  CartController.deleteCart)

///get-user-cart
router.get("/find/:userId", verifyTokenAndAuthorization,  CartController.getCart)

///getALL
router.get("/", verifyTokenAdmin, CartController.getAll)


export default router