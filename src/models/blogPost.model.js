import mongoose , {Schema} from "mongoose";

const blogSchema = new mongoose.Schema
(
    {
        content:{
            type:String,
            required:true,
            
        }
    },
    {
        comment:[{
            type:Schema.Types.ObjectId,
            ref : "Comment"
        }]
    },
    {
        likes:{
            type:Schema.Types.ObjectId,
            ref : "Like"
        }
    },
    {
        isPublished:{
            type : Boolean
        }
    },
    {
        title:{
            type:String,
            required:true
        }
    },
    {
        image:{
            type:String
        }
    },
    {
        author:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        imageCaption:{
            type:String
        }
    },
    {
        timeStamps:true
    }
)

export const Blog = new mongoose.model("Blog" , blogSchema)