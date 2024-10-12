/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import starIcon from "../../../public/Icons-images/SVG/star.svg";
// import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  setItemsAndQuantity,
  removeItem,
  setItemQuantity,
} from "../../store/cartDataSlice";
import toast from "react-hot-toast";

function ProductListingCard({ product }) {
  const soldOut = product.availabilityStatus !== "In Stock";
  const reviewCount = useMemo(() => Math.ceil(Math.random() * 1000), []);
  const dispatch = useDispatch();
  const itemQuantity = useSelector((state) => state.cartData.productQuantity);
  const quantity = itemQuantity[product.id] || 0;

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

  useEffect(() => {
    if (!itemQuantity[product.id]) {
      setQuantity(0);
    }
  }, [dispatch, product.id, itemQuantity]);

  // const handleSelection = (e) => {
  //   if (e.target.checked) {
  //     toast.success("Product Added to Cart");
  //     setQuantity(1);
  //     dispatch(setItemsAndQuantity({ ...product, quantity: 1 }));
  //   } else {
  //     dispatch(removeItem(product.id));
  //     setQuantity(0);
  //   }
  // };

  const handleNotification = () => {};
  const handleAddToCart = () => {
    if (soldOut) {
      toast.success("You will be notified on stock availability");
      handleNotification();
    } else {
      toast.success("Product Added to Cart");
      setQuantity(1);
      dispatch(setItemsAndQuantity({ ...product, quantity: 1 }));
    }
  };

  return (
    <main className="p-4 border-borderColor border rounded-[8px] flex relative flex-col h-full group">
      <div className="flex justify-center items-center mb-2">
        <img
          className="group-hover:scale-105 mb-2 transition-all duration-150 ease-in-out w-[150px] h-[150px] object-cover"
          src={product.thumbnail}
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
            !quantity ? "hidden" : ""
          } grid grid-cols-3 items-center flex-1 justify-between border-borderColor border rounded-md`}
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
        <button
          onClick={handleAddToCart}
          className={`${quantity ? "hidden" : ""} ${
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
      {/* <label
        className={`${
          quantity ? "bg-primaryColor grid place-items-center" : "hidden"
        } absolute ${
          soldOut ? "" : "group-hover:block"
        }  top-4 h-5 w-5 px-[2px] border-2 rounded-[4px] border-primaryColor cursor-pointer`}
        htmlFor={`${"checkbox " + product.id}`}
      >
        {quantity > 0 && <FaCheck className="text-white w-3" />}
      </label>

      <input
        onChange={handleSelection}
        id={`${"checkbox " + product.id}`}
        type="checkbox"
        className="hidden"
      /> */}
    </main>
  );
}

export default ProductListingCard;
