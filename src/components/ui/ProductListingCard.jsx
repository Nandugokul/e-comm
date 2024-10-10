/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import starIcon from "../../../public/Icons-images/SVG/star.svg";
function ProductListingCard({ product }) {
  const soldOut = useMemo(() => Math.random() < 0.2, []);
  const reviewCount = useMemo(() => Math.ceil(Math.random() * 100), []);
  const [itemNumber, setItemNumber] = useState(0);

  const handleItemChange = (add) => {
    add ? setItemNumber((prev) => prev + 1) : setItemNumber((prev) => prev - 1);
  };

  const handleNotification = () => {};
  const handleAddToCart = () => {
    soldOut ? handleNotification() : handleItemChange(true);
  };

  return (
    <main className="p-4 border-borderColor border rounded-[8px] flex relative flex-col h-full group">
      <div className="flex justify-center items-center mb-2">
        <img
          className="group-hover:scale-105 transition-all duration-150 ease-in-out w-[150px] h-[150px] object-cover"
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="space-y-4 flex-grow">
        <div className="space-y-2">
          <h6>{product.title}</h6>
          <div className="flex space-x-2 items-center">
            <div className="flex space-x-1 items-center bg-selectBG px-1 rounded-[4px] ">
              <img src={starIcon} className="w-3" alt="stars" />
              <small>{product.rating.toFixed(1)}</small>
            </div>
            <small className="text-gray-500">{reviewCount} reviews</small>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2 mt-4">
        <h2 className={`font-semibold flex-1 `}>${product.price}</h2>
        <div
          className={`${
            !itemNumber ? "hidden" : ""
          } grid grid-cols-3 items-center flex-1 justify-between border-borderColor border rounded-md`}
        >
          <button
            className="py-2 text-center hover:bg-selectBG"
            onClick={() => handleItemChange(false)}
          >
            -
          </button>
          <div className="text-center">{itemNumber}</div>
          <button
            className="py-2 text-center hover:bg-selectBG"
            onClick={() => handleItemChange(true)}
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className={`${itemNumber ? "hidden" : ""} ${
            !soldOut
              ? "bg-primaryColor text-white"
              : "bg-white text-primaryColor"
          } py-2  text-my14 font-semibold flex-1 flex items-center justify-center rounded-md border-primaryColor border`}
        >
          {soldOut ? "Notify" : "Add to Cart"}
        </button>
      </div>

      {soldOut && (
        <small className="absolute top-4 right-4 rounded-md px-4 py-1 bg-selectBG text-[12px]">
          Sold Out
        </small>
      )}
    </main>
  );
}

export default ProductListingCard;
