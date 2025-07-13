import mongoose from 'mongoose';

let cached = global.mongoose || {conn: null, promise: null};

// create mongodb connection function

export default async function connectDB(){
    if(cached.conn) {
        return cached.conn;
    }
    
    if(!cached.promise) {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set");
        }
        cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose);
    }
    
    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = null; // Reset promise on error
        throw error; // Re-throw the error so it can be handled by the caller
    }
    
    return cached.conn;
}