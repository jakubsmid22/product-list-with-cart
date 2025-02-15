import { useAtom } from "jotai";
import { cartAtom, cartTotalAtom } from "../cartAtom";
import removeImg from "/assets/images/icon-remove-item.svg";
import carbonImg from "/assets/images/icon-carbon-neutral.svg";
import { useState } from "react";
import OrderConfirmContainer from "./OrderConfirmContainer";
import emptyImg from "/assets/images/illustration-empty-cart.svg";

const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [total] = useAtom(cartTotalAtom);
  const [confirmed, setConfirmed] = useState(false);

  const removeProduct = (name: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.filter(
        (product) => product.product.name !== name,
      ),
    }));
  };

  const startNewOrder = () => {
    setConfirmed(false);
    setCart({ products: [] });
  };

  return (
    <>
      {confirmed && <OrderConfirmContainer startNewOrder={startNewOrder} />}
      <div className="space-y-5 rounded-xl bg-white p-5">
        <p className="text-red text-3xl font-bold">
          Your Cart ({cart.products.length})
        </p>

        {cart.products.length > 0 ? (
          <div className="space-y-5">
            {cart.products.map((product) => (
              <div className="flex flex-col gap-2" key={product.product.name}>
                <strong className="text-lg">{product.product.name}</strong>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 text-lg">
                    <div className="text-red font-bold">{product.number}x</div>
                    <div className="space-x-2">
                      <span className="text-rose-500">
                        @ ${product.product.price}
                      </span>
                      <span>${product.product.price * product.number}</span>
                    </div>
                  </div>
                  <div
                    onClick={() => removeProduct(product.product.name)}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-rose-500"
                  >
                    <img src={removeImg} alt="remove-img" className="w-4" />
                  </div>
                </div>
                <hr className="text-rose-300 opacity-50" />
              </div>
            ))}
            <div className="flex justify-between">
              <p className="text-lg">Order Total</p>
              <strong className="text-3xl">${total}</strong>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-50 py-4">
                <img src={carbonImg} alt="carbon-img" className="w-8 lg:hidden 2xl:block" />
                <p className="text-center">
                  This is a <strong>carbon-neutral delivery</strong>
                </p>
              </div>
              <button
                onClick={() => setConfirmed(true)}
                className="bg-red hover:bg-red-900 transition-colors duration-300 w-full cursor-pointer rounded-full py-4 font-bold text-white"
              >
                Confirm Order
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <img src={emptyImg} alt="emptyImg" className="w-40" />
            <p className="text-rose-500 font-semibold text-center text-xl" >Your added items will appear here</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
