import { Input } from "@/components/ui/input"
import {   Mail,  } from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useState } from "react";

const Forgotpassword = () => {

     const [email, setemail]=useState("");

  return (
    <div className="w-full flex min-h-screen justify-center items-center bg-black  ">
        <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-2xl" >
         <div className=" font-bold text-xl font-sans text-center  text-white">
          Forgot Password
         </div>
         <div className="text-center text-gray-400 ">
            Enter your email addresh for Reset your Password
         </div>
         <div className="relative">
            <Input className="text-gray-300 rounded-lg w-full pl-8"
            
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}

            placeholder="Enter the Email "
            />
             <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
         </div>
         <div>
            
         </div>
         <Button className="w-full rounded-2xl bg-orange-500 hover:bg-300">Send Link</Button>
         <div className="text-center">
            <p className="text-center text-gray-300"> Return to 
            <Link className="text-blue-500 " to="/Login"> Login</Link>
            </p>
         </div>
        </form>
    </div>
  )
}
export default Forgotpassword;