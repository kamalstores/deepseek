import mongoose from "mongoose";

// create a schema

const ChatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true 
        },
        messages: [
            {
                // role of the message sender (user or assistant)
                role: {type: String, required: true}, 
                 // content of the message
                content: {type: String, required: true},
                // timestamp of the message
                timestamp: {type: Number, required: true},
            }
        ],

        // userId to associate the chat with a user
        userId: {
            type: String,
            // userId is required to associate the chat with a user
            required: true 
        },
    },
    
    {
            timestamps: true // this will add createdAt and updatedAt fields
    }
)

// create a chat model
const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);


export default Chat;
