"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();


// get all data from contest file
export const useAppContext = () => {
    
    return useContext(AppContext);
};

// create a provider component
export const AppContextProvider = ({ children }) => {
    const {user} = useUser()

    // it is used to get the token from Clerk
    const {getToken} = useAuth();

    const [chats, setChats] = useState([]); 
    const [selectedChat, setSelectedChat] = useState(null);

    // function to create a new chat
    const createNewChat = async () => {
        try {
            if(!user) {
                return null;
            }

            // get the token from Clerk
            const token = await getToken();

            // use axios to make a POST request to create a new chat
            await axios.post('/api/chat/create', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchUserChats();

        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to fetch user chats
    const fetchUserChats = async () => {
        try {
            // get the token from Clerk
            const token = await getToken();

            // use axios to make a GET request to fetch user chats
            const {data} = await axios.get('/api/chat/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // check data response & if success then set chats
            if(data.success){
                console.log(data.data);
                setChats(data.data);

                // is user has no chats then set selected chat to null
                if(data.data.length === 0) {
                    await createNewChat();
                    return fetchUserChats();
                }
                else{
                    // sort chats by updatedAt
                    data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                    // set recently updated chat as selected chat
                    setSelectedChat(data.data[0]);

                    console.log(data.data[0]);
                }
            }
            else {
                toast.error(data.message);
            }
            

        } catch (error) {
            toast.error(error.message)
        }
    }


useEffect(() => {
        // fetch user chats when user is available
        if(user) {
            fetchUserChats();
        }
        
}, [user]);



    // used in sidebar
    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchUserChats,
        createNewChat
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}