import { useState } from "react";
import starIcon from "/Icons-images/SVG/whiteStar.svg";

function CartProductListingCard() {
  const [itemNumber, setItemNumber] = useState(0);

  const handleItemChange = (add) => {
    add ? setItemNumber((prev) => prev + 1) : setItemNumber((prev) => prev - 1);
  };
  return (
    <tr className="border-b border-borderColor">
      <td className="flex space-x-4 items-center py-4">
        <img
          className="group-hover:scale-105 transition-all duration-150 ease-in-out w-[72px] h-[72px] object-cover"
          // src={product.images[0]}
          // alt={product.title}
          loading="lazy"
        />

        <div className="space-y-1">
          <h6>Name</h6>
          <div className="flex space-x-2 items-center">
            <div className="flex space-x-1 items-center bg-green-700 px-1 rounded-[4px] text-white">
              <img src={starIcon} className="w-3" alt="stars" />
              <small>600</small>
            </div>
            <small className="text-gray-500">500 reviews</small>
          </div>
          <h2 className={`font-semibold flex-1 `}>$200</h2>
        </div>
      </td>
      <td className="w-[150px]">
        <div
          className={`max-w-[100px] grid grid-cols-3 items-center flex-1 justify-between border-borderColor border rounded-md`}
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
      </td>
      <td className="font-semibold text-end">$200</td>
    </tr>
  );
}

export default CartProductListingCard;
