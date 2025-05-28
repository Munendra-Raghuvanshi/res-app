import { CartState } from "@/types/cartType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MenuItem } from "./useRestaurent";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find(cartItem => cartItem._id === item._id);

          if (existingItem) {
            return {
              cart: state.cart.map(cartItem =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      removeFromThecart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter(item => item._id !== id),
        }));
      },

      increamentQuality: (id: string) => {
        set((state) => ({
          cart: state.cart.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrementQuality: (id: string) => {
        set((state) => ({
          cart: state.cart
            .map(item =>
              item._id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
