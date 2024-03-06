import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  emailValidator from "email-validator"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const generateAccessAndRefereshTokens = async(userId) =>{
    //why try catch? bcz there is so many DB calls it could be possible that it can fail
    try {
        //    we need to store refreshToken in DB so we take user and we save that vaue after words
       const user= await User.findOne(userId)
    
       // User no user bcz that info. wi fetch by these tokens
       const accessToken=user.generateAccessToken()
       //recovering mistake of generateRefreshToken
       const refreshToken=user.generateRefreshToken()
    
       // save refreshToken in DB
        user.refreshToken=refreshToken;
    
        //User.save == no
        //user.save ==yes bcz we are saving that user vaue not mode 
        await user.save({ validateBeforeSave: false })
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export const registerUser=asyncHandler(async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db and take that url from cloudinary
    // check for user creation
    // return res and remove password and refresh token field from response

    // get user details 
    const {fullName, email, username, password } = req.body
    // console.log(email)
    if (
        [fullName, email, username, password].some((field) => field?.trim === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check  email
    const validEmail=emailValidator.validate(email);
    if (!validEmail) {
        throw new ApiError(400, "Email is Incorect")
    }

    // check password
    const passwordRegEx=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    const validPassword=passwordRegEx.test(password);
    if (!validPassword) {
        throw new ApiError(400, "at least 8 characters /n must contain at least 1 uppercase letter/n 1 lowercase letter/n and 1 number/n Can contain special characters")
        
    }

     // check if user already exists: username, email
     const userExist=await User.findOne({
         $or:[{username},{email}]
        })
        if(userExist){
            throw new ApiError(409,"This username/email Exist.")
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400,"Avatar is required")
        }
        
        const avatar = await uploadOnCloudinary(avatarLocalPath)

        // check avatar is uploaded on cloudinary bcz it isn't DB fatega
        if (!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }

        // create user object - create entry in db and take that url from cloudinary
        const user = await User.create({
            fullName,
            avatar: avatar.url,
            email, 
            password,
            username: username.toLowerCase()
        })

    // return res and remove password and refresh token field from response
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        // check for user creation
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        // send data
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )   
    

})