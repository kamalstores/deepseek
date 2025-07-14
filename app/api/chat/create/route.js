import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        // Get the user from Clerk
        const { userId } = getAuth(request);

        // if userId is not present, return an error response
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }

        // prepare the chat data to be saved in the database
        const chatData = {
            userId,
            messages: [],
            name: "New Chat"
        }

        // connect to the database and create a new chat
        await connectDB();
        await Chat.create(chatData);

        // return a success response with the created chat
        return NextResponse.json({ success: true, message: "Chat created" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}