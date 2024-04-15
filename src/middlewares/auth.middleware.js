import jwt from 'jsonwebtoken'
import {apiError} from '../utilities/apiError.js'
import {apiResponse} from '../utilities/apiResponse.js'
import {asyncHandler} from '../utilities/asyncHandler.js'
import { User } from '../models/user.model.js'

const verifyJWT = asyncHandler(async (req, res , next) => {
   try {
     const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ",'')  
     console.log("token :" , token);//we used cookies using cookie parser as middleware so on res adn req we can access cookies
    //req has access to cookie parser so we can use cookies here..req.cookie
     if (!token) {
         throw new apiError(400, "Unauthorized user ") //if token not avilable throw error
     }
     //if token available verify with jwt (json web token)bcoz it has access to our  id and email in user.model.js decode the token
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
     console.log("decoded token :",decodedToken);
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    console.log("USER :" , user);
     
     if (!user) {
         throw new apiError(401 , "Invalid Access Token")
     }
     req.user = user

     next()
   } catch (error) {
    throw  new apiError(401, error || "invalid access token")
   }

})


export {verifyJWT}