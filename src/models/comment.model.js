import mongoose , {Schema} from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
}, {
    timestamps: true
});


export const Comment = new mongoose.model("Comment" , commentSchema)