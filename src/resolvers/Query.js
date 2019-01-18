var { productList } = require('../../mock_data/ProductList');
var userInfo = require('../variables/Users');
var cartInfo = require('../variables/Carts');


/**
 * Get all products.
 * Optional: if inStock is true, only products will available inventory
 * will be shown.
 */
function getAllProducts(parent, args) {
    if (args.inStock) {
        return productList.filter(product => product.inventory_count > 0);
    } else {
        return productList
    }
}

/**
 * Get product by title if it exists.
 */
function getProductByTitle(parent, args) {
    return productList.filter(product => product.title === args.title);
}

/**
 * Get all products that are inside the specified price range.
 */
function getProductsByPriceRange(parent, args) {
    return productList.filter(product => product.price >= args.min && product.price <= args.max);
}

/**
 * Get a user's current cart if it exists.
 */
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