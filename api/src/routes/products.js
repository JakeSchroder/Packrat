const router = require('express').Router();
const mongoose = require('mongoose');

// TODO: Move to own file/automatically scrape and organize //
const productSchema = new mongoose.Schema({
    body_html: String,
    title: String,
    variants: Array,
    images: Array,
    product_type: String,
    tags: Array,
    random_sort: String,
    url: String
});
const typeFilter = ['Shop_All', 'T-Shirts', 'Tops', 
                    'Layers', 'Pullovers', 'Shorts', 
                    'Pants', 'Dresses_&_Skirts', 
                    'Shoes', 'Jewelry', 'Accessories', 
                    'Wildcard_Clothing', 'Goods'];

const basePath = '/products';
const Product = mongoose.model('Product', productSchema, "products");

typeFilter.forEach((type) => {
    router.get(`${basePath}/${type.toLowerCase()}`, async (request, response) => {// Retrieves Top products
        const { sortOrder, pageIndex, pageSize } = request.query; 
        let sortQuery = {};
        // TODO: validate query params before injecting them into query to prevent SQL injection
        const filter = (type === 'Shop_All')?{
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}, $not:{$regex:"Gift Card"}}
        } : {
            'product_type': type.replaceAll('_', ' '), 
            'variants.available':true,
            'tags':{$nin:["kid", "Kids"]},
            'title':{$not:{$regex:"Kids"}, $not:{$regex:"Gift Card"}}
        };

        if(sortOrder === 'Low_to_High'){
            sortQuery = {"variants.price": 1};
        }else if(sortOrder === 'High_to_Low'){
            sortQuery = {"variants.price": -1};
        }else if(sortOrder === 'Old_to_New'){
            sortQuery = {updated_at: 1};
        }else if(sortOrder === 'New_to_Old'){
            sortQuery = {updated_at: -1};
        }else{
            sortQuery = {random_sort:1};
        }
        const options = 'title handle variants images vendor tags product_type url';
        const result = await Product.find(filter, options).sort(sortQuery).collation({locale: "en_US", numericOrdering: true}).skip(pageIndex*pageSize).limit(pageSize).exec();
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
    const vendorFilter = ['Brain Dead', 'TUNNEL VISION', 'Honor The Gift', 'Fucking Awesome'];
    response.send({filterOptions: vendorFilter})
})

router.get(`/filters/sort`, async (request, response) => {
    const sortFilter = ['Random', 'Low to High', 'High to Low', 'Old to New', 'New to Old'];
    response.send({filterOptions: sortFilter})
})

module.exports = router;