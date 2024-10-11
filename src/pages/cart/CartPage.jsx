import NavBar from "../../components/ui/NavBar";
import CartProductListingCard from "./components/CartProductListingCard";

function CartPage() {
  return (
    <>
      <NavBar />
      <div className="flex mt-5">
        <div className="w-2/3 pe-[40px]">
          <h3 className="font-semibold text-[20px] ">Products in Cart</h3>
          <div className="flex ps-2">
            <table className="w-full mt-4">
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
                <CartProductListingCard />
                <CartProductListingCard />
                <CartProductListingCard />
                <CartProductListingCard />
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-4 grow bg-selectBG h-fit p-4 rounded-[8px]">
          <h6 className="font-semibold text-[20px] ">Cart Total</h6>
          <div className=" border-b border-borderColor pb-1 mt-4 flex justify-between items-center">
            <span className="font-[600] text-[11px] text-[#9e9f9f]">
              Subtotal
            </span>
            <span>$200</span>
          </div>
          <div className=" pb-1 mt-4 flex justify-between items-center">
            <span className="font-[600]">Total Payable</span>
            <span className="font-bold text-[20px]">$200</span>
          </div>
          <button className="bg-primaryColor py-2 px-4 rounded-md text-my14 font-semibold text-white w-full mt-4">
            Proceed to checkout
          </button>
          <button className="text-my14 font-semibold w-full mt-4">
            Back to Shopping
          </button>
        </div>
      </div>
    </>
  );
}
export default CartPage;
