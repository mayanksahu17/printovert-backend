import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadImageOutService = asyncHandler(async (req, res) => {
    try {
     
      
      if (!req.files?.Image[0]?.path) {
        console.log("file leke ao bhai ");
      }
      const imageLocalPath = req.files?.Image[0]?.path;
      console.log(imageLocalPath);
      if (!imageLocalPath) {
        throw new ApiError(400, 'Image file is required');
      }
  
      const image = await uploadOnCloudinary(imageLocalPath);
      console.log('Image URL:', image.url);
  
 
  
      return res.status(200).json({
        success : true ,
        message : "Image uploaded successfully",
        URL : image.url
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });