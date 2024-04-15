/*
how to write user controller
username , fullname , email , profilepic , password , refresh
*/
import mongoose from "mongoose";
import  { Schema } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    profilePic: {
        type: String, // from cloudinary
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    refreshToken: {
       
    }
}, 
{
    timestamps: true // Corrected option name
}
);





const saltRounds = 10
userSchema.pre('save' , async function (next) {
    if (!this.isModified('password'))  return next()
    
    this.password =  await bcrypt.hash(this.password , saltRounds)
    next()
})

userSchema.methods.comparePassword = async function(password){ //user providing password
    // console.log("plain password :" , password);
    // console.log("hashed password :" , this.password);
   return await bcrypt.compare(password , this.password) //db saved password
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET ,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model('User' , userSchema)