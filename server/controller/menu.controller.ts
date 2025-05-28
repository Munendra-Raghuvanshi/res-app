import { Request, Response } from "express";
import UploadImageOnCloudnary from "../utilis/imageUpload";
import { Menu } from "../models/menu.models";
import { Restaurant } from "../models/restaurent.models";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: "image is required",
      });
      return;
    }
    const imagetURL = await UploadImageOnCloudnary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imagetURL,
    });

    //find restaurent   

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu.id);

      
      await restaurant.save();
    }
    res.status(201).json({
      success: true,
      message: "Menu add Successfully",
      menu,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
  return;
};

export const editMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
      res.status(404).json({
        success: false,
        message: "menu is not found",
      });
      return;
    }
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price !== undefined) menu.price = price;

    if (file) {
      const imageURL = await UploadImageOnCloudnary(
        file as Express.Multer.File
      );
      menu.image = imageURL;
    }
    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu update",
      menu,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server",
    });
  }
};
