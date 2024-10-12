import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/ui/NavBar";
import CartProductListingCard from "./components/CartProductListingCard";
import { useEffect } from "react";
import { clearCartItems, setTotalPayable } from "../../store/cartDataSlice";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const selectedItems = useSelector(
    (state) => state.cartData.selectedItemsAndQuantity
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPayable = useSelector((state) => state.cartData.totalPayable);

  useEffect(() => {
    dispatch(setTotalPayable());
  }, [dispatch, selectedItems.length]);

  const handleCheckout = () => {
    dispatch(clearCartItems());
    navigate("/thank-you");
  };

  return (
    <>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
      </header>
      <div className="md:flex mt-5">
        <div className="md:w-2/3 md:pe-[40px]">
          <h3 className="font-semibold text-[20px]">Products in Cart</h3>
          <div className="flex ps-2 ">
            {selectedItems.length > 0 ? (
              <table className="w-full mt-4 ">
                <thead>
                  <tr>
                    <th className="text-start font-[600] text-my14 text-[#9e9f9f]">
                      <small>Product</small>
                    </th>
                    <th className="text-start font-[600] text-my14 text-[#9e9f9f]">
                      <small>Quantity</small>
                    </th>
                    <th className="font-[600] text-my14 text-[#9e9f9f] text-end">
                      <small>Subtotal</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, index) => (
                    <CartProductListingCard
                      key={item.id}
                      product={item}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-full flex items-center justify-center my-8">
                No items in Cart
              </div>
            )}
          </div>
        </div>
        <div className="px-4 grow bg-selectBG h-fit p-4 rounded-[8px] sticky top-[6.5rem]">
          <h6 className="font-semibold text-[20px] ">Cart Total</h6>
          <div className=" border-b border-borderColor pb-1 mt-4 flex justify-between items-center">
            <span className="font-[600] text-[11px] text-[#9e9f9f]">
              Subtotal
            </span>
            <span>${totalPayable.toFixed(2)}</span>
          </div>
          <div className=" pb-1 mt-4 flex justify-between items-center">
            <span className="font-[600]">Total Payable</span>
            <span className="font-bold text-[20px]">
              ${totalPayable.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`py-2 px-4 flex w-full items-center justify-center rounded-md text-my14 font-semibold text-white mt-4 ${
              selectedItems.length > 0
                ? "bg-primaryColor"
                : "bg-gray-400 pointer-events-none"
            }`}
          >
            Proceed to checkout
          </button>

          <div className="flex w-full items-center justify-center">
            <Link to="/" className="text-my14 font-semibold mt-4">
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartPage;
