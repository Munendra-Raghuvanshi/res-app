import { checkoutSessionRequest, orderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT= "http://localhost:8000/api/v1/Order";
axios.defaults.withCredentials = true;


export const useOrderStore = create<orderState>()(
  persist(
    (set) => ({
      order: [],
      createcheckoutSession: async (
        checkoutSession: checkoutSessionRequest
      ) => {
        try {
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                    'Content-Type': 'application/json'
                }
            }
          );
          window.location.href = response.data.session.url;
        } catch (error) {
          console.error("Failed to create checkout session:", error);
        }
      },
      getOrderDetails: async () => {

        try {
          const response =await axios.get(`${API_END_POINT}/`)
          set({order:response.data.orders})
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
