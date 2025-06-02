
import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useRestaurent from "./useRestaurent";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1"
    : "https://res-app-5.onrender.com/api/v1";
    const API_END_POINT = `${API_BASE_URL}/menu`;
    axios.defaults.withCredentials = true;


type Menustate={
    menu:null;
    createMenu:(formData:FormData)=>Promise<void>;
    editMenu:(menuId:string,formData:FormData)=>Promise<void>;
}

export const useMenuStore= create<Menustate>()(persist((set)=>({
   menu:null,
   createMenu :async(formData:FormData)=>{
    try {
        const response=await axios.post(`${API_END_POINT}/`,formData,{
            headers:{
                 'Content-Type': 'multipart/form-data'
            }

        });
        if (response.data.success) {
            toast.success(response.data.message);
            set({menu:response.data.menu});
        }
      //update restaurent 

      useRestaurent.getState().addMenutoRestaurant(response.data.message);
    

    } catch (error:any) {
        toast.error(error.response.data.message);

    }

   },
   editMenu:async(menuId:string,formData:FormData)=>{
   try {
    const response=await axios.put(`${API_END_POINT}/${menuId}`,formData,{
        headers:{
            'Content-type':"multipart/form-data"
        }
        
    })
    if (response.data.success) {
       toast.success(response.data.message);
       set({menu:response.data.menu}) 
    }


   /// update menu restaurent


    useRestaurent.getState().updateMenuToRestaurant(response.data.message);
  

   } catch (error:any) {
    toast.error(error.response.data.message);
   }

   },


}),{
    name:"menu-name",
    storage:createJSONStorage(()=>localStorage)
}))