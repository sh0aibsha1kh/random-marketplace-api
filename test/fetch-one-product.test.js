const { request } = require('graphql-request');

const host = "http://localhost:4000";
const query = `
query {
    getProductByTitle(title: "pants") {
        title
    }
}`;

const expected = {
    "getProductByTitle": [
        {
            "title": "pants"
        }
    ]
}

test('fetch pants', async () => {
    const response = await request(host, query);
    expect(response).toEqual(expected);
});

