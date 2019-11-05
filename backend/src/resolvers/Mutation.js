
// Any mutation here must map what you have in schema.graphql
const Mutation = {};

const Mutation = {
    createDog(parent, args, ctx, info) {
        // create a dog!
        console.log(args)
    }


};

module.exports = Mutation;
