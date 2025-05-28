export type checkoutSessionRequest={
    cartItems:{
        menuId:string;
        name:string;
        image:string;
        price:string;
        quantity:string;
    }[],
    deliveryDetails:{
        name:string;
        email:string;
        contact:string;
        address:string;
        city:string;
        contary:string;
    },
    restaurantId:string;

}
export interface Order extends checkoutSessionRequest{
    _id:string;
    status:string;
    totalAmount:number;
}
export type orderState={
    order:Order[];
    createcheckoutSession:(checkoutSessionRequest:checkoutSessionRequest)=>Promise<void>;
    getOrderDetails:()=>Promise<void>;
}