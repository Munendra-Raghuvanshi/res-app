import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { MenuItem } from "@/store/useRestaurent";
import { useCartStore } from "@/store/userCartstore";
import { useNavigate } from "react-router-dom";



const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const {addToCart}=useCartStore();
  const navigate =useNavigate();
  return (
    <div className="md:p-4 ">
    <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
    <div className="grid md:grid-cols-3 gap-4">
      {menus.map((menu) => (
        <Card key={menu._id} className="shadow-lg rounded-lg overflow-hidden">
          <img
            className="w-full h-40 object-cover"
            src={menu.image}
            alt={menu.name}
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {menu.name}
            </h2>
            <p className="text-sm text-gray-500 mt-2">{menu.description}</p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-orange-400">{menu.price}</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>  {
              addToCart(menu),
              navigate("/cart")
            } } className="w-full bg-orange-500 hover:bg-orange-400">
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
  );
};
export default AvailableMenu;
