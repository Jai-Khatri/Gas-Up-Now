import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        maxlength: [14, "Max 14 characters are allowed"],
        minlength: [3, "Minimum 3 characters are required"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [3, "Minimum 3 characters are required"],
        maxlength: 100,
    },
    role: {
        type: String,
        enum: ["Admin", "Member"], 
        default: "Member",
    },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order", 
        }
    ]
}, { timestamps: true, versionKey: false });

const User = mongoose.model("User", UserSchema);

export default User;
