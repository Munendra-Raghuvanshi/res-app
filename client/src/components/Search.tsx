import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import useRestaurent, { Restaurant } from "@/store/useRestaurent";

const Search = () => {
  const params = useParams();
  const [searchQuery, setsearchQuery] = useState<string>("");
  const { searchedRestaurant, searchRestaurant, appliedFilter } =
    useRestaurent();
  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
  }, [params.text!, appliedFilter]);

  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <div className="flex flex-col md:flex-row justify-between  gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              className="rounded-2xl"
              value={searchQuery}
              type="text"
              onChange={(e) => setsearchQuery(e.target.value)}
              placeholder="Search Restaurent by Name "
            />
            <Button className="bg-orange-500 hover:bg-orange-400 rounded-xl">
              {" "}
              Search{" "}
            </Button>
          </div>
          <div className=" flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h1>({searchedRestaurant?.data.length})Search Result</h1>
            <div>
              {["Briyani", "moms", "jalebi"].map(
                (selectFilter: String, idex: number) => (
                  <div
                    key={idex}
                    className=" relative inline-flex items-center max-w-full "
                  >
                    <Badge className="bg-orange-500  hover:bg-orange-400 cursor-pointer pr-5">
                      {selectFilter}
                    </Badge>
                    <X
                      size={16}
                      className=" absolute right-1 cursor-pointer items-center "
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {
            searchedRestaurant?.data.map((restaurant: Restaurant) => (
              <Card key={restaurant._id} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <AspectRatio ratio={16 / 6}>
                    <img
                      className="w-full h-full object-cover"
                      src={restaurant.imageUrl}
                      alt=""
                    />
                  </AspectRatio>
                  <div className="absolute top-2 left-2 bg-white dark:bg-gray-700  bg-opacity-75 rounded-2xl p-1 px-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Feature
                    </span>
                  </div>
                </div>
                <CardContent>
                  <h1 className="text-2xl font-bold  text-gray-900 dark:text-gray-300 ">
                    {restaurant.restaurantName}
                  </h1>
                  <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-300">
                    <MapPin size={16} />
                    <p className="text-sm  ">city: </p>
                    <span className="font-medium">{restaurant.city}</span>
                  </div>
                  <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-300">
                    <MapPin size={16} />
                    <p className="text-sm  ">
                      countary: <span className="font-medium">{restaurant.countary}</span>
                    </p>
                  </div>
                  <div className="gap-1 flex mt-4 flex-wrap">
                    {restaurant.cuisines.map(
                      (cusions: string, idx: number) => (
                        <Badge
                          key={idx}
                          className="bg-gray-700 text-white hover:bg-gray-600 cursor-pointer "
                        >
                          {cusions}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter className="justify-center items-center p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex  ">
                  <Link to={`/restaurant/${restaurant._id}`}>
                    <Button className="bg-orange-500 rounded-2xl hover:bg-orange-400">
                      View Menu
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};



export default Search;
