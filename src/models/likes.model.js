import mongoose , {Schema} from "mongoose";

const likeSchema = new mongoose.Schema
(
    {
        comment:{
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    {
        content:{
            type:Schema.Types.ObjectId,
            ref : "Blog"
        }
    },
    {
        likedBy:{
            type:Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        TimeStamps:true
    }
    )

export const Like = mongoose.model('Like' , likeSchema)