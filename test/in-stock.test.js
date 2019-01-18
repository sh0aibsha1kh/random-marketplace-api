const { request } = require('graphql-request');

const host = "http://localhost:4000";

const query = `
query {
    getAllProducts(inStock: true) {
        inventory_count
    }
}`;

test('only fetch products that are in stock', async () => {
    const response = await request(host, query);
    let inStock = true;
    for (let i = 0; i < response.getAllProducts.length; i++) {
        if (response.getAllProducts[i].inventory_count === 0)  {
            inStock = false;
        }
    }
    expect(inStock).toBe(true);
});

