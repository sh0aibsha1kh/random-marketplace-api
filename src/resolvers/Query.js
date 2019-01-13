var { productList } = require('../../mock_data/ProductList');

function getAllProducts(parent, args) {
    if (args.inStock) {
        return productList.filter(product => product.inventory_count > 0);
    } else {
        return productList
    }
}

function getProductByTitle (parent, args) {
    if (args.title) {
        return productList.filter(product => product.title === args.title);
    }
}

module.exports = {
    getAllProducts,
    getProductByTitle
}