import axios from "axios";

import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  countary: string;
  deliveryTime: number;
  cuisines: string[];
  menus: MenuItem[];
  imageUrl: string;
};
type searchedRestaurant = {
  data: Restaurant[];
};

export type Restaurantstate = {
  Loading: boolean;
  restaurant: Restaurant | null;
  searchedRestaurant: searchedRestaurant | null;
  appliedFilter: string[];
  singleRestaurant: Restaurant | null;
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (FormData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisions: any
  ) => Promise<void>;
  addMenutoRestaurant: (menu: any) => void;
  updateMenuToRestaurant: (updatedMenu: any) => void;
  setAppliedFilter: (value: string) => void;
  getSingleRestaurant: (restaurantId: string) => Promise<void>;
};

export const useRestaurent = create<Restaurantstate>()(
  persist(
    (set) => ({
      Loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      createRestaurant: async (formData: FormData) => {
        try {
          set({ Loading: true });
          const response = await axios.post(`${API_END_POINT}`, formData, {
            headers: {
              "content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.message(response.data.message);
            set({ Loading: false });
          }
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";
          toast.error(message);
        }
      },
      getRestaurant: async () => {
        try {
          set({ Loading: true });
          const response = await axios.get(`${API_END_POINT}/`);

          if (response.data.success) {
            set({ Loading: false, restaurant: response.data.restaurant });
            return response.data;
          }
        } catch (error: any) {
          if (error.response?.status === 404) {
            set({ restaurant: null });
          }
          set({ Loading: false });
          return null;
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ Loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ Loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.success);
          set({ Loading: false });
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisions: any
      ) => {
        try {
          set({ Loading: true });
          const params = new URLSearchParams();
          params.set("searchQueary", searchQuery);
          params.set("selectedCuisines", selectedCuisions.join(","));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ Loading: false, searchedRestaurant: response.data });
          }
        } catch (error) {
          set({ Loading: false });
        }
      },
      addMenutoRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updateMenuList = state.restaurant.menus.map((menus: any) =>
              menus._id == updatedMenu._id ? updatedMenu : menus
            );

            return {
              restaurant: {
                ...state.restaurant,
                menus: updateMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updateFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item != value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updateFilter };
        });
      },
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {}
      },
    }),

    {
      name: "Restaurent-name",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        Loading: state.Loading,
        restaurant: state.restaurant,
        searchedRestaurant: state.searchedRestaurant,
        appliedFilter: state.appliedFilter,
      }),
    }
  )
);
export default useRestaurent;
