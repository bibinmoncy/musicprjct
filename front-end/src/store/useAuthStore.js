import { create } from 'zustand';
import { axiosIntance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true, 

    checkAuth: async () => {
        set({ isCheckingAuth: true }); // Set isCheckingAuth to true before starting the request
        try {
            const res = await axiosIntance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });  // Update authUser and set isCheckingAuth to false
        } catch (error) {
            console.error("Error in checkAuth:", error.response || error.message); // More detailed error logging
            set({ authUser: null, isCheckingAuth: false });  // Reset authUser and isCheckingAuth
        }
    },

    signup: async(data)=>{
        set({isSigningUp : true});
        try{
            const res = await axiosIntance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    logout: async()=>{
        try{
            await axiosIntance.get("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }
    },

    login: async(data)=>{
        set({isLoggingIn: true});
        try{
            const res = await axiosIntance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged In");

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn: false});
        }
    }

  
}));
