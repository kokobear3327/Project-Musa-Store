import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item'

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            largeImage
        }
    }
`;

// Centers the items
const Center = styled.div`
    text-align: center;
`
const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`

// So you give yourself a query component where the ONLY child of it must be a function
// Your also destructuring the payload into data, error, and loading.  Alternative is to do payload.error
// This is good error handling, else you will get hard to debug errors like cannot return property of undefined
export default class Items extends Component {
  render() {
    return (
      <Center>
        <p>Items!</p>
        <Query query={ALL_ITEMS_QUERY}>
            {({data, error, loading}) => {
                if(loading) return <p>Loading...</p>
                if(error) return <p>Error: {error.message}</p>
                console.log(data);
                return 
                <ItemsList>{data.items.map(item => <Item item={item} key={item.id} />)}</ItemsList>
        
            }}
        </Query>
      </Center>
    );
  }
}

export { ALL_ITEMS_QUERY };