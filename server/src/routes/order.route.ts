import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated"
import { createCheckoutSession, getorders } from "../controller/order.controller"

const router=express.Router();

router.route("/").get(isAuthenticated,getorders);
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession);
//  router.route("/webhook").post()

export default router;