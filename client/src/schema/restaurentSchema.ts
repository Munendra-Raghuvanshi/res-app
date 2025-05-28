import {z} from "zod"

export const restaurentFormSchema =z.object({
  Name:z.string().nonempty({message:"Name is Required"}),
  City:z.string().nonempty({message:"city is required"}),
  Countary:z.string().nonempty({message:"Countary Name is required"}),
  time:z.number().min(0,{message:"Delivery Time can not be negative"}),
  Cuisines:z.array(z.string()),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image file is required" }),
})
export type RestaurentFormSchema = z.infer<typeof restaurentFormSchema>