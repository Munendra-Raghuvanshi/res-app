import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import hero_pizza from "@/assets/hero_pizza.png"
import { useNavigate } from "react-router-dom";

const HereSection = () => {
  const [searchText, Setserchtext] = useState<string>("");
  const navigate =useNavigate();

  return (
    <div className="flex flex-col md:flex-row  max-auto max-w-7xl  md:p-10 rounded-lg items-center justify-center m-4  gap-20 ">
      <div className=" flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl ">
            order Food anytime & anywhere
          </h1>
          <p className="text-gray-400 font-bold">
            Hey! Our Delicious Food is waiting for you, we are always near to
            you{" "}
          </p>
        </div>
        <div className="relative flex items-center gap-2 w-full">
          <Input
            className="rounded-lg left-2 pl-10 "
            type="text"
            placeholder="Search Dishes"
            value={searchText}
            onChange={(e) => Setserchtext(e.target.value)}
          />
          <Search className="text-gray-500 inset-y-2 left-2  absolute" />
          <Button onClick={()=>navigate(`/search/${searchText}`)} className="text-white  bg-orange-500 rounded-xl hover:bg-orange-400">
            Search
          </Button>
        </div>
      </div>
      <div>
        <img src={hero_pizza} alt="" 
        className="object-cover w-full max-h-[500px]  "
        />
      </div>
    </div>
  );
};
export default HereSection;
