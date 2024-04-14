import {User} from '../models/user.model.js'
import {apiError} from '../utilities/apiError.js'
import {apiResponse} from '../utilities/apiResponse.js'
import {asyncHandler} from '../utilities/asyncHandler.js'
import { deleteFromCloudinary, uploadOnCloudinary } from '../utilities/cloudinary.js'


const registerUser = asyncHandler(async (req,res) => {
    const {userName , fullName , email , password} = req.body
//to register a user we need user name , fullname , email , password
    if (
        [userName , fullName , email , password].some((fields) => fields?.trim() === '')
        ) {
        throw new apiError(401 , "All fields are required")
    }

    if (!email.includes("@")) {
        throw new apiError(401 , "invalid email")
    }

    const existingUser = await User.findOne({$or: [{userName} , {email}]})
    if (existingUser) {
        throw new apiError(400 , "user already exists")
    }
    //if user already not exists upload profile pic of the user
    const profilePicLocalPath = req.files?.profilePic[0]?.path

    if (!profilePicLocalPath) {
        throw new apiError(400 , "profile pic is required")
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath)

    const user = await User.create({userName:userName.toLowerCase() , fullName , email , password , profilePic:profilePic.url})

    const createUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createUser) {
        throw new apiError(500 , "something went wrong while creating user please try again")
    }

    await deleteFromCloudinary()

   return res.status(200)
    .json( new apiResponse(200 , createUser ,"Account created successfully"))

})

//login user , logout user , 

export {registerUser}