import { IoCartOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../public/Icons-images/SVG/logo.svg";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setFilterAndSearchState } from "../../store/productDataSlice";
function NavBar() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state) => state.cartData.selectedItemsAndQuantity
  );
  const clearSearch = () => {
    dispatch(setFilterAndSearchState({ search: "" }));
  };
  const searchTerm = useSelector(
    (state) => state.productData.filterState.search
  );
  const handleSearch = (e) => {
    dispatch(setFilterAndSearchState({ search: e.target.value }));
  };
  return (
    <main className="flex items-center justify-between py-4 shadow-sm">
      <Link className="cursor-pointer" to={"/"}>
        <img src={logo} alt="logo" className="w-32" />
      </Link>
      <div className="flex items-center bg-selectBG rounded-md ps-3 w-1/3">
        <div className="h-full">
          <IoSearch className="text-slate-500 text-lg" />
        </div>
        <input
          className="w-full"
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Seach for products"
        />
        {searchTerm && (
          <button className="pe-3" onClick={clearSearch}>
            <IoIosClose className="text-slate-500 text-lg" />
          </button>
        )}
      </div>
      <Link
        to="/cart"
        data-count={selectedItems.length}
        className=" text-white flex items-center space-x-2 cart"
      >
        <IoCartOutline className="text-[28px] text-black" />
      </Link>
    </main>
  );
}
export default NavBar;
