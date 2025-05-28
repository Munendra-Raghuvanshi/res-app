import { MenuItem } from "@/store/useRestaurent";

export interface cartItem extends MenuItem {
    quantity:number;

}
export type CartState={
    cart:cartItem[];
    addToCart:(item:MenuItem)=>void;
    clearCart:()=>void;
    removeFromThecart:(id:string)=>void;
    increamentQuality:(id:string)=>void;
    decrementQuality:(id:string)=>void;
}