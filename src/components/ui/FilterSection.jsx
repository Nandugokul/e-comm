import { useEffect, useState } from "react";
import { MdOutlineReplay } from "react-icons/md";
// import { TbLayoutGrid, TbLayoutList } from "react-icons/tb";
import { getCategories } from "../../pages/product-listing/api-services/product-listing";
import { useDispatch, useSelector } from "react-redux";
import { setFilterAndSearchState } from "../../store/productDataSlice";

function FilterSection() {
  const [categoryList, setCategoryList] = useState([]);
  const filterState = useSelector((state) => state.productData.filterState);
  const dispatch = useDispatch();
  const setDropDown = async () => {
    const response = await getCategories();
    setCategoryList(response.data);
  };

  const handleFilterChange = (event) => {
    dispatch(
      setFilterAndSearchState({ [event.target.name]: event.target.value })
    );
  };

  const handleReset = () => {
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
          className="w-48"
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
          className="w-48"
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
      {/* <div className="flex space-x-3 items-center">
        <button className="bg-selectBG rounded-md p-2">
          <TbLayoutGrid className="text-xl" />
        </button>
        <button>
          <TbLayoutList className="text-xl text-[#9e9f9f]" />
        </button>
      </div> */}
    </section>
  );
}
export default FilterSection;
