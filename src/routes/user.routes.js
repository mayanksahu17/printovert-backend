import {Router} from 'express'
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserCredencials,
    addWalletBalance ,
    uploadImage ,
    getAllImages,
    getAllUserTransactions,
    getAllOrderedProducts,
    libraryImage
} from '../controllers/user.controller.js'
 import {  getAllUserTickets  ,  createTicket} from '../controllers/ticket.controller.js'
import {upload} from '../middleware/multer.middleware.js'
import {verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/login').post(loginUser)

router.route('/register').post(registerUser)



// secured Routes 


router.route('/logout').post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/credencials").get(getUserCredencials)

router.route("/:id/update-account").patch(updateAccountDetails)

router.route("/image/:id").post(upload.fields([{ name: "Image", maxCount: 1 }]), uploadImage);
// router.route("/image/:id").get((req,res)=>{

//     const id= req.params.id;
//     res.send("api works  with param : "+id)
// })

router.route("/:id/upload/library/image").post(upload.fields([{ name: "Image", maxCount: 1 }]),libraryImage)

router.route("/all-image/:id").get(getAllImages);

router.route("/:id/tickets").get(getAllUserTickets);

router.route("/:id/transactions").get(getAllUserTransactions);

router.route("/:id/cart").get(getAllOrderedProducts);

router.route("/:id/create-ticket").post(createTicket);

router.route("/:id/wallet/request").post(addWalletBalance)

router.route("/current-user").get(verifyJWT, getCurrentUser)






export default router 


