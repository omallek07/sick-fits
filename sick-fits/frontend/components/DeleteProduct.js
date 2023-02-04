import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// Automatically remove product from UI
function updateCache(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update: updateCache,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => window.alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};
