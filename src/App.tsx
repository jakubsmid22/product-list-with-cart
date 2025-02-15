import Cart from "./components/Cart";
import ProductGrid from "./components/ProductGrid";

const App = () => {
  return (
    <div className="font-red-hat-text max-w-[1500px] flex min-h-screen flex-col justify-center gap-10 p-7 text-rose-900 lg:flex-row lg:items-start">
      <div className="lg:w-[80%] space-y-7">
        <ProductGrid />
      </div>
      <div className="lg:w-[20%]">
        <Cart />
      </div>
    </div>
  );
};

export default App;
