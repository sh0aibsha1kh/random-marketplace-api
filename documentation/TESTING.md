# Testing

Some very basic unit tests have been set up to test the API. More unit tests can just as easily be added later.

While the server is running on http://localhost:4000/, enter the following command in the terminal:
```
npm test
```

This will run two unit tests that verify if the API can:
- fetch a specific product by title
- fetch only products that are in stock
