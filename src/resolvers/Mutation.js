const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { productList } = require('../../mock_data/ProductList');

const APP_SECRET = "_Gr4phQL_"

// ========== USERS ==========
var isUserLoggedIn = false;
var user = {
    id: null,
    username: null,
    password: null,
    cart: null
};
var users = [];

// ========== CARTS ==========
var isCartCreated = false;
var cart = {
    productsInCart: [],
    totalAmount: 0.0
};


function createCart() {
    if(!isUserLoggedIn){
        throw new Error('Please log in first.')
    }
    if (isCartCreated) {
        throw new Error('A cart has already been created.');
    } else {
        user.cart = cart
        isCartCreated = true;
        return cart;
    }
}

function addProductToCart(parent, args) {
    if (isCartCreated) {
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].title === args.title) {
                if (productList[i].inventory_count > 0) {
                    cart.productsInCart.push(productList[i]);
                    cart.totalAmount += productList[i].price;
                    user.cart = cart;
                    return cart;
                } else {
                    throw new Error('Sorry, this item is out of stock.');
                }
            }
        }
        throw new Error('This item does not exist.');
    } else {
        throw new Error('Please create a cart first.');
    }
}

function completeCart() {
    if (isCartCreated) {
        for (let i = 0; i < cart.productsInCart.length; i++) {
            for (let j = 0; j < productList.length; j++) {
                if (cart.productsInCart[i].title === productList[j].title) {
                    productList[j].inventory_count -= 1;
                }
            }
        }
        cart.productsInCart = []
        cart.totalAmount = 0;
        isCartCreated = false;
        user.cart = cart;
        return cart;
    } else {
        throw new Error('Please create a cart first.');
    }
}

async function signUp(parent, args) {
    user.id = `${args.username}@${new Date().getTime()}`;
    user.username = args.username;
    user.password = await bcrypt.hash(args.password, 10);
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    const message = "You have successfully signed up, please log in."
    users.push(user);

    return {
        user,
        message,
        token
    }
}

async function logIn(parent, args) {
    const username = args.username;
    const isValidPassword = await bcrypt.compare(args.password, user.password);

    if (!doesUserExist(username, users) || !isValidPassword) {
        throw new Error('This username/password is invalid');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    const message = "You have succesfully logged in, enjoy your shopping!"

    isUserLoggedIn = true;

    return {
        user,
        message,
        token
    }
}

// ========== HELPER FUNCTIONS ==========
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