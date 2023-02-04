import { useRouter } from 'next/router';
import Products from '../../components/products/Products';
import Pagination from '../../components/Pagination';

export default function ProductPage() {
  const { query } = useRouter();
  const page = query.page ? parseInt(query.page) : 1;
  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}
