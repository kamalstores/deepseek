import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// create post function
export async function POST(req) {
    try {
        // Validate environment variables
        if (!process.env.SIGNING_SECRET) {
            console.error("SIGNING_SECRET environment variable is not set");
            return NextResponse.json(
                { error: "Server configuration error" }, 
                { status: 500 }
            );
        }

        const wh = new Webhook(process.env.SIGNING_SECRET);
        const headerPayload = await headers();
        
        // Validate required headers
        const svixId = headerPayload.get("svix-id");
        const svixSignature = headerPayload.get("svix-signature");
        const svixTimestamp = headerPayload.get("svix-timestamp");
        
        if (!svixId || !svixSignature || !svixTimestamp) {
            console.error("Missing required svix headers");
            return NextResponse.json(
                { error: "Missing required headers" }, 
                { status: 400 }
            );
        }

        const svixHeaders = {
            "svix-id": svixId,
            "svix-signature": svixSignature,
            "svix-timestamp": svixTimestamp
        };

        // get the payload and verify it
        const payload = await req.json();
        const body = JSON.stringify(payload);
        
        let data, type;
        try {
            const verified = wh.verify(body, svixHeaders);
            data = verified.data;
            type = verified.type;
        } catch (error) {
            console.error("Webhook verification failed:", error);
            return NextResponse.json(
                { error: "Webhook verification failed" }, 
                { status: 400 }
            );
        }

        // Validate data exists
        if (!data || !data.id) {
            console.error("Invalid webhook data received");
            return NextResponse.json(
                { error: "Invalid webhook data" }, 
                { status: 400 }
            );
        }

        // Connect to database
        try {
            await connectDB();
        } catch (error) {
            console.error("Database connection failed:", error);
            return NextResponse.json(
                { error: "Database connection failed" }, 
                { status: 500 }
            );
        }

        // Handle different types of events from clerk webhooks
        switch (type) {
            case "user.created":
                try {
                    // Validate required fields for user creation
                    if (!data.email_addresses || !data.email_addresses[0]) {
                        console.error("Missing email address in user.created event");
                        return NextResponse.json(
                            { error: "Missing email address" }, 
                            { status: 400 }
                        );
                    }

                    const userData = {
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Unknown User",
                        image: data.image_url || "",
                    };

                    await User.create(userData);
                    console.log("User created successfully:", data.id);
                } catch (error) {
                    console.error("Error creating user:", error);
                    return NextResponse.json(
                        { error: "Failed to create user" }, 
                        { status: 500 }
                    );
                }
                break;

            case "user.updated":
                try {
                    const updateData = {
                        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Unknown User",
                        image: data.image_url || "",
                    };

                    // Only update email if it exists
                    if (data.email_addresses && data.email_addresses[0]) {
                        updateData.email = data.email_addresses[0].email_address;
                    }

                    await User.findByIdAndUpdate(data.id, updateData);
                    console.log("User updated successfully:", data.id);
                } catch (error) {
                    console.error("Error updating user:", error);
                    return NextResponse.json(
                        { error: "Failed to update user" }, 
                        { status: 500 }
                    );
                }
                break;

            case "user.deleted":
                try {
                    await User.findByIdAndDelete(data.id);
                    console.log("User deleted successfully:", data.id);
                } catch (error) {
                    console.error("Error deleting user:", error);
                    return NextResponse.json(
                        { error: "Failed to delete user" }, 
                        { status: 500 }
                    );
                }
                break;

            default:
                console.log("Unhandled event type:", type);
                break;
        }

        return NextResponse.json({ message: "Event processed successfully" }, { status: 200 });

    } catch (error) {
        console.error("Unexpected error in webhook handler:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}

// We will deploy this webhook to Clerk dashboard because Clerk will send events to this endpoint and we will handle them accordingly.
// This is how Clerk will send events to our application and we will handle them accordingly.
