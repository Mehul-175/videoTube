import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'; 

dotenv.config()

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            console.log("File uploaded on cloudinary. File src: " + response.url);
            //once the file is uploaded we would like to delete it from our server
            setTimeout(() => {
                fs.unlinkSync(localFilePath);
            }, 5000); // Delete after 5 seconds
            
            return response
        } catch (error) {
            fs.unlinkSync(localFilePath)
        }
    }


    const deleteFromCloudinary = async (publicId) => {
        try {
            const result = await cloudinary.uploader.destroy(publicId)
            console.log("Deleted from cloudinary. Public Id: ", publicId);
        } catch (error) {
            console.log("Failed to delete the images from cloudinary");
            return null;
        }
    }

    export {uploadOnCloudinary, deleteFromCloudinary}