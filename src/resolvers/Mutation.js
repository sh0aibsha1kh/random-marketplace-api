const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { productList } = require('../../mock_data/ProductList');

const APP_SECRET = "Gr4phQL"

var user = {
    id: null,
    username: null,
    password: null,
    cart: null
}
var users = [];

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
        for (let i = 0; i < cart.productsInCart.length; i++) {
            for (let j = 0; j < productList.length; j++) {
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

async function signUp(parent, args) {
    user.id = new Date().getTime();
    user.username = args.username;
    user.password = await bcrypt.hash(args.password, 10);
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    users.push(user);

    return {
        user,
        token
    }
}

async function logIn(parent, args) {
    const username = args.username;
    if (!doesUserExist(username, users)) {
        throw new Error('This user does not exist');
    }

    const isValidPassword = await bcrypt.compare(args.password, user.password);
    if (!isValidPassword) {
        throw new Error('This password is invalid');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        user,
        token
    }


}

// HELPER FUNCTIONS
function doesUserExist(username, users) {
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].username) {
            return true;
        }
    }
    return false;
}



module.exports = {
    createCart,
    addProductToCart,
    completeCart,
    signUp,
    logIn
}