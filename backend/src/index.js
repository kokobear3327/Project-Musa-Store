require('dotenv').config({ path: 'environmentVariables.env'})
const initializeServer = require('initializeServer')
const db = require('./db')

const server = initializeServer();

// For Later: use express middleware to handle cookies (jwt)
// For Later: use express middleware to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, 
details => { console.log('Server is not running on port http:/localhost:${details.port}');
    }
);