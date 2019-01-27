# Random Marketplace API

This API was built to learn and experiment with GraphQL.

## Requirements

Please make sure `node` and `npm` are up to date.

## Documentation

Once you launch the server and access the page (http://localhost:4000), all of the API documentation will be available by clicking the green **SCHEMA** button on the right.

![alt text][schema]

A tutorial on sample end-to-end flows of the application can be seen below.

## Getting Started

Go ahead and clone this repo, navigate into the directory and run

```
npm install
```

After everything has installed succesfully, go ahead and run

```
node src/index.js
```

The server should now be started on http://localhost:4000.

## Sample Flows
Let's start shopping!
### Fetch a product by title
```
query {
  getProductByTitle(title: "pants") {
    title
    price
    inventory_count
  }
}
```

### Fetch all products
```
query {
  getAllProducts {
    title
    price
    inventory_count
  }
}
```

### Fetch all products that are in stock
```
query {
  getAllProducts(inStock: true) {
    title
    price
    inventory_count
  }
}
```

### Fetch products by price range
Enter the following query:
```
query {
  getProductsByPriceRange(min: 10, max: 50) {
    title
    price
    inventory_count
  }
}
```

### Make a purchase
1. Create an account.
```
mutation {
  signUp(username: "shopper123", password: "p4ssw0rd") {
    user {
      id
      username
      password
      cart {
        productsInCart {
          title
          price
        }
        totalAmount
      }
    }
    message
    token
  }
}
```

2. Let's sign in.
```
mutation {
  logIn(username: "shopper123", password: "p4ssw0rd") {
    user {
      id
      username
      password
      cart {
        productsInCart {
          title
          price
        }
        totalAmount
      }
    }
    message
    token
  }
}
```
3. Create a cart.
```
mutation {
  createCart {
    productsInCart {
      title
      price
    }
    totalAmount
  }
}
```

4. Add products to your cart.
```
mutation {
  addProductToCart(title: "lotion") {
    productsInCart {
      title
      price
    }
    totalAmount
  }
}
```

5. Complete your cart.
```
mutation {
  completeCart {
    purchasedProducts {
      price
      title
    }
    message
  }
}
```

6. Log out.
```
mutation {
  logOut {
    message
  }
}
```

## Testing

In a separate terminal, while the server is currently running on http://localhost:4000/, enter the following command:
```
npm test
```

## Notes

I used https://www.randomlists.com/things to generate a list of 100 random items to work with.

Then, I created a python script to go through the random item list and generate a javascript object file ([ProductList.js](../mock_data/ProductList.js)) which contains the `title`, `price`, and `inventory_count` of the items.



## Next Steps
- API
    - Connect to a database
    - Add pagination to queries
- Users
    - Support multiple active logged in sessions
    - View order history
    - Add a wishlist
- Products
    - Add a rating system
    - Add more descriptive fields (category, seller, etc)
- Carts
    - Add functionality to remove an item from your cart
    - Add functionality to *hold* an item while it is in your cart
    - Retain cart content upon logging out and logging back in

<!-- IMAGES -->
[schema]: documentation/schema_button.png
