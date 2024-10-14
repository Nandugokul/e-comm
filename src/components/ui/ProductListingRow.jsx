/* eslint-disable react/prop-types */

import { useEffect, useMemo } from "react";
import starIcon from "../../../public/Icons-images/SVG/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import {
  addToTempProductList,
  removeFromTempProductList,
  setTempListFromCart,
  setTempListQuantity,
} from "../../store/productDataSlice";
import toast from "react-hot-toast";
function ProductListingRow({ product }) {
  const reviewCount = useMemo(() => Math.ceil(Math.random() * 1000), []);
  const quantity = useSelector(
    (state) => state.productData.tempProductListQuantity[product.id] || 0
  );
  const cartItems = useSelector(
    (state) => state.cartData.selectedItemsAndQuantity
  );
  const dispatch = useDispatch();
  const cartItemQuantity = useSelector(
    (state) => state.cartData.productQuantity
  );
  const soldOut = product.availabilityStatus !== "In Stock";

  useEffect(() => {
    dispatch(
      setTempListFromCart({ quantity: cartItemQuantity, product: cartItems })
    );
  }, []);

  const handleSelectionChange = (event) => {
    if (event.target.checked) {
      dispatch(addToTempProductList(product));
      dispatch(
        setTempListQuantity({
          id: product.id,
          quantity: 1,
          product: product,
        })
      );
    } else {
      dispatch(removeFromTempProductList(product.id));
      dispatch(
        setTempListQuantity({
          id: product.id,
          quantity: 0,
          product: product,
        })
      );
    }
  };

  const handleQuantityChange = (add) => {
    const newQuantity = add ? quantity + 1 : quantity > 0 ? quantity - 1 : 0;

    dispatch(
      setTempListQuantity({
        id: product.id,
        quantity: newQuantity,
        product: product,
      })
    );
  };

  return (
    <section className="grid grid-cols-9 md:grid-cols-8  items-center p-4 border-b rounded-md gap-2">
      <div className="col-span-full md:col-span-4 flex items-center space-x-5">
        <img
          className="group-hover:scale-105 transition-all duration-150 ease-in-out w-[100px] h-[100px] object-cover"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <div className="md:max-w-48">
          <h6 className="font-semibold text-lg">{product.title}</h6>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <div className="flex space-x-1 items-center bg-selectBG px-1 mb-1 rounded-[4px] w-fit">
          <img src={starIcon} className="w-3" alt="stars" />
          <small>{product.rating.toFixed(1)}</small>
        </div>
        <small className="text-gray-500">{reviewCount} reviews</small>
      </div>
      <h2 className={`font-semibold col-span-2 md:col-span-1`}>
        ${product.price}
      </h2>
      {soldOut ? (
        <div className="text-center col-span-3 md:col-span-1">
          <div>----</div>
        </div>
      ) : (
        <div
          className={` grid  col-span-3 md:col-span-1 grid-cols-3 items-center w-fullljustify-between border-borderColor border rounded-md`}
        >
          <button
            disabled={quantity === 0}
            className="py-2 text-center hover:bg-selectBG "
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
      )}
      {soldOut ? (
        <div className="col-span-2 md:col-span-1 text-end">
          <button
            onClick={() => {
              toast.success("You will be notified on stock availability");
            }}
            className="border-primaryColor border font-semibold text-primaryColor col-span-2 md:col-span-1 py-2 px-4 rounded-md"
          >
            Notify
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end col-span-2 md:col-span-1">
          <label
            className={`${
              quantity ? "bg-primaryColor" : ""
            } ms-4 grid  top-4 h-5 w-5 px-[2px] border-2 rounded-[4px] border-primaryColor cursor-pointer`}
            htmlFor={`${"checkbox " + product.id}`}
          >
            {quantity ? <FaCheck className="text-white w-3" /> : null}
          </label>

          <input
            onChange={handleSelectionChange}
            id={`${"checkbox " + product.id}`}
            type="checkbox"
            className="hidden"
          />
        </div>
      )}
    </section>
  );
}

export default ProductListingRow;
