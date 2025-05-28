import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "@/components/AvailableMenu";
import useRestaurent from "@/store/useRestaurent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Restaurentdetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurent();
  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);
  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <div className="w-full  justify-center">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl}
            alt=""
            className="object-cover  w-full h-full rounded-lg shadow-lg "
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl ">
              {singleRestaurant?.restaurantName}
            </h1>
            <div className="flex gap-2 my-2 ">
              {singleRestaurant?.cuisines.map(
                (cusions: String, idx: number) => (
                  <Badge
                    key={idx}
                    className="bg-orange-500 hover:bg-orange-400 cursor-pointer text-lg font-sans"
                  >
                    {cusions}
                  </Badge>
                )
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className=" flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  {" "}
                  Delivery Time:
                  <span className="text-sm font-medium">
                    {singleRestaurant?.deliveryTime}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu menus={singleRestaurant?.menus || []} />
      </div>
    </div>
  );
};

export default Restaurentdetail;
