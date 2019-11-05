import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

// Need to add a method on our createitem component that is going to handle the uploading of all of our images

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
            $title: String!
            $description: String!
            $price: Int!
            $image: String
            $largeImage: String
        ) {
            createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

export default class CreateItem extends Component {
    state = {
        title: 'Type your title here',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
    };
    handleChange = (event) => {
        console.log( { name, type, value } );
        const { name, type, value } = event.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val})
    };

    // Here is the method to connect with Cloudinary
    // Whenever someone selects an input item from the box, it triggers this method 

    uploadFile = async (e) => {
        console.log('uploading file...')
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset','projectmusa');

        const res = await fetch('https://api.cloudinary.com/v1_1/project-musa/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    };

    // Only in React can you have a self closing text area tag.  Also htmlFor is for but for react.
    // Just like query, the only child of a mutation can be a function
    // The fieldset disabled means that if its loading, it will be greyed out
    // The aria-busy does the animation bar for us, edit this in the form.js file wher ethe animation is applied
    // This is one of the advantages of Apollo, it flips the loading states on and off such that we don't have to use booleans.
  render() {
    return (
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
            {(createItem, { loading, error }) => (
      <Form 
        onSubmit={async e => {
            e.preventDefault();
            console.log(this.state);
            const res = await createItem();
            // change item to the single item page
            console.log(res);
            Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
            });
        }}
  >
        <Error error={error} />
        {/* So if loading is true, it will be disabled and greyed out */}
        <fieldset disabled={loading} aria-busy={true}>
  <br></br>
            <label htmlFor="title">
            Title 
            <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Title" 
                required 
                value={this.state.title}
                onChange={this.handleChange}
                />
            </label>
            <br></br>
            <label htmlFor="price">
            Price 
            <input 
                type="number" 
                id="price" 
                name="price" 
                placeholder="Price" 
                required 
                value={this.state.price}
                onChange={this.handleChange}
                />
            </label>
            <br></br>
            <label htmlFor="description">
            Description 
            <textarea 
                type="number" 
                id="description" 
                name="description" 
                placeholder="Describe the item" 
                required 
                value={this.state.description}
                onChange={this.handleChange}
                />
                </label>

                <label htmlFor="file">
        Image 
        <input 
            type="file" 
            id="file" 
            name="file" 
            placeholder="Upload PNG or JPEG" 
            required 
            onChange={this.uploadFile}
            />
            {this.state.image && (
            <img width="200" src={this.state.image} 
            alt="Upload Preview" />
            )}
        </label>


                <button type="submit">Submit</button>
            </fieldset>
        </Form>
      )}
      </Mutation>
    );
  }
}

export { CREATE_ITEM_MUTATION }