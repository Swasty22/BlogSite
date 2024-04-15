import mongoose , {Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }]
});


export const Category = new mongoose.model("Category" , categorySchema)