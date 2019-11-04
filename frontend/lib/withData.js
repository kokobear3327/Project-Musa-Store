// This has all of the standard things you would want to use.  Apollo Boost includes apollo-client
import ApolloClient from 'apollo-boost';
// withApollo then exposes what in the client database provided by apollo-boost via a prop...helps with server-side rendering
import withApollo from 'next-with-apollo';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

// The credentials include logs the cookies for the request...so if your already logged in
// Headers are for our authentication.
function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            //read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log(cartOpen)
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: true
      },
    },
  });
}

export default withApollo(createClient);
