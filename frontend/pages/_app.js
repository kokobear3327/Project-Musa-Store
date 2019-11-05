import App, { Container } from 'next/app'
import Page from '../components/Page'
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

// Reminder: const destructuring syntax below makes it effectively this.props.apollo
//   getInitialProps is a special next.js lifecycle method:  
//     It crawls for any mutations that need fetching and makes pageProps 'work'
//   If you don't wrap the app in the apollo provider, you get client errors, much like provider
//   in redux.
class MyApp extends App {
    static async getInitialProps({ Component, ctx}) {
        let pageProps = {}; 
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user
        pageProps.query = ctx.query
        return { pageProps };
    }
    render() {
    const { Component, apollo, pageProps } = this.props;
    
    return (
        <Container>
            <ApolloProvider client={apollo}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        </Container>
        )
    }
}
// So withData makes the apollo client accessible
export default withData(MyApp);