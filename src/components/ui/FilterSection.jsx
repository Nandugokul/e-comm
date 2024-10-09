import { FaSearch } from "react-icons/fa";

function FilterSection() {
  return (
    <section className="flex items-center justify-between py-6">
      <div className="flex space-x-2 items-center justify-center w-1/4">
        <FaSearch className="text-primaryColor" />
        <input
          className="w-full"
          type="text"
          name=""
          placeholder="Seach for products"
        />
      </div>
      <div className="flex space-x-4 items-center">
        <select name="" id="">
          <option value="">bl</option>
          <option value="">bl</option>
        </select>
        <select name="" id="">
          <option value="">bl</option>
          <option value="">bl</option>
        </select>
        <button className="btn">Reset</button>
      </div>
    </section>
  );
}
export default FilterSection;
