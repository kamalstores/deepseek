"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();


// get all data from contest file
export const useAppContext = () => {
    
    return useContext(AppContext);
};

// create a provider component
export const AppContextProvider = ({ children }) => {
    const {user} = useUser()


    // used in sidebar
    const value = {
        user
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}