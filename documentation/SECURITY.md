# Security

The most apparent form of security for this API is basic user authentication.

## User Authentication

In order to mutate any data in the API (create a cart, purchase a product, etc), the user must first create an account and log in.

For enhanced security, the password must be greater than 8 characters; other stronger password strength checks can easily be implemented in a future iteration.

A JSON web token is also created when a user signs up or logs in. This is to be implemented and used later for enhanced security.

## Unique IDs

Currently, IDs for objects are only implemented for users. Every user's ID is simply the timestamp when their account was created appended to their username. This ID is only unique 

Example: 

```
id: us3rn4me@1547946450435
```

Going forward, each object (`Products`, `Cart`, `User`, etc) will be given a UUID for better, non-predictable ID values.

## Errors

The API's current fix for invalid actions/queries/requests (trying to log out if no one is logged in, trying to create an account with an already existing username, trying to purchase a product that is out of stock, etc) is to throw an appropriate error.