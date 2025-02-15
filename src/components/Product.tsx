import { useEffect, useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { useAtom } from "jotai";
import { cartAtom } from "../cartAtom";
import EditBtn from "./EditBtn";

export interface ProductType {
  category: string;
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  name: string;
  price: number;
}
const Product = ({ category, image, name, price }: ProductType) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cart, setCart] = useAtom(cartAtom);

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const product = cart.products.find(
      (product) => product.product.name === name,
    );

    setIsInCart(!!product);
  }, [cart.products]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addToCart = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.products.find(
        (item) => item.product.name === name,
      );

      if (existingProduct) {
        return {
          ...prevCart,
          products: prevCart.products.map((item) =>
            item.product.name === name
              ? { ...item, number: item.number + 1 }
              : item,
          ),
        };
      }

      return {
        ...prevCart,
        products: [
          ...prevCart.products,
          { product: { category, image, name, price }, number: 1 },
        ],
      };
    });
  };

  const increment = () => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        products: prevCart.products.map((item) =>
          item.product.name === name
            ? { ...item, number: item.number + 1 }
            : item,
        ),
      };
    });
  };

  const decrement = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.products.find(
        (item) => item.product.name === name,
      );

      if (!existingProduct) return prevCart;

      if (existingProduct.number <= 1) {
        return {
          ...prevCart,
          products: prevCart.products.filter(
            (product) => product.product.name !== name,
          ),
        };
      }

      return {
        ...prevCart,
        products: prevCart.products.map((item) =>
          item.product.name === name
            ? { ...item, number: Math.max(item.number - 1, 0) }
            : item,
        ),
      };
    });
  };

  return (
    <div className="space-y-10">
      <div
        className={`relative transition-all duration-100 ease-in-out rounded-xl ${isInCart && "border-red border-4"}`}
      >
        <img
          className="rounded-lg object-cover"
          src={
            screenWidth <= 640
              ? image.mobile
              : screenWidth <= 1024
                ? image.tablet
                : image.desktop
          }
          alt={`${name}-img`}
        />
        {isInCart ? (
          <EditBtn
            number={
              cart.products.find((product) => product.product.name === name)
                ?.number ?? 0
            }
            increment={increment}
            decrement={decrement}
          />
        ) : (
          <AddToCartBtn onClick={addToCart} />
        )}
      </div>
      <div>
        <p className="text-lg text-rose-500">{category}</p>
        <strong className="text-xl">{name}</strong>
        <p className="text-red text-2xl font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default Product;
