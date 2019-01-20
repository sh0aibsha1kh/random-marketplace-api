# PROCESS

This document describes how this API was built. I decided to build this API using Node.js and GraphQL.

## Basic Requirements

The first logical step for me was to complete the basic requirements of the API which were:

- fetch all products
    - pass in an optional parameter to only fetch products that are in stock
- fetch a single product
- purchase a product (which reduces the `inventory_count` of the purchased product by 1)

## Mock Data

I used https://www.randomlists.com/things to generate a list of 100 random items to work with.

Then, I created a python script to go through the random item list and generate a javascript object file ([ProductList.js](../mock_data/ProductList.js)) which contains the `title`, `price` and `inventory_count` of the items.

## Extra Credit

Before tackling the extra credit tasks, I did some refactoring and moved the resolvers into separate files to make my API development process more modular. I also used a utility called [Nodemon](https://nodemon.io/) to make it easier to start my server upon making any new changes.

I then implemented shopping cart functionality which includes:

- creating a cart
- adding products to a cart
- completing a cart
    - I removed the ability to purchase a product (from the basic requirements) because completing a cart is the new way to make a purchase.

## Extra Extra Credit

I really do want my application to shine.

### GraphQL

I had been reading up on GraphQL and was actively looking for some inspiration to begin using it; this project was the perfect fit. I implemented basic queries and mutations to fulfill the requirements of this project. Read more about it [here](./GRAPHQL.md).

### Security

To make my API more secure, I added user authentication and some error handling to deal with invalid requests. Read more about it [here](./SECURITY.md).

### Testing

I used a library called [Jest](https://jestjs.io/) to test my API. For the sake of the demonstration, I only created two basic unit tests: one to verify that you can fetch a product, and the other to verify if the `inStock` parameter works. More unit tests can easily be added later. Read more about it [here](./TESTING.md).

### Documentation

I wrote a lot of documentation - and I hope it doesn't suck.

