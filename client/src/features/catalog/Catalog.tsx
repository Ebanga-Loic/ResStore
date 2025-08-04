import ProductList from './ProductList';
import { useFetProductsQuery } from './catalogApi';

export default function Catalog() {
  const { data, isLoading } = useFetProductsQuery();

  if (isLoading || !data) return <h3>Loading...</h3>;

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
