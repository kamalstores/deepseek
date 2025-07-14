import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        // Get the user from Clerk
        const { userId } = getAuth(request);
        const { chatId } = await request.json();

        // if userId is not present, return an error response
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }


        // connect to the database and delete chat
        await connectDB();
        await Chat.deleteOne({_id: chatId, userId});

        // return a success response with the created chat
        return NextResponse.json({ success: true, message: "Chat deleted" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}