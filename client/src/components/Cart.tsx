import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  Minus, Plus } from "lucide-react";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore } from "@/store/userCartstore";
import { cartItem } from "@/types/cartType";


const Cart = () => {
    const [open,setopen]=useState<boolean>(false);
    const {cart,decrementQuality,increamentQuality}=useCartStore();
    let totalAmount =cart.reduce((acc,ele)=>{
      return acc + ele.price *ele.quantity;
    },0)
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10  ">
      <div className="flex justify-end">
        <Button variant="link">Clear All</Button>
      </div>
      <Table className="cursor-pointer">
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Tittle</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead >Remove</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {
          cart.map((item:cartItem)=>(
        <TableRow>
                <TableCell>
                    <Avatar>
                        <AvatarImage src={item.image}/>
                        <AvatarFallback className="bg-gray-500">
                            CN
                        </AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                    <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800  shadow-md  ">
                        <Button onClick={()=> decrementQuality(item._id)} size={"icon"} variant={"outline"} className="rounded-full bg-gray-300 border-none "><Minus/></Button>
                        <Button size={'icon'} variant={"outline"} className="font-bold border-none">{item.quantity}</Button>
                        <Button onClick={()=>increamentQuality(item._id)} size={"icon"} variant={"outline"} className="rounded-full bg-gray-300 border-none "><Plus/></Button>
                    </div>
                </TableCell>
                <TableCell>{item.price * item.quantity}</TableCell>
                <TableCell>
                    <Button className="bg-orange-500 hover:bg-orange-400 cursor-pointer rounded-2xl ">Remove</Button>
                </TableCell>
            </TableRow>
          ))
        }
            
            <TableCell colSpan={5} className="font-bold  ">Total</TableCell>
            <TableCell className="font-bold text-right"> {totalAmount}</TableCell>
        </TableBody>
      </Table>
      <div className="justify-end flex my-5">
             <Button onClick={()=>setopen(true)} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl">Processed to Checkout</Button>
      </div>
      <CheckoutConfirmPage open={open} setopen={setopen}/>
    </div>
  );
};
export default Cart;
