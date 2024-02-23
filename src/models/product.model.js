import mongoose ,{Schema} from 'mongoose';


const productSchema = new Schema(
{
    name: {type: String,},

    image0: {type: String, required: true},

    image1: {type: String, required: true},

    image2: {type: String, required: true},

    image3: {type: String, required: true},

    color: {type: String, required: true},

    brand: {type: String, },

    category: {type: String, },

    description: {type: String, },

    price: {type: Number,},

    stock: {type: Number},
    
    rating: {type: Number },

    shipped: {type: Boolean},

    delivered: {type: Boolean },

    ordered : {type : Boolean},

    quantity : {type : String},

    userid : {type : String},

    rejected : {type : String},

    active : {type : String}

},
{
    timestamps: true,
}
);


const Product = mongoose.model("Product", productSchema);

export default Product;