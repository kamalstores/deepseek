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

        // if user is available
        const {chatId, name} = await request.json();

        // connect to the database and update the chat name
        await connectDB();
        await Chat.findOneAndUpdate(
            { _id: chatId, userId },
            { name },
        );
        

        // return a success response with the created chat
        return NextResponse.json({ success: true, message: "Chat renamed" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}