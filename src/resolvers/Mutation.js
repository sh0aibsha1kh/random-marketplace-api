var { productList } = require('../../mock_data/ProductList');

var cartCreated = false;
var cart = {
    productsInCart: [],
    totalAmount: 0.0
};

function createCart() {
    if (cartCreated) {
        throw new Error('A cart has already been created.');
    } else {
        cartCreated = true;
        return cart;
    }
}

function addProductToCart(parent, args) {
    if (cartCreated) {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].title === args.title) {
                if (productList[i].inventory_count > 0) {
                    cart.productsInCart.push(productList[i]);
                    cart.totalAmount += productList[i].price;
                    return cart;
                } else {
                    throw new Error('Sorry, this item is out of stock.');
                }
            }
        }
        throw new Error('This item does not exist.');
    } else {
        throw new Error('Please create a cart first');
    }
}

function completeCart() {
    if (cartCreated) {
        for (let i = 0; i < cart.productsInCart.length; i++){
            for (let j = 0; j < productList.length; j++) {
                console.log(cart.productsInCart[i]);
                console.log(productList[j]);
                if (cart.productsInCart[i].title === productList[j].title) {
                        productList[j].inventory_count -= 1;
                }
            }
        }
        cart.productsInCart = []
        cart.totalAmount = 0;
        cartCreated = false;
        return cart;
    } else {
        throw new Error('Please create a cart first');
    }
}




module.exports = {
    createCart,
    addProductToCart,
    completeCart
}