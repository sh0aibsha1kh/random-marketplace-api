const { GraphQLServer } = require('graphql-yoga');
const MOCK_DATA = require('../mock_data/product_list.js');

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
    },
    Mutation: {
        purchase: (parent, args) => {

            for (let i = 0; i < listOfProducts.length; i++) {
                if (listOfProducts[i].title === args.productName) {
                    if (listOfProducts[i].inventory_count > 0) {
                        listOfProducts[i].inventory_count -= 1;
                        return listOfProducts[i];
                    } else {
                        throw new Error('Sorry, this item is out of stock.');
                    }
                }
            }
            throw new Error('This item does not exist.');
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`${Date()} - the server is now running on http://localhost:4000/`));