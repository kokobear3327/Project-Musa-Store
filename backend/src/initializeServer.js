const { GraphQLServer } = require('graphql-yoga');
const ChangeData = require('./resolvers/ChangeData');
const GetData = require('./resolvers/GetData');
const db = require('./db');

// Do Yoga:

function initializeServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            ChangeData,
            GetData
    },
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({ ...req, db }),    
    });
}

module.exports = createServer;