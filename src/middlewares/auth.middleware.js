import jwt from 'jsonwebtoken'
import {apiError} from '../utilities/apiError.js'
import {apiResponse} from '../utilities/apiResponse.js'
import {asyncHandler} from '../utilities/asyncHandler.js'
import { User } from '../models/user.model.js'

const verifyJWT = asyncHandler(async (req,res) => {
   try {
    const token = await req.cookies.accessToken || req.header("Authorization").replace("Bearer " , '') 
 
    if (!token) {
     throw new apiError(500 , "failed to get accesstoken")
    }
 
    //verify the token
 
    const verifiedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
    const user = await User.findById(verifiedToken._id).select('-password -refreshToken')
    if (!user) {
     throw new apiError(500 , "invalid user")
    }
 
    req.user = user
 
    next()
   } catch (error) {
    throw new apiError(500 , error.message || "invalid access token")
   }
})

export {verifyJWT}