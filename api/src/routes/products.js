const router = require('express').Router();
const mongoose = require('mongoose');
const { ALL, TOP, BOTTOM, FULL_BODY, ACCESSORIES, MISC } = require('../types/productsTypes');
const ProductTypes = require('../types/productsTypes');

// TODO: Move to own file/automatically scrape and organize //
const productSchema = new mongoose.Schema({
    title: String,
    variants: Array,
    images: Array,
    product_type: String,
    tags: Array
});

const basePath = '/products';
const Product = mongoose.model('Product', productSchema, "products");

router.get(`${basePath}/All`, async (req, res) => {// Retrieves All products
    const result = await Product.find({
        product_type: ALL, 
        'variants.available':true, 
        'tags':{$nin:["kid", "Kids"]},
        'title':{$not:{$regex:"Kids"}} }, 
        'title variants images vendor tags product_type'
    ).exec();
    console.log(result)
    res.send(result);
});

Object.keys(ProductTypes).forEach((ProductType) => {
    router.get(`${basePath}/${ProductType.toLowerCase()}`, async (req, res) => {// Retrieves Top products
        const result = await Product.find({
            product_type: ProductTypes[ProductType], 
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}}
        }, 'title variants images vendor tags product_type').exec();
        console.log(result)
        res.send(result);
    });
})

module.exports = router;