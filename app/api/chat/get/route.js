import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req){

    try {

        // Get the user from Clerk
        const { userId } = getAuth(req);

        // if userId is not present, return an error response
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }

        // connect to the database and fetch chats for the user
        await connectDB();
        const data = await Chat.find({ userId });

        // return a success response with the chats
        return NextResponse.json({ success: true, data });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }

}