import mongoose from "mongoose"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:[8,"it must be 8 characters"],
        maxlength:[20,"passwrd mre than 20 characters are nt appicabe"]
    },
    fullName:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true,
        unique:true,
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{timestamps:true});

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) 
        return next()
    this.password=await argon2.hash(this.password)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await argon2.verify(password,this.password)
 }

 userSchema.methods.generateAccessToken =function () {
    return jwt.sign({
        id : this._id,
        username : this.username,
        email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY},
    )
}

userSchema.methods.generateRefreshToken =function () {
    return jwt.sign({
        id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY},
    )
}
export const User=mongoose.model("User",userSchema);