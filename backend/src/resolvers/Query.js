// Anytime you have a request it gives you a signature of these 4 different variables:   Parent schema
//   as parent, arguments as args, ctx that you defined earlier, and info around graphql query as info
//   

const Query = {
    dogs(parent, args, ctx, info) {
        return [{ name: 'Snickers'}, {name: 'Sunny'}];

    }

};

module.exports = Query;
