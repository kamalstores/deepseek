import mongoose from "mongoose";

// create a schema

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true // id is required to store data
        },
        name: {
            type: String,
            required: true 
        },
        email: {
            type: String,
            required: true  
        },
        image: {
            type: String,
            required: false  
        }
        
    },
    
    {
            timestamps: true // this will add createdAt and updatedAt fields
    }
)

// create a user model
// this will create a collection named users in the database
// if the collection already exists, it will use the existing collection
// mongoose.models.User is used to check if the model already exists, if it does, it
const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;