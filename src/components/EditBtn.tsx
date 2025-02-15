import incrementImg from "/assets/images/icon-increment-quantity.svg";
import decrementImg from "/assets/images/icon-decrement-quantity.svg";
interface PropsType {
  number: number;
  increment: () => void;
  decrement: () => void;
}

const EditBtn = ({ number, increment, decrement }: PropsType) => {
  return (
    <div className="bg-red absolute -bottom-6 left-[50%] flex w-60 -translate-x-[50%] items-center justify-between rounded-full px-5 py-3 text-lg font-bold text-white lg:w-40 xl:w-60">
      <button
        onClick={decrement}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white transition-transform duration-300 hover:scale-110"
      >
        <img src={decrementImg} alt="decrement-img" className="w-4" />
      </button>
      <span className="w-10 text-center">{number}</span>
      <button
        onClick={increment}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white transition-transform duration-300 hover:scale-110"
      >
        <img src={incrementImg} alt="increment-img" className="w-4" />
      </button>
    </div>
  );
};

export default EditBtn;
