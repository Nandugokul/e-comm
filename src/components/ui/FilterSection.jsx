import { useEffect, useState } from "react";
import { MdOutlineReplay } from "react-icons/md";
import { TbLayoutGrid, TbLayoutList } from "react-icons/tb";
import { getCategories } from "../../pages/product-listing/api-services/product-listing";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductData,
  setFilterAndSearchState,
} from "../../store/productDataSlice";
import { setLayoutState } from "../../store/layoutSlice";

function FilterSection() {
  const [categoryList, setCategoryList] = useState([]);
  const filterState = useSelector((state) => state.productData.filterState);
  const dispatch = useDispatch();

  const [layout, setLayout] = useState("grid");

  const setDropDown = async () => {
    const response = await getCategories();
    setCategoryList(response.data);
  };

  const handleFilterChange = (event) => {
    dispatch(
      setFilterAndSearchState({ [event.target.name]: event.target.value })
    );
  };

  useEffect(() => {
    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setLayout(savedLayout);
      dispatch(setLayoutState(savedLayout));
    }
  }, [dispatch]);

  const handleLayoutChange = () => {
    const newLayout = layout === "grid" ? "list" : "grid";
    setLayout(newLayout);
    localStorage.setItem("layout", newLayout);
    dispatch(setLayoutState(newLayout));
  };

  const handleReset = () => {
    dispatch(clearProductData());
    dispatch(setFilterAndSearchState({ category: "", rating: "" }));
  };

  useEffect(() => {
    setDropDown();
  }, []);

  return (
    <section className="flex items-center justify-between py-5">
      <div className="flex space-x-4 items-center">
        <select
          onChange={handleFilterChange}
          className="w-1/3 md:w-48"
          name="category"
          value={filterState.category}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterState.rating}
          onChange={handleFilterChange}
          className="w-1/3 md:w-48"
          name="rating"
        >
          <option value="" disabled>
            Select Rating
          </option>
          <option value="3">Above 3</option>
          <option value="4">Above 4</option>
        </select>
        <button
          disabled={!filterState.category && !filterState.rating}
          onClick={handleReset}
          className={`${
            !filterState.category && !filterState.rating && "text-[#9e9f9f]"
          } text-my14 flex items-center space-x-1 opacity-70`}
        >
          <MdOutlineReplay />
          <span>Reset</span>
        </button>
      </div>
      <div className="flex space-x-3 items-center mb-4">
        <button
          className={` rounded-md p-2 text-[#9e9f9f] ${
            layout === "grid" ? "bg-selectBG text-black" : null
          }`}
          onClick={() => handleLayoutChange("grid")}
        >
          <TbLayoutGrid className="text-xl" />
        </button>
        <button
          className={`rounded-md p-2 text-[#9e9f9f] ${
            layout === "list"
              ? "bg-selectBG text-text-[#9e9f9f] text-black"
              : null
          }`}
          onClick={() => handleLayoutChange("list")}
        >
          <TbLayoutList className="text-xl" />
        </button>
      </div>
    </section>
  );
}
export default FilterSection;
