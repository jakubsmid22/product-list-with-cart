import data from "../data.json";
import Product from "./Product";
const ProductGrid = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Desserts</h1>
      <div className="grid grid-rows-3 gap-10 justify-center lg:grid-cols-3">
        {data.map((product) => (
          <Product key={product.name} {...product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
