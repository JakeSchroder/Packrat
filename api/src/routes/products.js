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
        const filter = {
            product_type: ProductTypes[ProductType], 
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}}
        };
        const options = 'title variants images vendor tags product_type';
        const result = await Product.find(filter, options).sort({random_sort:1}).skip(pageIndex*pageSize).limit(pageSize).exec();
        response.send(result);
    });
})

module.exports = router;