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

Object.keys(ProductTypes).forEach((ProductType) => {
    router.get(`${basePath}/${ProductType.toLowerCase()}`, async (request, response) => {// Retrieves Top products
        const { pageIndex, pageSize } = request.query;
        // TODO: validate query params before injecting them into query to prevent SQL injection
        const result = await Product.find({
            product_type: ProductTypes[ProductType], 
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}}
        }, 'title variants images vendor tags product_type').skip(pageIndex*pageSize).limit(pageSize).exec();
        response.send(result);
    });
})

module.exports = router;