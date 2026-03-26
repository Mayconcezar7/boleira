import { getProducts } from "../_actions/get-product";
import CardProduct from "../_components/cardProduct";
import Header from "../_components/header";
import Search from "../_components/search";

interface ParamsProps {
  searchParams: Promise<{
    name?: string;
    category?: string;
  }>;
}

const Products = async ({ searchParams }: ParamsProps) => {
  const { name, category } = await searchParams;

  const products = await getProducts({ name, category });

  return (
    <>
      <Header />
      <div className="px-6">
        <div className="mt-10 mb-7">
          <Search />
        </div>

        <div className="mt-3 mb-3 flex flex-col gap-3">
          <p className="text-amber-900">Resultados para "{name? name: category}"</p>
          {products.map((product) => (
            <CardProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
