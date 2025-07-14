export const maxDuration = 60;
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";        
import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";


// Initialize OpenAI client with OpenRouter API and base URL
const client = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
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
            return NextResponse.json({ success: false, message: "User not authenticated" });
        }


        // connect to the database
        await connectDB();

        // fetch the chat from the database by chatId and userId
        const data = await Chat.findOne({userId, _id: chatId});

        // Check if chat exists
        if (!data) {
            return NextResponse.json({ success: false, message: "Chat not found" });
        }

        console.log("Chat found:", data._id);
        console.log("Messages before:", data.messages.length);

        // create a new message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };


        // add the user prompt to the chat messages
        data.messages.push(userPrompt);
        console.log("User prompt added");

        // call the DeepSeek API through OpenRouter
        // call the DeepSeek API to get a response
        // const completion = await client.chat.completions.create({

        const completion = await client.chat.completions.create({
            extra_headers: {
                "HTTP-Referer": "http://localhost:3001", // Your site URL
                "X-Title": "DeepSeek Chat App", // Your site title
            },
            extra_body: {},
            model: "deepseek/deepseek-r1-0528",
            messages: [{ role: "user", content: prompt }],
            store: true,

            // // model: "deepseek-chat",
            // model: "deepseek/deepseek-r1-0528",
            // store: true,

        });

        console.log("API response received");

        // add the AI response to the chat messages
        const message = completion.choices[0].message;

        // add timestamp to the AI response
        message.timestamp = Date.now();

        // push the AI response to the chat messages
        data.messages.push(message);
        console.log("AI response added");
        console.log("Messages after:", data.messages.length);

        // save the updated chat to the database

        //  data.save();
        await data.save();
        console.log("Chat saved to database");

        // return a success response with the chats
        return NextResponse.json({ success: true, data: message });

    } catch (error) {
        console.error("Error in AI route:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

