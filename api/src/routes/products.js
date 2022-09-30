const router = require('express').Router();
const mongoose = require('mongoose');

// TODO: Move to own file/automatically scrape and organize //
const productSchema = new mongoose.Schema({
    title: String,
    variants: Array,
    images: Array,
    product_type: String,
    tags: Array
});
const typeFilter = ['Shop_All', 'T-Shirts', 'Tops', 
                    'Layers', 'Pullovers', 'Shorts', 
                    'Pants', 'Dresses_&_Skirts', 'Swim', 
                    'Shoes', 'Jewelry', 'Accessories', 
                    'Wildcard_Clothing', 'Goods'];

const basePath = '/products';
const Product = mongoose.model('Product', productSchema, "products");

typeFilter.forEach((type) => {
    router.get(`${basePath}/${type.toLowerCase()}`, async (request, response) => {// Retrieves Top products
        const { pageIndex, pageSize } = request.query; 
        // TODO: validate query params before injecting them into query to prevent SQL injection
        const filter = (type === 'Shop_All')?{
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}}
        } : {
            'product_type': type, 
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}}
        };
        const options = 'title variants images vendor tags product_type';
        const result = await Product.find(filter, options).sort({random_sort:1}).skip(pageIndex*pageSize).limit(pageSize).exec();
        response.send(result);
    });
})

router.get(`/filters/all`, async (request, response) => {
    response.send({filters: ['type', 'vendor', 'sort']});
})

router.get(`/filters/type`, async (request, response) => {

    response.send({filterOptions: typeFilter})

})

router.get(`/filters/vendor`, async (request, response) => {
    const vendorFilter = ['Brain Dead', 'Tunnel Vision'];
    response.send({filterOptions: vendorFilter})
})

router.get(`/filters/sort`, async (request, response) => {
    const sortFilter = ['Price, Low to High', 'Price, High to Low', 'Date, Old to New', 'Date New to Old'];
    response.send({filterOptions: sortFilter})
})

module.exports = router;