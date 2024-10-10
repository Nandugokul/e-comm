import { MdOutlineReplay } from "react-icons/md";
import { TbLayoutGrid, TbLayoutList } from "react-icons/tb";

function FilterSection() {
  return (
    <section className="flex items-center justify-between py-5">
      <div className="flex space-x-4 items-center">
        <select className="w-48" name="" id="">
          <option value="laptops">Laptops</option>
          <option value="mobile-accessories">Mobile accessories</option>
          <option value="smartphones">Smartphones</option>
          <option value="tablets">Tablets</option>
        </select>
        <select className="w-48" name="" id="">
          <option value="laptops">Laptops</option>
          <option value="mobile-accessories">Mobile accessories</option>
          <option value="smartphones">Smartphones</option>
          <option value="tablets">Tablets</option>
        </select>
        <button
          className={`text-my14 flex items-center space-x-1 text-[#9e9f9f]`}
        >
          <MdOutlineReplay />
          <span>Reset</span>
        </button>
      </div>
      <div className="flex space-x-3 items-center">
        <button className="bg-selectBG rounded-md p-2">
          <TbLayoutGrid className="text-xl" />
        </button>
        <button>
          <TbLayoutList className="text-xl text-[#9e9f9f]" />
        </button>
      </div>
    </section>
  );
}
export default FilterSection;
