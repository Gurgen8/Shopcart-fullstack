import express from "express"
import {verifyTokenAdmin,verifyTokenAndAuthorization } from "./verifyToken";
import OrderController from "../controller/OrderController"
const router = express.Router()

///create-order
router.put("/", verifyTokenAdmin,  OrderController.createOrder)

///update-order
router.put("/:id", verifyTokenAdmin, OrderController.updateOrder)

///delete-order
router.delete("/:id", verifyTokenAdmin, OrderController.deleteOrder)

///get-user-orders

router.get("/find/:userId", verifyTokenAndAuthorization, OrderController.getOrders)

///getALL-order
router.get("/find", verifyTokenAdmin, OrderController.getAllOrders)

///get -Montly-income
router.get("/income", verifyTokenAdmin ,OrderController.getIncomes)



export default router