import mongoose , {Schema} from "mongoose";

const blogSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Like"
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    imageCaption: {
        type: String
    }
},
 {
    timestamps: true
}
);

export const Blog = new mongoose.model("Blog" , blogSchema)