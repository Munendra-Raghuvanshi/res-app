import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { cartItem } from "@/types/cartType";

const Success = () => {
  const { order, getOrderDetails } = useOrderStore();
  useEffect(() => {
    getOrderDetails();
  }, []);
  if (order.length == 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Order not Found !
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500 dark:bg-gray-300 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6 ">
          <h1 className="text-2xl font-bold  text-gray-800 dark:text-gray-200">
            Order status:
            <span className="text-orange-500">{"confrim".toUpperCase()}</span>
          </h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300  mb-4">
              {" "}
              Order Summary
            </h2>
            {order.map((order: any, index: number) => (
              <div key={index}>
                {order.cartItems.map((item: cartItem) => (
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt=""
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <h3 className="ml-4 text-gray-800 dark:text-gray-300 font-medium">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-800 dark:text-gray-200 flex items-center">
                          <IndianRupee />
                          <span className="text-lg font-medium">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Link to="/Cart">
            <Button className="bg-orange-500 hover:bg-orange-400 w-full rounded-xl">
              Continue to shoping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
