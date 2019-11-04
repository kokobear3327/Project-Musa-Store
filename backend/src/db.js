// So this is how we connect to the remote prisma DB and query it with JS
const { prisma } = require('prisma-binding');

const db = new prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
})

module.exports = db;