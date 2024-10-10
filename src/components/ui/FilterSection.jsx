import { IoCartOutline, IoSearch } from "react-icons/io5";

function FilterSection() {
  return (
    <section className="flex items-center justify-between py-5">
      <div className="flex space-x-4 items-center">
        <select name="" id="">
          <option value="">bl</option>
          <option value="">bl</option>
        </select>
        <select name="" id="">
          <option value="">bl</option>
          <option value="">bl</option>
        </select>
        <button className="text-my14">Reset</button>
      </div>
      <div className="flex items-center justify-center  space-x-4">
        <div className="flex items-center bg-selectBG rounded-md ps-[0.7rem]">
          <div className="h-full">
            <IoSearch className="text-slate-500 text-lg" />
          </div>
          <input
            className="w-full"
            type="text"
            name=""
            placeholder="Seach for products"
          />
        </div>
        <button className=" text-white flex items-center space-x-2">
          <IoCartOutline className="text-2xl text-black" />
          {/* <span className="font-semibold">Cart</span> */}
        </button>
      </div>
    </section>
  );
}
export default FilterSection;
