import { atom } from "jotai";
import { ProductType } from "./components/Product";

interface CartType {
  products: {
    product: ProductType;
    number: number;
  }[];
}

const cartAtom = atom<CartType>({
  products: [],
});

const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.products.reduce(
    (sum, { product, number }) => sum + product.price * number,
    0,
  );
});

export { cartAtom, cartTotalAtom };
