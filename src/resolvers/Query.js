var { productList } = require('../../mock_data/ProductList');
var userInfo = require('../variables/Users');
var cartInfo = require('../variables/Carts');


function getAllProducts(parent, args) {
    if (args.inStock) {
        return productList.filter(product => product.inventory_count > 0);
    } else {
        return productList
    }
}

function getProductByTitle(parent, args) {
    return productList.filter(product => product.title === args.title);
}

function getProductsByPriceRange(parent, args) {
    return productList.filter(product => product.price >= args.min && product.price <= args.max);
}

function getCart(parent, args) {
    if (!userInfo.isUserLoggedIn) {
        throw new Error('Please log in to create a cart.');
    }
    if (!cartInfo.isCartCreated) {
        throw new Error('Please create a cart.');
    }
    return cartInfo.cart;
}

module.exports = {
    getAllProducts,
    getProductByTitle,
    getProductsByPriceRange,
    getCart
}