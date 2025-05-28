import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom";
import {  Contact, LockKeyhole, Mail, User,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserstore } from "@/store/useUserstore";
 




const SignUp = () => { 
  const [error,setError]=useState<Partial<SignupInputState>>({});
  const {signup}=useUserstore();
  const navigate=useNavigate();
  const [input,setInput]=useState<SignupInputState>({
    email:"",
    password:"",
    FullName:"",
    contact:"",
  });
  
const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setInput({...input, [name]:value});

   
}
const loginSubmitHandler=async (e:FormEvent)=> {
  e.preventDefault();

 // form validation 
 const result =  userSignupSchema.safeParse(input);
 if(!result.success){
  const fieldError=result.error.formErrors.fieldErrors;
  setError(fieldError as Partial<SignupInputState>)
  return

 }
 
 ///api creation

   try {
    await signup(input);
    navigate("/verify-email")
   } catch (error) {
    console.log(error);
   }
}
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={ loginSubmitHandler} className="md:p-10 w-full max-w-md rounded-lg md:border border-gray-300" >
       <div className="font-bold text-xl font-sans text-center justify-center items-center m-4" >Ms resturent</div>
       <div className="m-4 relative">
        <Input className="pl-8 text-gray-500"
         value={input.FullName}
         onChange={changeEventHandler}
         name="FullName"
         type="text"
         placeholder="Full name"
         
         />
         <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
         {
          error&&<span className="text-sm text-red-500">{error.FullName}</span>
         }
        </div>
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
        <div className="m-4 relative">
        <Input className="pl-8 text-gray-500"
         type="tel"
         value={input.contact}
         onChange={changeEventHandler} 
         name="contact"
         placeholder="contact"
              
         />
        <Contact className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
        {
          error && <span className="text-sm text-red-500">{error.contact}</span>
         }
        </div>

       <div className="items-center justify-center m-4">
        <Button type="submit" className="bg-blue-700 w-full  hover:bg-blue-500 border rounded-lg ">SignUp</Button>
       </div>
       
       <p className="text-center cursor-pointer">
       Already have an account??{''}
      <Link className="text-blue-500" to="/Login"> Login</Link>
        </p>
      </form>

    </div>
  )
}

export default SignUp