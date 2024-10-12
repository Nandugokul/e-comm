/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import starIcon from "../../../../public/Icons-images/SVG/star.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  removeItem,
  setItemQuantity,
  setTotalPayable,
} from "../../../store/cartDataSlice";
import { IoIosClose } from "react-icons/io";

function CartProductListingCard({ product }) {
  const reviewCount = useMemo(() => Math.ceil(Math.random() * 1000), []);
  const dispatch = useDispatch();
  const itemQuantity = useSelector((state) => state.cartData.productQuantity);
  const quantity = itemQuantity[product.id] || 0;
  const [subTotal, setSubTotal] = useState(0);
  const setQuantity = (quantity) => {
    dispatch(setItemQuantity({ [product.id]: quantity }));
    dispatch(setTotalPayable());
  };

  const handleProudctRemove = () => {
    dispatch(removeItem(product.id));
  };

  useEffect(() => {
    setSubTotal((product.price * quantity).toFixed(2));
    dispatch(setTotalPayable());
  }, [quantity, product.price, dispatch]);

  const handleQuantityChange = (add) => {
    if (!add && quantity === 1) {
      dispatch(removeItem(product.id));
      dispatch(setTotalPayable());
      setQuantity(0);
    } else {
      add ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
      dispatch(changeQuantity({ method: add, productId: product.id }));
    }
  };

  return (
    <tr className="border-b border-borderColor">
      <td className="flex space-x-4 items-center py-4">
        <img
          className="group-hover:scale-105 transition-all duration-150 ease-in-out w-[72px] h-[72px] object-cover"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <div className="space-y-1">
          <h6>{product.title}</h6>
          <div className="flex space-x-2 items-center">
            <div className="flex space-x-1 items-center bg-selectBG px-1 rounded-[4px] ">
              <img src={starIcon} className="w-3" alt="stars" />
              <small>{product.rating.toFixed(1)}</small>
            </div>
            <small className="text-gray-500">{reviewCount} reviews</small>
          </div>
          <h2 className={`font-semibold flex-1 `}>${product.price}</h2>
        </div>
      </td>
      <td className="w-[150px]">
        <div
          className={`max-w-[100px] grid grid-cols-3 items-center flex-1 justify-between border-borderColor border rounded-md`}
        >
          <button
            className="py-2 text-center hover:bg-selectBG"
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
      </td>
      <td className="font-semibold text-end">
        <div className="flex items-center justify-end space-x-4">
          <div>${subTotal}</div>
        </div>
      </td>
      <td>
        <button
          className="ms-6 flex items-center"
          onClick={handleProudctRemove}
        >
          <IoIosClose className="text-slate-500 text-lg" />
        </button>
      </td>
    </tr>
  );
}

export default CartProductListingCard;
