import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';

import DisplayError from './DisplayError';

import { ALL_PRODUCTS_QUERY } from './products/Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Shoes',
    price: 3434,
    description: 'These are the best shoes!',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: ALL_PRODUCTS_QUERY,
        },
      ],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputFields to the backend:
        await createProduct();
        clearForm();
        // Go to product's page
        const productId = data?.createProduct?.id;
        Router.push({
          pathname: `/product/${productId}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
