import cartImg from "/assets/images/icon-add-to-cart.svg";
const AddToCartBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white absolute cursor-pointer hover:border-red hover:text-red transition-colors duration-300 -bottom-6 left-[50%] flex w-60 -translate-x-[50%] items-center justify-center rounded-full px-5 lg:px-3 py-3 lg:py-2 xl:px-5 xl:py-3 gap-3 border text-lg lg:text-base xl:text-lg font-bold text-black lg:w-40 xl:w-60"
    >
      <img src={cartImg} alt="cart-img"  />
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
