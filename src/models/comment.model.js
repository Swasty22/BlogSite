import mongoose , {Schema} from "mongoose";

const commentSchema = new mongoose.Schema
(
    {
        comment:{
            type:String
        }
    },
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        blog:{
            type:Schema.Types.ObjectId,
            ref:"Blog"
        }
    },
    {
        timeStamps:true
    }
)

export const Comment = new mongoose.model("Comment" , commentSchema)