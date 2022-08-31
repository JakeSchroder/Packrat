const router = require('express').Router();
const mongoose = require('mongoose');

// TODO: Move to own file/automatically scrape and organize //
const TOP = ["t-shirt", "longsleeve", "hoodie", "jacket", "shirt", "sweatshirt", "VINTAGE TOP", "vintage shirt", "CROP TOP", "Vintage jacket", "Shirts & Tops"];
const BOTTOM = ["shorts", "pant", "Vintage Pants", "VINTAGE BOTTOMS", "Vintage skirt", "HWAB SHORTS", "Vintage shorts"];
const JEWELRY = [];
const HAT = ["hat"];
const MISC = ["bag", "footwear", "music", "sport", "toy", "eyewear", "furniture", "homeware", "bodysuit", "dress", "incense", "rug", "VINTAGE DRESS", "vintage outerwear", "Vintage Dress", ""];
const filter = TOP;

const productSchema = new mongoose.Schema({
    title: String,
    variants: Array,
    images: Array,
    product_type: String,
    tags: Array
});

const Product = mongoose.model('Product', productSchema, "products");

router.get('/products', async (req, res) => {// Retrieves products according to the applied filter
    const result = await Product.find({'variants.available':true, 'tags':{$nin:["kid", "Kids"]},'title':{$not:{$regex:"Kids"}} }, 'title variants images vendor tags').exec();
    console.log(result)
    res.send(result);
});

module.exports = router;