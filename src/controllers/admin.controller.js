import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '..//models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Product from '../models/product.model.js';
import { wallet } from '../models/wallet.model.js';
import { Admin } from '../models/admin.model.js';
import { Transection } from '../models/transections.js';
import { Ticket } from '../models/ticket.model.js';

const getAllOrderedProducts = asyncHandler(async (req, res) => {
  const orderedProducts = await Product.find({ ordered: true , delivered : false });
  return res.json(new ApiResponse(200,  orderedProducts,'Ordered products retrieved successfully'));
}); 

const getAllActiveProducts = asyncHandler(async (req, res) => {
  // Assuming active products are those that are not delivered yet
  const activeProducts = await Product.find({ active: true , delivered : false });
  return res.json(new ApiResponse(200,activeProducts, 'Active products retrieved successfully', ));
});

const getAllDeliveredProducts = asyncHandler(async (req, res) => {
  const deliveredProducts = await Product.find({ delivered: true });
  return res.json(new ApiResponse(200,deliveredProducts, 'Delivered products retrieved successfully', ));
});

const updateproduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const {ordered ,shipped, delivered ,active,rejected } = req.body
  
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {shipped, delivered ,active , rejected,ordered},
      { new: true }
    );

    if (!updatedProduct) {
      // If the product with the specified ID is not found
      throw new Error('Product not found');
    }

    res.status(200).json( new ApiResponse(200,updatedProduct,"Product updated successfully"));
  } catch (error) {
    console.error('Error in updateproduct:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});


const getAllWalletRequest = asyncHandler(async (req, res) => {
  const pendingWalletRequests = await wallet.find({ confirmed: false });
  return res.json(new ApiResponse(200,pendingWalletRequests, 'Pending wallet requests retrieved successfully', ));
});



const registerAdmin = asyncHandler(async(req,res)=>{
    const {userName , password} = req.body;
    console.log(userName , password);
    if ((!userName || !password) ) {
        throw new ApiError(500, " Username or password is required ");
    }
    const admin = Admin.create({userName , password })
    if (!admin) {
        throw new ApiError(500, "Something went wrong while registering the user");
      }

   return res.json(new ApiResponse(200 ,admin , "User Registered succesfullly"))
})



const loginAdmin = asyncHandler(async (req, res) => {
    try {
      const { userName, password } = req.body;
      console.log(userName, password);
  
      if (!userName || !password) {
        throw new ApiError(500, 'Username or password is required');
      }
  
      const admin = await Admin.findOne({ userName });
  
      if (!admin) {
        throw new ApiError(500, 'Something went wrong while logging in the user');
      }
  
      return res.json(new ApiResponse(200, admin, 'User logged in successfully'));
    } catch (error) {
      // Handle errors here, you may want to log or customize the response
      console.error('Error in loginAdmin:', error);
      res.status(error.statusCode || 500).json(new ApiResponse(false, null, error.message));
    }
  });

const getwalletrequests = asyncHandler(async (req, res) => {
    try {
      const allrequests = await wallet.find();
      if (!allrequests) {
       throw new ApiError(400,"Can not get wallet requests")
      }
      res.json(new ApiResponse(200, allrequests, 'All wallet requests fetched successfully'));
    } catch (error) {
    
      console.error('Error in getwalletrequests:', error);
      res.status(error.statusCode || 500).json(new ApiError(401,"Can not get wallet requests"));
    }
  });

const addwalletamount = asyncHandler(async (req, res) => {
    const { amount, userId , requestId } = req.body;
  
    try {
     
      const user = await User.findById(userId);
  
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
  
      if (amount <= 0) {
        throw new ApiError(400, 'Invalid amount. Amount must be greater than 0.');
      } 
      if(  !user.walletBalance) {  user.walletBalance = 0}
      user.walletBalance =  user.walletBalance +  amount; 

      
  
      await user.save();

      const Wallet = await wallet.findById(requestId)
      const transectionId = Wallet.transectionId
      
      const transaction = await Transection.findById(transectionId)

      transaction.Status = "Success";
      transaction.response = "Success";
      transaction.response = "Success";

      await transaction.save()

      const deletedRequested = await wallet.deleteOne({_id : requestId}) 

  
      res.json(new ApiResponse(200, `Wallet amount added successfully. New balance: ${user.walletBalance}`));
    } catch (error) {
      console.error('Error in addwalletamount:', error);
      res.status(error.statusCode || 500).json(new ApiResponse(400, error.message));
    }
  });
  
const getAllusers = asyncHandler(async(req,res)=>{
  try {
    const users = await User.find()
    if (!users) {
      throw new ApiError(404, 'User not found');
    }

    res.json(new ApiResponse(200 ,users,"Users fetched successfully"));
  
  } catch (error) {
    console.error('Users not found', error);
    res.status(error.statusCode || 500).json(new ApiResponse(400, error.message));
  }
})

const rejectRequest = asyncHandler(async(req, res) => {
  const { userId, TransectionId } = req.body;

  try {
    
    const user = await User.findById(userId);

    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const transaction = await Transection.findById(TransectionId);

    // Check if the transaction exists
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Delete the transaction
    await transaction.delete();

    // Remove the transaction ID from the user's Transection array
    user.Transection.pull(TransectionId);
    await user.save();

    return res.status(200).json({ success: true, message: 'Transaction rejected successfully' });
  } catch (error) {
    console.error('Error rejecting transaction:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




const test = asyncHandler(async (req,res)=>{
    res.json(new ApiResponse(200,"sab theek h "))
})

const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  if (!tickets || tickets.length === 0) {
    throw new ApiError(404, "No tickets found");
  }

  res.status(200).json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
});



export  {
    getAllOrderedProducts,
    getAllActiveProducts,
    getAllDeliveredProducts,
    getAllWalletRequest,
    registerAdmin,
    test,
    loginAdmin,
    getwalletrequests,
    addwalletamount,
    updateproduct,
    getAllusers,
    rejectRequest,
    getAllTickets
}