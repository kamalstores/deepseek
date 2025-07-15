export const maxDuration = 60;
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";        
import { getAuth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req){
    try {
        // Get the user from Clerk
        const { userId } = getAuth(req);

        // extract chatId from the request body
        const {chatId, prompt} = await req.json();

        // if userId is not present, return an error response
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }


        // connect to the database
        await connectDB();

        // fetch the chat from the database by chatId and userId
        let data = await Chat.findOne({userId, _id: chatId});

        // if chat doesn't exist, create a new one
        if (!data) {
            data = new Chat({
                _id: chatId,
                userId,
                messages: [],
                name: "New Chat"
            });
        }

        // create a new message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };


        // add the user prompt to the chat messages
        data.messages.push(userPrompt);

        // call the Gemini API to get a response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponse = response.text();

        // create AI message object
        const message = {
            role: "assistant",
            content: aiResponse,
            timestamp: Date.now()
        };

        // push the AI response to the chat messages
        data.messages.push(message);
        // save the updated chat to the database
        data.save();

        // return a success response with the chats
        return NextResponse.json({ success: true, data: message });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

