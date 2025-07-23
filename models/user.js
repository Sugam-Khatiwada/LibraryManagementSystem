import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        description: "Full name of the user",
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        description: "Email address of the user",
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        description: "Password for user authentication",
        minlength:[8, "Password must be at least 8 characters long"],
        select: false,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["Borrower", "Librarian"],
        default: "Borrower",
        description: "Role of the user in the system",
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the user was created"
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the user was last updated"
    }

})

const User = mongoose.model("User", userSchema);
export default User;