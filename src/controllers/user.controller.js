import {User} from '../models/user.model.js'
import {apiError} from '../utilities/apiError.js'
import {apiResponse} from '../utilities/apiResponse.js'
import {asyncHandler} from '../utilities/asyncHandler.js'
import { deleteFromCloudinary, uploadOnCloudinary } from '../utilities/cloudinary.js'


const generateAccessTokenAndRefreshToken = async(userId) =>{
    
        try {
            const user = await User.findById(userId)
    
            // console.log("user found inside generate access and refresh token:" ,user);
            
            const accessToken =  await user.generateAccessToken()
            
            const refreshToken = await user.generateRefreshToken()
            
           
        
            user.refreshToken = refreshToken
    
            await user.save({validateBeforeSave:false})
            
            
            return {accessToken , refreshToken}
        } catch (error) {
            console.log(error , "something went wrong while generating access and refresh token");
        }
    }
    
        // throw new apiError(500 , "something went wrong while creating access and refresh token", error)
    


    



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

    const user = await User.create(
        {userName:userName.toLowerCase() , 
            fullName , 
            email ,
             password ,
              profilePic:profilePic.url
        })
        // console.log("user after register :"  , user);
    const createUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createUser) {
        throw new apiError(500 , "something went wrong while creating user please try again")
    }

    await deleteFromCloudinary()

   return res.status(200)
    .json( new apiResponse(200 , createUser ,"Account created successfully"))

})

//login user , logout user , 
const loginUser = asyncHandler(async (req, res) => {
    //before login we need to check if the user exists or not / verify email and password before login..
    //when logging in we need to create access and refresh token 
    //store the  refresh token in db 

    const {email , password } = req.body
    // console.log("password: " , password);
    // console.log("email :" , email);
    
    if (!email || !password) {
        throw new Error(400, "email and password is required");
    }
    

    const user = await User.findOne({email})
    // console.log("user found by mail :" , user);
    // console.log("user :" , user);
    if (!user) {
        throw new apiError(401 , "unauthorized user")
    }
    //authorized user
    //check for valid password

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new apiError(401 , "password is incorrect ")
    }

    // console.log("user inside login user : " ,user )

    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
    

    //after logged in we need to deny the modification of access and refrehs token by front end

    // console.log("user :" , user);
    const  loggedIn = await User.findById(user._id).select('-password  -refreshToken')

    const options = {
        httpOnly:true , secure:true
    }

    return res.status(200)
    .cookie("access token " , accessToken , options)
    .cookie("refresh token " , refreshToken , options)
    .json(new apiResponse(200
        // {user:loggedIn , accessToken , refreshToken}
        , "user logged in successfully"))

})

const logoutUser = asyncHandler(async (req,res) => {
    const user = await User.findByIdAndUpdate(req.user._id,
        {
        $set:{
            refreshToken:undefined
        },
    },
    {
        new:true
    }
    )
    return res.status(200).json(new apiResponse(200 , "logout successfull"))
})

export {registerUser , loginUser ,logoutUser }