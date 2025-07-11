import { Webhook } from "svix";
import { connectDB } from "@/config/db";
import User from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


// create post function
export async function POST(req) {
    const wh = new Webhook(process.env.SIGNING_SECRET) // add a secret key
    const headerPayload = await headers()
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-signature": headerPayload.get("svix-signature"),
        "svix-timestamp": headerPayload.get("svix-timestamp")
    }

    // get the patLoad and verify it

    const payload = await req.json()
    const body = JSON.stringify(payload)
    const {data, type} = wh.verify(body, svixHeaders)

    // prepare the user data to be saved in the database

    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
    };

    // using user data we will store the user in the database

    await connectDB();

    // we will get different types of events from clerk webhooks

    switch (type) {
        case "user.created":
            await User.create(userData);
            break;
        case "user.updated":
            await User.findByIdAndUpdate(data.id, userData)
            break;
        case "user.deleted":
            await User.findByIdAndDelete(data.id);
            break;
        default:
            break;
    }

    return NextResponse.json({message: "Event received"})

}

// We will deploy this webhook to Clerk dashboard because Clerk will send events to this endpoint and we will handle them accordingly.
// This is how Clerk will send events to our application and we will handle them accordingly.
