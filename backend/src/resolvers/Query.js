// Remember, if you do not make the query async, it defaults to returning a promise

// Also the whole (parent, args, ctx, info) is the standard boiler plate for graphQL!

// If your query is the same here( Yoga ) as it is in prisma.graphql, you don't need
//   to write all of this 😆 You need to import the forwardTo from prisma-binding, 
//   which gives you the ability to query the db.  It's saying, anytime someone 
//   queries our items, just use our db and the API on the server.  So just to 
//   reiterate, if you say forwardTo('db') as done below, you're replacing the async
//   items(parent, args, ctx, info) noise where you can still do query { items {etc}}
//   Summary:  When you want to add a new type, you add it to datamodel.graphql, you 
//   run prisma.deploy to push it up to the prisma service, that brings down a new 
//   copy of prisma.graphql (hence generated) (remember the hook).  Then you go into 
// your own schema.graphql to write custom logic.  

// The prisma binding gives you the ability to query your db.  You can use the same API
//   on the server as the client

const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
//   console.log("Query ran, getting items! 👍")
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // Check if there is a current user ID, if they don't have return null.  
    if (!ctx.request.userId) {
      return null;
    }
    // so if they pass the userID logic, then return them the request where the ctx matches the userId.
    // you gotta have info in there too for metadata of sorts, related to future queries.
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    console.log(ctx.request.userId);
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 2. if they do, query all the users!
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You arent logged in!');
    }
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    // 3. Check if the have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error('You cant see this buddd');
    }
    // 4. Return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },
};

module.exports = Query;
