import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({
        query: PAGINATION_QUERY,
      });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // IF
      /// There are items
      /// AND there are not enough items to
      /// satisfy how many were requested
      /// AND we are on the last page then just SEND it
      if (items.length && items.length.length !== first && page === pages) {
        return items;
      }

      // If no items
      if (items.length !== first) {
        // We do not have any items and must go to network to fetch.
        return false;
      }

      // Else, return items from cache
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Going to send them to apollo`
        );
        return items;
      }

      // Fallback to network
      return false;
      // First thing it does is ask the read function for those items
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      // This runs when Apollo client comes back from the network with our product
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i + 1) {
        merged[i] = incoming[i - skip];
      }

      // Returns merged cache back to read function
      return merged;
    },
  };
}
