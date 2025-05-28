import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RestaurentFormSchema,
  restaurentFormSchema,
} from "@/schema/restaurentSchema";
import useRestaurent from "@/store/useRestaurent";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Restaurent = () => {
  const [error, setError] = useState<Partial<RestaurentFormSchema>>({});
  const { restaurant, updateRestaurant, createRestaurant,getRestaurant } =
    useRestaurent();
  const haveRestaurent = false;
  const [input, setinput] = useState<
    Omit<RestaurentFormSchema, "image"> & { image?: File }
  >({
    Name: "",
    Cuisines: [],
    City: "",
    Countary: "",
    time: 0,
    image: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setinput({ ...input, image: file });
    }
  };

  const Sumithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const result = restaurentFormSchema.safeParse(input);
    if (!result.success) {
      console.log("Validation Errors:", result.error.format());
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<RestaurentFormSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.Name);
      formData.append("city", input.City);
      formData.append("country", input.Countary);  
      formData.append("deliveryTime", input.time.toString());
      formData.append("cuisines", JSON.stringify(input.Cuisines));
      if (input.image) {
        formData.append("image", input.image);
      }
      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error: any) {
      console.error("Error submitting restaurant data:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message || "Server returned an error."
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred while creating the restaurant.");
      }
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        await getRestaurant(); 
        
  
        if (restaurant) {
          setinput({
            Name: restaurant.restaurantName || "",
            City: restaurant.city || "",
            Countary: restaurant.countary || "", 
            time: restaurant.deliveryTime || 0,
            Cuisines: restaurant.cuisines || [],
            image: undefined,
          });
        }
      } catch (err) {
        console.error("Failed to fetch restaurant:", err);
      }
    };
  
    fetchRestaurant();
  }, []);
  

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold  text-2xl">Add Restaurant </h1>
          <form onSubmit={Sumithandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2  md:space-y-0">
              <div>
                <Label className="font-bold ">Restaurent Name</Label>
                <Input
                  className="rounded-xl"
                  type="text"
                  placeholder="Enter the Restaurent Name"
                  name="Name"
                  onChange={changeEventHandler}
                  value={input.Name}
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.Name}
                  </span>
                )}
              </div>
              <div>
                <Label className="font-bold ">Cuisines</Label>
                <Input
                  className="rounded-xl"
                  type="text"
                  placeholder="e.g Itelian, Chinese ,Indian"
                  name="Cuisines"
                  value={input.Cuisines}
                  onChange={(e) =>
                    setinput({ ...input, Cuisines: e.target.value.split(",") })
                  }
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.Cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label className="font-bold ">City</Label>
                <Input
                  className="rounded-xl"
                  type="text"
                  placeholder="Enter Your City"
                  name="City"
                  value={input.City}
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.City}
                  </span>
                )}
              </div>
              <div>
                <Label className="font-bold ">Countary</Label>
                <Input
                  className="rounded-xl"
                  type="text"
                  placeholder="Enter the Countary Name"
                  name="Countary"
                  value={input.Countary}
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.Countary}
                  </span>
                )}
              </div>
              <div>
                <Label className="font-bold ">Estimated Delivery</Label>
                <Input
                  className="rounded-xl"
                  type="number"
                  placeholder="0"
                  name="time"
                  value={input.time}
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.time}
                  </span>
                )}
              </div>
              <div>
                <Label className="font-bold ">Upload image</Label>
                <Input
                  className="rounded-xl"
                  type="file"
                  placeholder="Upload Your Image"
                  name="image"
                  onChange={handleFileChange}
                />
                {error && (
                  <span className="text-sm text-red-600 font-medium">
                    {error.image?.name}
                  </span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 cursor-pointer rounded-xl mt-3"
            >
              {haveRestaurent ? "Update Restaurant" : "Add Your Restaurant"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurent;
