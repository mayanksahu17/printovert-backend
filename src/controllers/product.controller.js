import Product from '../models/product.model.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js' 
import {asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'

const addNewProduct = asyncHandler(async (req, res) => {
  try {
      const userId = req.params.id;
      if (!userId) {
        throw new ApiError(401,"user id is required")
      }
      const user = await User.findById(userId);

      if (!user) {
          throw new ApiError(404, "User not found");
      }

      const {
          name,
          color,
          brand,
          category,
          description,
          price,
          stock,
          rating,
          shipped,
          delivered,
          quantity ,
          ordered,
          image0,
          image1,
          image2,
          image3,
          userid
                   } = req.body;

    

      const productDetail = {
          name,
          color,
          brand,
          category,
          description,
          price,
          stock,
          rating,
          shipped,
          delivered,
          quantity,
          ordered,
          image0,
          image1,
          image2,
          image3,
          userid
      };

     // Save the product to get its ID
    const newProduct = await Product.create(productDetail);
    const productId = newProduct._id;

    // Push the productId into user.orders
    user.orders.push(productId);
    await user.save();
      res.status(200).json(new ApiResponse(200, user.orders, "Order created successfully"));
  } catch (error) {
      console.error('Error:', error.message);
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
  }
});

const UpdateProduct = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
  
    // Check if userId or productId is undefined
    if (!userId || !productId) {
      throw new ApiError(400, "Invalid userId or productId");
    }
  
    const user = await User.findById(userId);
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    const { ordered, delivered, shipped , price, quantity } = req.body;

    if (!(price*quantity > user.walletBalance)) {
      const { orders } = user;
  
      const product = await Product.findById(productId)

      
      if (!product) {
     
        throw new ApiError(404, "Product not found in user's orders");
      
      }
     
      
        product.ordered = ordered;
        product.delivered =  delivered;
        product.shipped =  shipped;


        user.walletBalance = user.walletBalance - price*quantity
        user.spent = price*quantity
        await product.save()
        await user.save();  
    
        res
        .status(200)
        .json(new ApiResponse(200,"Order UPDATED Successfully" ));
     
    }else{
      throw new ApiError(404, "Not enough wallet ballance");
    }
   
  });
  

  const removeProduct = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;
    
    // Check if userId or productId is undefined
    if (!userId || !productId) {
      throw new ApiError(400, "Invalid userId or productId");
    }
  
    const user = await User.findById(userId);
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    const { orders } = user;
  
    // Find the index of the product to remove
    const indexToRemove = orders.findIndex((product) => product?._id === productId);
  
    if (indexToRemove !== -1) {
      // Remove the product from the orders array
      const removedProduct = orders.splice(indexToRemove, 1);
  
      // Save the updated user with the modified orders array
      await user.save();
  
      res.status(200).json(new ApiResponse(200,removedProduct,"Order created Successfully" ));
    } else {
      throw new ApiError(404, "Product not found in user's orders");
    }
  });

  const getAllProducts = asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);
  
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      // This allorders is an array containing all product IDs
      const allorders = user.orders;
  
      // Use $in to find products whose _id is in the allorders array
      const products = await Product.find({ _id: { $in: allorders } });
  
      res.status(200).json(new ApiResponse(200, products, "All products retrieved successfully"));
    } catch (error) {
      console.error('Error:', error.message);
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
  });
  
  const test = asyncHandler(async(req,res)=>{
    res.send("<h1> Server is ready</h1>")
  })
export {
    addNewProduct,
    UpdateProduct,
    removeProduct,
    getAllProducts,
    test
}