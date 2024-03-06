import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.model.js";


export const publishAPost = asyncHandler(async (req, res) => {
    //take all details from user using form-data bcz of imageFile
    //validate that all fileds are valid or not
    //upload imageFile on cloudinary
    //save user's video data in DB

    const {description}=req.body;

    //check that none of the field have empty value
    if (
        [description].some((field) => field?.trim === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //take path from files
    const PostLocalPath=req.files?.imageFile[0]?.path;
    

    if (!PostLocalPath ) {
        throw new ApiError(400,"post is required")
    }

    //upload file on cloudinary
    const postResponse=await uploadOnCloudinary(PostLocalPath)
    
    if (!postResponse) {
        throw new ApiError(500,"file is not uploaded")
    }

    
    const post=await Post.create({
        description,
        imageFile: postResponse?.secure_url,
        isPublished:true,
        cloudinay_public_idOfImage:postResponse?.public_id,
        owner: req.user._id,
    })

    if (!post) {
        throw new ApiError(400,"post details is not saved in DB")
    }

    const postDetails=await Post.findById(post._id)

    if (!postDetails) {
        throw new ApiError(400,"post details cannot found in  DB")
    }

    return res.status(201).json(
        new ApiResponse(200,postDetails, "post published Successfully")
    )   

})

export const getAllPosts = asyncHandler(async (req, res) => {
    // Steps to get all posts
  // take all required information from req.query
  // Now, validate all fields to check they are not empty
  /* sortBy -> tells by which field to sort (eg.  description, etc)
   * sortType -> tells two options ascending(asc) or descending(desc)
   */
  // Now, use mongodb aggregation pipeline
  // 1. $match using $and operator both the query 
  // 2. sort order taken from the req.query
  // 3. use mongodb aggregate paginate

  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const postAggregationPipeline = Post.aggregate();

  const resultedPost = await Post.aggregatePaginate(
    postAggregationPipeline,
    options
  );

  if (resultedPost.totalDocs === 0) {
    return res.status(200).json(new ApiResponse(200, {}, "user has no video"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resultedPost, "video fetched successfully"));
})