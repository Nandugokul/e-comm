import { useState, useCallback, useRef, useEffect } from "react";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../public/Icons-images/SVG/logo.svg";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductData,
  setFilterAndSearchState,
} from "../../store/productDataSlice";

function NavBar() {
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const categoryFilter = useSelector(
    (state) => state.productData.filterState.category
  );

  const selectedItems = useSelector(
    (state) => state.cartData.selectedItemsAndQuantity
  );

  const searchTerm = useSelector(
    (state) => state.productData.filterState.search
  );

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (categoryFilter) {
      setLocalSearchTerm("");
    }
  }, [categoryFilter]);

  const clearSearch = () => {
    setLocalSearchTerm("");
    dispatch(setFilterAndSearchState({ search: "" }));
  };

  const debouncedSearch = useCallback(
    (value) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        dispatch(clearProductData());
        dispatch(setFilterAndSearchState({ search: value }));
      }, 300);
    },
    [dispatch]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <main className="flex items-center justify-between py-4 shadow-sm">
      <Link className="cursor-pointer" to={"/"}>
        <img src={logo} alt="logo" className="w-32" />
      </Link>
      {url === "/" && (
        <div className="flex items-center bg-selectBG rounded-md ps-3 w-1/3">
          <div className="h-full">
            <IoSearch className="text-slate-500 text-lg" />
          </div>
          <input
            className="w-full"
            type="text"
            name="search"
            value={localSearchTerm}
            onChange={handleSearch}
            placeholder="Search for products"
          />
          {localSearchTerm && (
            <button className="pe-3" onClick={clearSearch}>
              <IoIosClose className="text-slate-500 text-lg" />
            </button>
          )}
        </div>
      )}
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
