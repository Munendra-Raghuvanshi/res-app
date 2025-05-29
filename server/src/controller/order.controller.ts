import { Request, Response } from "express";
import { Restaurant } from "../models/restaurent.models";
import { Order } from "../models/order.model";
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    addresh: string;
    city: string;
  };
  restaurantId: string;
};

export const getorders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user")
      .populate("restaurant");
      
    res.status(200).json({
      success: true,
      orders,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const createCheckoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menus");
    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurant not Found",
      });
      return;
    }
    const order = new Order({
      restaurant: restaurant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
    });

    //line item
    const menuItem =restaurant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItem);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA']
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FORNTEND_URL}/Order/status`,
      cancel_url: `${process.env.FORNTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        image: JSON.stringify(menuItem.map((item: any) => item.image)),
      },
    });
    if (!session.url) {
      res
        .status(400)
        .json({ success: false, message: "Error while createing session" });
      return;
    }
    await order.save();
    res.status(200).json({
      session,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Internal server error",
    });
  }
};


// export const stripeWebhook = async (req: Request, res: Response) => {
//     let event;

//     try {
//         const signature = req.headers["stripe-signature"];

//         // Construct the payload string for verification
//         const payloadString = JSON.stringify(req.body, null, 2);
//         const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

//         // Generate test header string for event construction
//         const header = stripe.webhooks.generateTestHeaderString({
//             payload: payloadString,
//             secret,
//         });

//         // Construct the event using the payload string and header
//         event = stripe.webhooks.constructEvent(payloadString, header, secret);
//     } catch (error: any) {
//         console.error('Webhook error:', error.message);
//         return res.status(400).send(`Webhook error: ${error.message}`);
//     }

//     // Handle the checkout session completed event
//     if (event.type === "checkout.session.completed") {
//         try {
//             const session = event.data.object as Stripe.Checkout.Session;
//             const order = await Order.findById(session.metadata?.orderId);

//             if (!order) {
//                 return res.status(404).json({ message: "Order not found" });
//             }

//             // Update the order with the amount and status
//             if (session.amount_total) {
//                 order.totalAmount = session.amount_total;
//             }
//             order.status = "confirmed";

//             await order.save();
//         } catch (error) {
//             console.error('Error handling event:', error);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
//     // Send a 200 response to acknowledge receipt of the event
//     res.status(200).send();
// };

export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {
  // 1. create line items
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
      const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
      if (!menuItem) throw new Error(`Menu item id not found`);

      return {
          price_data: {
              currency: 'inr',
              product_data: {
                  name: menuItem.name,
                  images: [menuItem.image],
              },
              unit_amount: menuItem.price * 100
          },
          quantity: cartItem.quantity,
      }
  })
  // 2. return lineItems
  return lineItems;
}

