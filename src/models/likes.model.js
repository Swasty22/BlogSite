import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});


export const Like = mongoose.model('Like', likeSchema)