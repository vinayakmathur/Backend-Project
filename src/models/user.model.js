import mongoose, { Schema } from "mongoose"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname:{
        type: String,
        required: true,
        index: true,
        trim: true
    },
    avatar:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
    },
    watchhistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password:{
        type: String,
        required: [true,"Password is required !!"]
    },
    refreshtoken:{
        type: String
    }

},{timestamps:true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    this.password = bcrypt.hash(this.password, 10)
    next()
})

UserSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}

export const User = mongoose.model("User",UserSchema)