import { Link } from "react-router-dom";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import {
  HandPlatter,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

import { Separator } from "@radix-ui/react-separator";
import { useUserstore } from "@/store/useUserstore";
import { useCartStore } from "@/store/userCartstore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, logout } = useUserstore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center  justify-between h-14">
        <Link to="/">
          <p className="font-bold  md:font-extrabold text-xl ">Rs restaurent</p>
        </Link>
        <div className="hidden md:flex item-center gap-10">
          <div className="hidden md:flex items-center gap-6 ">
            <Link className="font-bold font-sans" to="/">
              Home
            </Link>
            <Link className="font-bold font-sans" to="/Profile">
              Profile
            </Link>
            <Link className="font-bold font-sans" to="/Order/status">
              Order
            </Link>

            {user?.admin && (
              <Menubar className="boder border-gray-400">
                <MenubarMenu>
                  <MenubarTrigger className="font-bold">
                    DashBoard
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurent">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/Addmenu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/Order">
                      <MenubarItem>Order</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex  items-center gap-10 ">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="cursor-pointer" align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              to="/Cart"
              className="relative cursor-pointer hover:border-black"
            >
              <ShoppingCart />
              {cart.length > 0 && (
                <button className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-orange-500 hover:bg-orange-300">
                  {cart.length}
                </button>
              )}
            </Link>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button
              onClick={logout}
              className="bg-orange-500 hover:bg-orange-400 rounded-xl"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};
export default Navbar;

const MobileNavbar = () => {
  const { user, logout } = useUserstore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className=" bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>Munendra Eats </SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/Order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/Cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
          >
            <ShoppingCart />

            
            <span> {cart.length > 0 && (
                <button className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-orange-500 hover:bg-orange-300">
                  {cart.length}
                </button>
              )}</span>
          </Link>

          {user?.admin && (
            <>
              <Link
                to="/admin/Addmenu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurent"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
              >
                <UtensilsCrossed />
                <span>Restaurent</span>
              </Link>
              <Link
                to="/admin/Order"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 cursor-pointer"
              >
                <PackageCheck />
                <span>Restaurent Order</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="bg-gray-300 rounded-full p-1">
                CN
              </AvatarFallback>
            </Avatar>
            <h1 className="font-bold "> Munendra Mernstack </h1>
          </div>
          <SheetClose asChild>
            <Button
              onClick={logout}
              className="bg-orange-500 hover:bg-orange-400 my-2 rounded-2xl"
              type="submit"
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
