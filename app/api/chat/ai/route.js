import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";        
import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";
export const maxDuration = 60;


// Initialize OpenAI client with DeepSeek API and base URL
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req){
    try {
        // Get the user from Clerk
        const { userId } = getAuth(req);

        // extract chatId from the request body
        const {chatId, prompt} = await req.json();

        // if userId is not present, return an error response
        if (!userId) {
            return NextResponse.json({ success: false, error: "User not authenticated" });
        }


        // connect to the database
        await connectDB();

        // fetch the chat from the database by chatId and userId
        const data = await Chat.findOne({ _id: chatId, userId });

        // create a new message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };


        // add the user prompt to the chat messages
        data.messages.push(userPrompt);

        // call the DeepSeek API to get a response
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true
        });

        // add the AI response to the chat messages
        const message = completion.choices[0].message;

        // add timestamp to the AI response
        message.timestamp = Date.now();

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

