require('dotenv').config({ path: 'environmentVariables.env'})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer();

// For Later: use express middleware to handle cookies (JWT)
// For Later: use express middleware to populate current user

// The origin FRONTEND_URL is saying only the frontend can access it.
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, 
serverDetails => { console.log(`Server is now running on port http:/localhost:${serverDetails.port}`);
    }
);