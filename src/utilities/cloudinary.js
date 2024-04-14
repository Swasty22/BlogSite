import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" , folder:'Blog'
        })
        console.log('file has been successfully uploaded on cloudinary ', response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("error while uploading on cloudinary ", error);
    }
}

const deleteFromCloudinary = async () => {
        await cloudinary.api
         .delete_resources_by_prefix('Blog/')
         .then(result=>console.log("image deleted from cloudinary successfully",result));
     
}

export { uploadOnCloudinary  , deleteFromCloudinary}