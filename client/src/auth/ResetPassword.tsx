import { Input } from "@/components/ui/input"
import {   LockKeyhole,  } from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useState } from "react";

const ResetPassword = () => {
    const [NewPassword, setNewPassword]= useState("");
  return (
    <div className="w-full flex min-h-screen justify-center items-center bg-black  ">
        <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-2xl" >
         <div className=" font-bold text-xl font-sans text-center  text-white">
          Reset Password
         </div>
         <div className="text-center text-gray-400 ">
            Enter your new Password
         </div>
         <div className="relative">
            <Input className="text-gray-300 rounded-lg w-full pl-8"
            type="password"
            value={NewPassword}
            onChange={(e)=> setNewPassword(e.target.value)}
            placeholder="Enter the New Password "
            />
             <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
         </div>
         
         <div>
            
         </div>
         <Button className="w-full rounded-2xl bg-orange-500 hover:bg-300">Reset Password</Button>
         <div className="text-center">
            <p className="text-center text-gray-300"> Return to 
            <Link className="text-blue-500 " to="/Login"> Login</Link>
            </p>
         </div>
        </form>
    </div>
  )
}
export default ResetPassword