import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogDescription, DialogFooter } from "./ui/dialog";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserstore } from "@/store/useUserstore";
import { useCartStore } from "@/store/userCartstore";
import useRestaurent from "@/store/useRestaurent";
import { checkoutSessionRequest } from "@/types/orderType";
import { useOrderStore } from "@/store/useOrderStore";

const CheckoutConfirmPage = ({
  open,
  setopen,
}: {
  open: boolean;
  setopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {user} = useUserstore();
  const [input, setinput] = useState({
    name: user?.fullname || "",
    email:user?.email || "",
    contact:user?.contact.toString() || "",
    address:user?.address || "",
    city:user?.city || "",
    contary:user?.countary || "",
  });

  const {cart} = useCartStore();
  const {restaurant}=useRestaurent();
  
  const {createcheckoutSession}=useOrderStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const changeoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api implement here 

    try {
       const checkoutData:checkoutSessionRequest={
        cartItems:cart.map((cartItem)=> ({
          menuId:cartItem._id,
          name:cartItem.name,
          image:cartItem.image,
          price:cartItem.price.toString(),
          quantity:cartItem.quantity.toString(),
          status: "pending"

        })),
        deliveryDetails:input,
        restaurantId:restaurant?._id as string,
        
        
       }
       await createcheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }


    
  };
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogContent>
          <DialogTitle className="text-center font-bold font-sans">
            Review Your Order
          </DialogTitle>
          <DialogDescription className="text-center">
            Double click Your develivery details and ensure everything is in
            order When you are ready.hit confrim button to finalize your order
          </DialogDescription>
          <form
            onSubmit={changeoutHandler}
            className="md:ml-8 justify-center  items-center gap-3 md:mb-8 my-1  items-center"
          >
            <div>
              <Label className="text-center font-bold">FullName</Label>
              <Input
                className="justify-center items-center w-2/3 "
                type="text"
                placeholder="Enter Your Full Name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-center font-bold">Email</Label>
              <Input
              disabled
                className="justify-center items-center w-2/3 "
                type="email"
                placeholder="Enter Your Full Email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-center font-bold">Contact Number</Label>
              <Input
                className="justify-center items-center w-2/3 "
                type="text"
                placeholder="Enter Your Full contact number"
                name="contact"
                value={String(input.contact)}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-center font-bold">Addresh</Label>
              <Input
                className="justify-center items-center w-2/3 "
                type="text"
                placeholder="Enter Your Full Addresh"
                name="address"
                value={input.address}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-center font-bold">City</Label>
              <Input
                className="justify-center items-center w-2/3 "
                type="text"
                placeholder="Enter Your City"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-center font-bold">Countary</Label>
              <Input
                className="justify-center items-center w-2/3 "
                type="text"
                placeholder="Enter Your Countary"
                name="Contary"
                value={input.contary}
                onChange={changeEventHandler}
              />
            </div>
            <div className="m-3">
              <DialogFooter>
                <Button className="bg-orange-500 hover:bg-orange-400  rounded-2xl text-white ">
                  Continue to Payment
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CheckoutConfirmPage;
