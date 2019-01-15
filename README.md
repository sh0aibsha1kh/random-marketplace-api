# Shopify Marketplace API

This API was built for Shopify's Developer Intern Challenge. It was built with Node.js and GraphQL.

## Documentation

### Shopify Marketplace API Documentation

Once you launch the server and access the page (http://localhost:4000), all of the API documentation will be available by clicking the green **SCHEMA** button on the right.

![alt text][schema]

A tutorial on sample end-to-end flows of the application can be seen below.

### Additional Documentation

Check out the additional documentation for more information and further discussion:
- [PROCESS.md][process_doc] - describes the process of how this API was built from the very beginning, *including* all the mistakes that were made
- [GRAPHQL.md][graphql_doc] - summarizes how the schema was designed, and how the resolvers were implemented
- [SECURITY.md][security] - outlines the security measures implemented in the API
- [TESTING.md][testing] - focuses on testing of the API to ensure robustness

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

## Testing

## Next Steps
- API
    - Connect to a database
- Users
    - Support multiple active logged in sessions
    - View order history
    - Add a wishlist
- Products
    - Add a rating system
    - Add more descriptive fields (category, seller, etc)
- Carts
    - Add functionality to *hold* an item while it is in your cart
    - Retain cart content upon logging out and logging back in

<!-- IMAGES -->
[schema]: documentation/schema_button.png

<!-- DOCUMENTS -->
[process_doc]: documentation/PROCESS.md
[graphql_doc]: documentation/GRAPHQL.md
[security]: documentation/SECURITY.md
[testing]: documentation/TESTING.md

<!-- LINKS -->
