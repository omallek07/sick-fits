import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { SearchStyles, DropDown, DropDownItem} from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          {
            name: {
              contains: $searchTerms
            }
          },
          {
            description: {
              contains: $searchTerm
            }
          },
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache'
  });

  const items = data?.seachTerms || [];
  const debounceSearch = debounce(findItems, 350);
  resetIdCounter();
  
  const { 
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen
  } = useCombobox({
    items,
    onInputValueChange() {
      debounceSearch({
        variables: {
          searchTerm: inputValue
        }
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`
      })
    },
    itemToString: item => item?.name || ''
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input {...getInputProps({
          type: 'search',
          placeholder: 'Search for an Item',
          id: 'search',
          className: loading ? 'loading': '',
        }) } />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && items.map((item, index) => (
          <DropDownItem key={item.id} {...getItemProps({ item })} highlighted={index === highlightedIndex}>
            <img 
              src={item.photo.image.publicUrlTransformed}
              alt={item.name} 
              width="50"
            />
            {item.name}
          </DropDownItem>
        ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles> 
  ) 
}