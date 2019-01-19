# GraphQL

While designing the schema for this API, it was important to understand how the different objects interacted with eachother.

## Objects

### `Product`

Every `Product` **must** have a `title`, `price`, and `inventory_count` according to the challenge instructions.

### `Cart`

Every `Cart` **must** have a list of `productsInCart` and a `totalAmount` to keep track of the total price of all the items in the cart.

### `User`

Every `User` **must** have a unique `id`, a unique `username`, and a `password`. Additionally, a `User` may or may not have a `Cart`.

### `AuthPayload`

Every `AuthPayload` can have an associated `user`, a `message` to relay important information about authentication, and a JSON web `token` to help with user session management.

### `TransactionConfirmation`

Every `TransactionConfirmation` **must** have a `message` to communicate transaction-related information, as well as a list of `purchasedProducts` that were successfully purchased upon cart completion.

## Queries

### `getAllProducts(inStock: Boolean)`

This query fetches a list of all products that are available in the marketplace. You can optionally add the `(inStock: true)` parameter to only fetch products that have `inventory_count > 0`.

### `getProductByTitle(title: String!)`

This query fetches a specific product based on the title passed in. If no such product exists, it returns an empty list.

### `getProductsByPriceRange(min: Float!, max: Float!)`

This query fetches a list of products that have prices in between the `min` and `max` values specified.

### `getCart`

This query fetches the current user's `Cart` (if it exists).

## Mutations

### `createCart`

This mutation allows a currently logged in `User` to create a `Cart` if one doesn't already exist.

### `addProductToCart(title: String!)`

This mutation allows a currently logged in `User` to add a specific `Product` to an existing `Cart`.

### `completeCart`

This mutation finalizes the transaction by reducing the `inventory_count` of each `Product` in the `Cart`. If a `Product` happens to be out of stock, then every `Product` in the `Cart` will be "put back".

### `signUp(username: String!, password: String!)`

This mutation registers a new `User` if the `username` doesn't already exist. The `User`'s password is encrypted.

### `logIn(username: String!, password: String!)`

This mutation allows a registered `User` to log in.

### `logOut`

This mutation allows a currently logged in `User` to log out.
