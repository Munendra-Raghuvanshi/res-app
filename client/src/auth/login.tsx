import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom";
import {  LockKeyhole, Mail,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";

import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserstore } from "@/store/useUserstore";




const Login = () => { 
  const navigate= useNavigate();
  const [error, seterror] = useState<Partial<LoginInputState>>({});
const {login}=useUserstore();

  const [input,setInput]=useState<LoginInputState>({
    email:"",
    password:"",
  });
const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    setInput({...input, [name]:value});

   
}
const loginSubmitHandler=async(e:FormEvent)=> {
  e.preventDefault();
  const result= userLoginSchema.safeParse(input);
  if(!result.success){
    const fielderror=result.error.formErrors.fieldErrors;
    seterror(fielderror as Partial<LoginInputState>)
    return
  }

  try {
    await login(input);
    navigate("/")
  } catch (error) {
    console.log(error)
  }
  
}
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={ loginSubmitHandler} className="md:p-10 w-full max-w-md rounded-lg md:border border-gray-300" >
       <div className="font-bold text-xl font-sans text-center justify-center items-center m-4" >Ms resturent</div>
        <div className="m-4 relative">
        <Input className="pl-8 text-gray-500"
         value={input.email}
         onChange={changeEventHandler}
         name="email"
         type="email"
         placeholder="Email"

         />
         <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
         {
          error && <span className="text-sm text-red-500">{error.email}</span>
         }
        </div>
        <div className="m-4 relative">
        <Input className="pl-8 text-gray-500"
         type="password"
         value={input.password}
         onChange={changeEventHandler} 
         name="password"
         placeholder="password"
              
         />
        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
        {
          error && <span className="text-sm text-red-500">{error.password}</span>
         }
        </div>
       <div className="items-center justify-center m-4">
        <Button type="submit" className="bg-blue-700 w-full  hover:bg-blue-500 border rounded-lg ">Login</Button>
       </div>
       <Separator/>
       <p className="text-center cursor-pointer">
       Do Not have an account???{''}
      <Link className="text-blue-500" to="/SignUp">SignUp</Link>
        </p>
      </form>

    </div>
  )
}

export default Login