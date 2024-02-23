import {addNewProduct , UpdateProduct , removeProduct,getAllProducts ,test} from '../controllers/product.controller.js'
import {Router} from 'express'
import {upload} from '../middleware/multer.middleware.js'



const router = Router()

router.route("/:id/add-new/product").post(addNewProduct);

router.route("/:userId/products/:productId").put(UpdateProduct);

router.route("/:userId/products/:productId").delete(removeProduct);

router.route("/:id/get-all-products").get(getAllProducts)

router.route('/test').get(test) 


export default router 
