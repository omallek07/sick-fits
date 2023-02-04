import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './DisplayError';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item: Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  const { item } = data;

  const { name, description, photo } = item;

  console.log('item', item);

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.image.altText} />
      <h2>{name}</h2>
      <p>{description}</p>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
