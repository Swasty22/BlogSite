import mongoose from "mongoose";

const connectdb = async() => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URL}/blogs`)
        console.log(`mongo db is connected successfully ,${response.connection.host}`)
    } catch (error) {
        console.log("mongo db connection error" , error)
        process.exit(1)
    }
}

export default connectdb