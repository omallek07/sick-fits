import Link from 'next/link';
import PropTypes from 'prop-types';

import React from 'react';
import ProductStyles from './ProductStyles';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';

import formatMoney from '../../lib/formatMoney';
import DeleteProduct from '../DeleteProduct';

export default function Product({ product }) {
  const { id, name, photo, price, description } = product;

  const imageUrl = photo?.image?.publicUrlTransformed;

  return (
    <ProductStyles>
      <img src={imageUrl} alt={name} />
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ProductStyles>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.object,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
