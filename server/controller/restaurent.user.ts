import { query, Request, Response,NextFunction } from "express";

import { Restaurant } from "../models/restaurent.models";
import { Multer } from "multer";
import UploadImageOnCloudnary from "../utilis/imageUpload";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
      const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
      const file = req.file;
      


      const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
      
      if (restaurant) {
           res.status(400).json({
              success: false,
              message: "Restaurant already exist for this user"
          });
          return;
      }
      if (!file) {
          res.status(400).json({
              success: false,
              message: "Image is required"
          });
          return;
      }
      const imageUrl = await UploadImageOnCloudnary(file as Express.Multer.File);
      await Restaurant.create({
          user: req.id,
          restaurantName,
          city,
          country,
          deliveryTime,
          cuisines: JSON.parse(cuisines),
          imageUrl
      });
       res.status(201).json({
          success: true,
          message: "Restaurant Added"
      });
     
  } catch (error) {
    console.error("CreateRestaurant Error:", error);
       res.status(500).json({ message: "Internal server error" })
  }
}

export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');

    if (!restaurant) {
      res.status(404).json({
        success: false,
        restaurant:null,
        message: "Restaurant not found",
      });
      return;
    }
    

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateRestaurent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
    if (!restaurant) {
       res.status(404).json({
        success: true,
        message: "Restaurent not found",
      });
      return;
    }
    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await UploadImageOnCloudnary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();

     res.status(200).json({
      success: true,
      message: "restaurant is updated",
      restaurant,
    });
    return;
  } catch (error) {
    console.log(error);
     res.status(500).json({
      message: "internal server error",
    });
    return;
  }
};

export const getRestaurantOrder = async (res: Response, req: Request): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
       res.status(404).json({
        success: false,
        message: "Restaurent not found",
      });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant.id })
      .populate("restaurant")
      .populate("user");
    res.status(200).json({
      success: true,
      orders,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
    return
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
       res.status(404).json({
        success: false,
        message: "Order does not find",
      });
      return;
    }

    order.status = status;
    await order.save();
     status(200).json({
      success: true,
      message: "Order is Updated",
    });
    return;
  } catch (error) {
    console.log(error);
     res.status(500).json({
      message: "internal server error",
    });
    return;
  }
};

export const searchRestaurant = async (req: Request, res: Response):Promise<void> => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery || "";
    const selectedCuisions = ((req.query.selectedCuisions as string) || "")
      .split(",")
      .filter((cuisines) => cuisines);

    const query: any = {};
    /// filter in the Basis of searchQuiry
    if (searchText) {
      query.$or = [
        {
          restaurantName: { $regex: searchText, $options: "i" },
        },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }
    if (searchQuery) {
      query.$or = [
        { restauranName:{ regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (selectedCuisions.length > 0) {
      query.cuisines = { $in: selectedCuisions };
    }

    const restaurants = await Restaurant.find(query);
     res.status(200).json({
      success: true,
      data: restaurants,
    });
    return;

    
  } catch (error) {
    console.log(error);
     res.status(500).json({
      message: "internal server error",
    });
    return;
  }
};

export const getSingleRestaurant = async (req: Request, res: Response):Promise<void> => {
  try {
    const restaurenId = req.params.id;
    const restaurant = await Restaurant.findById(restaurenId).populate({
      path: "menus",
      options: { createAt: -1 },
    });
    if (!restaurant) {
      res.status(400).json({
        success: false,
        message: "Restaurant does not fond",
      });
      return;
    }

     res.status(200).json({success:true,restaurant});
     return;
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "internal server error" });
  }
  return;
};
