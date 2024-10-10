import { CiGrid41 } from "react-icons/ci";
import { MdOutlineReplay } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";

function FilterSection() {
  return (
    <section className="flex items-center justify-between py-5">
      <div className="flex space-x-4 items-center">
        <select className="w-24" name="" id="">
          <option value="laptops">Laptops</option>
          <option value="mobile-accessories">Mobile accessories</option>
          <option value="smartphones">Smartphones</option>
          <option value="tablets">Tablets</option>
        </select>
        <select className="w-24" name="" id="">
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
        <CiGrid41 />
        <TbLayoutList />
      </div>
    </section>
  );
}
export default FilterSection;
