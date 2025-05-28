import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormScheme, menuSchema } from "@/schema/MenuSchama";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/store/useRestaurent";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedmenu,
  editopen,
  seteditopen,
}: {
  selectedmenu: MenuItem;
  editopen: boolean;
  seteditopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setinput] = useState<MenuFormScheme>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const { editMenu } = useMenuStore();

  const [error, setError] = useState<Partial<MenuFormScheme>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormScheme>);
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
      await editMenu(selectedmenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setinput({
      name: selectedmenu?.name || "",
      description: selectedmenu?.description || "",
      price: selectedmenu?.price || 0,
      image: undefined,
    });
  }, [selectedmenu]);

  return (
    <Dialog open={editopen} onOpenChange={seteditopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-serif font-bold">
            Edit Menu
          </DialogTitle>
          <DialogDescription className="text-center">
            Update Your Menu to keep your Offering Fresh and exciting!
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
            {error.name && (
              <span className="text-sm text-red-600">{error.name}</span>
            )}
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
            {error.description && (
              <span className="text-sm text-red-600">{error.description}</span>
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
            {error.price && (
              <span className="text-sm text-red-600">{error.price}</span>
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
            {error.image && (
              <span className="text-sm text-red-600">
                {(error.image as any)?.name}
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
  );
};
export default EditMenu;
