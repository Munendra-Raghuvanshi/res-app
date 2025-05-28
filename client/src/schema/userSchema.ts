import {z} from "zod"

export const  userSignupSchema=z.object({
    FullName:z.string().min(4, "fullName is required"),
    email:z.string().email("invailed email addresh "),
    password:z.string().min(6, "password must have 6 character"),
    contact:z.string().min(10,"enter the valid contact")
})
export type SignupInputState=z.infer<typeof userSignupSchema >

export const  userLoginSchema=z.object({
    
    email:z.string().email("invailed email addresh "),
    password:z.string().min(6, "password must have 6 character"),
    
})
export type LoginInputState=z.infer<typeof userLoginSchema >