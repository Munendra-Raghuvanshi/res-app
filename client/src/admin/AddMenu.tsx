import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditMenu from "./EditMenu";

import { MenuFormScheme, menuSchema } from "@/schema/MenuSchama";
import { useMenuStore } from "@/store/useMenuStore";
import useRestaurent from "@/store/useRestaurent";



const AddMenu = () => {
  const [editopen, seteditopen] = useState<boolean>(false);
  const [open, setopen] = useState<boolean>(false);
  const [error, setError] = useState<Partial<MenuFormScheme>>({});
  const [selectedmenu, setSelectedMenu] = useState<any>();
  const { createMenu } = useMenuStore();
  
  const { restaurant } = useRestaurent();
  
  
  const [input, setinput] = useState<MenuFormScheme>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fielderror = result.error.formErrors.fieldErrors;
      setError(fielderror as Partial<MenuFormScheme>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }

    ///api work here
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menu
        </h1>

        <Dialog open={open} onOpenChange={setopen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-400 rounded-2xl">
              <Plus />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center font-serif">
                Add new a Menu
              </DialogTitle>
              <DialogDescription className="text-center font-serif">
                {" "}
                Create a menu that will your restaurent Stand out{" "}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="font-serif" action="">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter the name of the Dish"
                />
                {error && (
                  <span className="font-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
                ;
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu Description"
                />
                {error && (
                  <span className="font-xs font-medium text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter the price"
                />
                {error && (
                  <span className="font-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Menu image</Label>
                <Input
                  type="file"
                  name="Image"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  placeholder="Upload the image"
                />
                {error && (
                  <span className="font-xs font-medium text-red-600">
                    {error.image?.name}
                  </span>
                )}
              </div>

              <DialogFooter className="mt-5">
                <Button className="bg-orange-500 hover:bg-500 w-full rounded-2xl">
                  Summit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {restaurant?.menus?.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md ">
            <img
              className=" md:h-24  md:w-24  h-16 w-full object-cover rounded-lg"
              src={menu.image||" https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"}
              alt="menu.name"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="font-serif font-semibold">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span>{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                seteditopen(true);
              }}
              className="bg-orange-500 hover:bg-orange-500 md:w-24 w-full mt-2   rounded-2xl"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedmenu={selectedmenu}
        editopen={editopen}
        seteditopen={seteditopen}
      />
    </div>
  );
};
export default AddMenu;
