import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';



export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })
  }

  // Note the double curly braces below...the first set denotes reference and the second is the actual object itself.
  // The item.image && is saying if there is an item.image, then show it...how the logic works out 👍Alternative to ternary op
  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
        <Title>
            <Link href={{
                pathname: './item',
                query: { id: item.id },
            }}>
                <a>{item.title}</a>
            </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList"></div>
            <Link href={{
                pathname: "update",
                query: { id: item.id}
            }}>
                <a>Edit ✍️ </a>
            </Link>
            <button>Add to Cart</button>
            <button>Delete</button>
      </ItemStyles>
    )
  }
}
