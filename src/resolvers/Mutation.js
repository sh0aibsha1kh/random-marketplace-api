const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var { productList } = require('../../mock_data/ProductList');

const APP_SECRET = "Gr4phQL"

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
        throw new Error('please log in first')
    }
    if (isCartCreated) {
        throw new Error('a cart has already been created');
    } else {
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
                    return cart;
                } else {
                    throw new Error('sorry, this item is out of stock');
                }
            }
        }
        throw new Error('this item does not exist');
    } else {
        throw new Error('please create a cart first');
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
    const isValidPassword = await bcrypt.compare(args.password, user.password);

    if (!doesUserExist(username, users) || !isValidPassword) {
        throw new Error('This username/password is invalid');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        user,
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