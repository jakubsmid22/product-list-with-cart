import { useEffect, useState } from "react";
import Modal from "react-modal";
import confirmedImg from "/assets/images/icon-order-confirmed.svg";
import { useAtom } from "jotai";
import { cartAtom, cartTotalAtom } from "../cartAtom";

const customStyles = {
  content: {
    top: "10%",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
};

const stylesDesktop = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "650px",
    borderRadius: "15px",
    maxHeight: window.innerHeight,
  },
};

Modal.setAppElement("#root");

const OrderConfirmContainer = ({
  startNewOrder,
}: {
  startNewOrder: () => void;
}) => {
  const [modalIsOpen] = useState(true);
  const [, setScreenWidth] = useState(window.innerWidth);
  const [cart] = useAtom(cartAtom);
  const [total] = useAtom(cartTotalAtom);
  const [modalStyles, setModalStyles] = useState<{ content: any }>(
    customStyles,
  );

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setModalStyles(newWidth > 1024 ? stylesDesktop : customStyles);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        ...modalStyles,
        content: {
          ...modalStyles.content,
          border: "none",
        },
      }}
      contentLabel="Example Modal"
    >
      <div className="h-full w-full space-y-10 p-7">
        <img src={confirmedImg} alt="confirmed-img" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Order Confirmed</h1>
          <p className="text-xl text-rose-500">We hope you enjoy your food!</p>
          <div className="space-y-5 rounded-xl bg-rose-50 p-7">
            <div className="space-y-5">
              {cart.products.map((product) => (
                <>
                  <div key={product.product.name}>
                    <div className="flex gap-5">
                      <img
                        className="w-16 rounded-md"
                        src={product.product.image.thumbnail}
                        alt=""
                      />

                      <div className="flex w-full items-center justify-between">
                        <div>
                          <strong>{product.product.name}</strong>

                          <div className="space-x-5">
                            <span className="text-red text-lg font-bold">
                              {product.number}x
                            </span>
                            <span className="text-rose-500">
                              @ ${product.product.price}
                            </span>
                          </div>
                        </div>

                        <strong className="text-2xl">
                          ${product.number * product.product.price}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <hr className="text-rose-300 opacity-50" />
                </>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-rose-500">Order Total</p>
              <strong className="text-4xl">${total}</strong>
            </div>
          </div>
        </div>
        <button
          onClick={startNewOrder}
          className="bg-red w-full cursor-pointer rounded-full py-4 font-bold text-white transition-colors duration-300 hover:bg-red-900"
        >
          Start New Order
        </button>
      </div>
    </Modal>
  );
};

export default OrderConfirmContainer;
