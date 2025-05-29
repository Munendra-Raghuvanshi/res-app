import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "https://res-app-5.onrender.com/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  countary: string;
  profilePicture: string;
  admin: boolean;
  isVerified?: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>; 
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserstore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed. Please try again.");
          set({ loading: false, isCheckingAuth: false });
        }
      },

      // Login API implementation
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed. Please try again.");
          set({ loading: false, isCheckingAuth: false });
        }
      },

      // Verify Email API implementation
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Email verification failed.");
          set({ loading: false });
        }
      },

      // Check Authentication API implementation
      checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`, { withCredentials: true });
    
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error: any) {
            console.error("Auth Check Failed:", error.response?.data?.message || error.message);
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },

      // Logout API implementation
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ loading: false });
        }
      },

      // Forgot Password API implementation
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          set({ loading: false });
        }
      },

      // Reset Password API implementation
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Password reset failed.");
          set({ loading: false });
        }
      },

      // Update Profile API implementation
      updateProfile: async (input: any) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user, isAuthenticated: true });
          }
        } catch (error) {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
