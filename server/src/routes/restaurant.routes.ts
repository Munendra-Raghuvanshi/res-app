import  express  from "express";
import multer from 'multer';

import {createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurent} from "../controller/restaurent.user"
import upload from "../middlewares/multer"
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route('/').post(isAuthenticated, upload.single("image"),createRestaurant);
router.route('/').get(isAuthenticated,getRestaurant);
router.route('/').put(isAuthenticated,upload.single("image"),updateRestaurent);
router.route("/order/").get(isAuthenticated,getRestaurantOrder);
router.route('/order/:orderid/status').put(isAuthenticated,updateOrderStatus);
router.route('/search/:searchtext').get(isAuthenticated,searchRestaurant);
router.route('/:id').get(isAuthenticated,getSingleRestaurant);

export default router;