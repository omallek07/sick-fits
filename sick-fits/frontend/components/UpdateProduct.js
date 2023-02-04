import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './DisplayError';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  // 3. Need form to handle the update
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log('idddd', id);
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        // // Submit the inputFields to the backend:
        // await createProduct();
        clearForm();
        // // Go to product's page
        // const productId = data?.createProduct?.id;
        // Router.push({
        //   pathname: `/product/${productId}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
