import express from "express";
import StripeController from "../controller/StripeController";
const router = express.Router()

//paymant-system-pay
router.post('/pay',StripeController.pay)


export default router
