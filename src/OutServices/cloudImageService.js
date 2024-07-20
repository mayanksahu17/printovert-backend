import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiError } from "../utils/ApiError";

const uploadImage = asyncHandler(async (req, res) => {
    try {
     
      if (!req.files?.Image[0]?.path) {
        return res.status(300).json({
            success : false ,
            data : null,
            message : "No image found"
        })
    }
      const imageLocalPath = req.files?.Image[0]?.path;
      console.log(imageLocalPath);
      if (!imageLocalPath) {
        throw new ApiError(400, 'Image file is required');
      }
  
      const image = await uploadOnCloudinary(imageLocalPath);
  

  
      return res.status(200).json(new ApiResponse(200, image, 'Image added Successfully'));
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  