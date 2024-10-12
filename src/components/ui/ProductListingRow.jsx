/* eslint-disable react/prop-types */

import { useMemo } from "react";
import starIcon from "../../../public/Icons-images/SVG/star.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  removeItem,
  setItemQuantity,
  setItemsAndQuantity,
} from "../../store/cartDataSlice";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
function ProductListingRow({ product }) {
  const reviewCount = useMemo(() => Math.ceil(Math.random() * 1000), []);
  const itemQuantity = useSelector((state) => state.cartData.productQuantity);
  const quantity = itemQuantity[product.id] || 0;
  const dispatch = useDispatch();
  const soldOut = product.availabilityStatus !== "In Stock";

  const setQuantity = (quantity) => {
    dispatch(setItemQuantity({ [product.id]: quantity }));
  };
  const handleQuantityChange = (add) => {
    if (!add && quantity === 1) {
      dispatch(removeItem(product.id));
      setQuantity(0);
    } else {
      add ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
      dispatch(changeQuantity({ method: add, productId: product.id }));
    }
  };

  const handleSelection = (e) => {
    if (e.target.checked) {
      toast.success("Product Added to Cart");
      setQuantity(1);
      dispatch(setItemsAndQuantity({ ...product, quantity: 1 }));
    } else {
      dispatch(removeItem(product.id));
      setQuantity(0);
    }
  };

  return (
    <section className="grid grid-cols-9  items-center p-4 border-b rounded-md">
      <div className="col-span-5 flex items-center space-x-5 ">
        <img
          className="group-hover:scale-105 transition-all duration-150 ease-in-out w-[100px] h-[100px] object-cover"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <div className=" max-w-48">
          <h6 className="font-semibold text-lg">{product.title}</h6>
        </div>
      </div>
      <div>
        <div className="flex space-x-1 items-center bg-selectBG px-1 mb-1 rounded-[4px] w-fit">
          <img src={starIcon} className="w-3" alt="stars" />
          <small>{product.rating.toFixed(1)}</small>
        </div>
        <small className="text-gray-500">{reviewCount} reviews</small>
      </div>
      <h2 className={`font-semibold`}>${product.price}</h2>
      <div
        className={` grid grid-cols-3 items-center w-fullljustify-between border-borderColor border rounded-md`}
      >
        <button
          className="py-2 text-center hover:bg-selectBG disabled:bg-gray-200"
          onClick={() => handleQuantityChange(false)}
        >
          -
        </button>
        <div className="text-center">{quantity}</div>
        <button
          className="py-2 text-center hover:bg-selectBG"
          onClick={() => handleQuantityChange(true)}
        >
          +
        </button>
      </div>
      <div className="flex items-center justify-end">
        <label
          className={`ms-4 grid  top-4 h-5 w-5 px-[2px] border-2 rounded-[4px] border-primaryColor cursor-pointer`}
          htmlFor={`${"checkbox " + product.id}`}
        >
          {<FaCheck className="text-white w-3" />}
        </label>

        <input
          onChange={handleSelection}
          id={`${"checkbox " + product.id}`}
          type="checkbox"
          className="hidden"
        />
      </div>
    </section>
  );
}

export default ProductListingRow;
