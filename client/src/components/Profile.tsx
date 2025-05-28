import {   LocateIcon, Mail, MapPin, PhoneIcon, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Label } from "@radix-ui/react-menubar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserstore } from "@/store/useUserstore";

const Profile = () => {
  const {user,updateProfile}=useUserstore();
  const [profile, setprofile] = useState({
    fullname:user?.fullname || "",
    email: user?.email|| "",
    contact:user?.contact || "",
    address:user?.address || "",
    city:user?.city|| "",
    profilePicture:user?.profilePicture|| "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [profilePicture,   setProfilePicture] = useState<string>(profile.profilePicture || "");

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const Reader = new FileReader();
      Reader.onload = () => {
        const result = Reader.result as string;
        setProfilePicture(result);
        setprofile((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      Reader.readAsDataURL(file);
    }
  };
  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setprofile({ ...profile, [name]: value });
  };
  const updateprofileHandelar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(profile);

    
  };

  return (
    <form onSubmit={updateprofileHandelar} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex  items-center gap-2">
          <Avatar className="relative items-center justify-center cursor-pointer  ">
            <AvatarImage src={profilePicture} />

            <AvatarFallback>CN</AvatarFallback>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-start justify-center opacity-0 hover:opacity-100 transparent-opacity duration-300 bg-black bg-opacity-50 rouneded-full "
            >
              <Plus className="text-white w-8 h-8   " />
            </div>
          </Avatar>
          <input
            type="text"
            name="fullname"
            onChange={ChangeHandler}
            className="font-bold font-sanss text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 w-full bg-gray-200 rounded-sm">
        <div className="flex items-center gap-4 rounded-sm p-2 ">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <Input
            disabled
              type="email"
              name="email"
              value={profile.email}
              onChange={ChangeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent   outline-none border-none bg-gray-200"
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 w-full bg-gray-200 rounded-sm">
        <div className="flex items-center gap-4 rounded-sm p-2 ">
          <PhoneIcon className="text-gray-500" />
          <div className="w-full">
            <Label>phone</Label>
            <Input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={ChangeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent   outline-none border-none bg-gray-200"
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 w-full bg-gray-200 rounded-sm">
        <div className="flex items-center gap-4 rounded-sm p-2 ">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>address</Label>
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={ChangeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent   outline-none border-none bg-gray-200"
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 w-full bg-gray-200 rounded-sm">
        <div className="flex items-center gap-4 rounded-sm p-2 ">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={profile.city}
              onChange={ChangeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent   outline-none border-none bg-gray-200 "
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <Button type="submit" className="bg-orange-500 w-20 h-12 rounded-xl">Update</Button>
      </div>
    </form>
  );
};
export default Profile;
