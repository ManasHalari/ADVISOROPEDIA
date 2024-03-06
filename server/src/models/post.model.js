import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema=new mongoose.Schema({
    //considering that we are dealing with only images if video is specified then that can also be done
    imageFile: {
        type: String, //cloudinary url
        required: true
    },
    //cloudinary public_id is reqiured if we want to remove that asset
    cloudinay_public_idOfImage:{
        type:String,
        required:true
    },
    description: {
        type: String, 
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})

//we can't give a videos to the user so we will give limited no. of videos
postSchema.plugin(mongooseAggregatePaginate)

export const Post=mongoose.model("Post",postSchema)