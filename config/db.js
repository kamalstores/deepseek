import mongoose from 'mongoose';

let cached = global.mongoose || {conn: null, promise: null};

// create mongodb connection function

export async function connectDB(){
    if(cached.conn) {
        return cached.conn;
    }
    if(!cached.promise) {
        cached.promise = (await mongoose.connect(process.env.MONGODB_URI)).then ((mongoose) => mongoose);
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);   
    }
    return cached.conn
}