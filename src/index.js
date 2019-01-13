const { GraphQLServer } = require('graphql-yoga');
const MOCK_DATA = require('../mock_data/product_list.js');

const typeDefs = `
type Query {
    getAllProducts(inStock: Boolean): [Product!]!
    getProductByTitle(title: String!): [Product]!
}
type Product {
    title: String!
    price: Float!
    inventory_count: Int!
}
`;

const listOfProducts = MOCK_DATA.productList;

const resolvers = {
    Query: {
        getAllProducts: (parent, args) => {
            if (args.inStock) {
                console.log('selected true');
                return listOfProducts.filter(product => product.inventory_count > 0);
            } else {
                return listOfProducts
            }
        },
        getProductByTitle: (parent, args) => {
            if (args.title) {
                return listOfProducts.filter(product => product.title === args.title);
            }
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`${Date()} - the server is now running on http://localhost:4000/`));