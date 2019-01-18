const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

// define resolvers
const resolvers = {
    Query,
    Mutation
};

// server configuration
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

// start the server
server.start(() => console.log(`${Date()} - the server is now running on http://localhost:4000/`));