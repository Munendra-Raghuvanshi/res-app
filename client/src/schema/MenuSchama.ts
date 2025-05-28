
import {z} from "zod";

export const menuSchema=z.object({
    name:z.string().nonempty({message:"Name is required"}),
    description:z.string().nonempty({message:"description is required"}),
    price:z.number().min(0,{message:"Price is required"}),
    image:z.instanceof(File).optional().refine((File)=>File?.size !=0,{message:"Image File is required"} ),

})

export type MenuFormScheme=z.infer<typeof menuSchema>;