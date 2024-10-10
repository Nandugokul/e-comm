import { IoCartOutline, IoSearch } from "react-icons/io5";

import logo from "../../../public/Icons-images/SVG/logo.svg";
function NavBar() {
  return (
    <main className="flex items-center justify-between py-4 shadow-sm">
      <img src={logo} alt="logo" className="w-32" />
      <div className="flex items-center bg-selectBG rounded-md ps-[0.7rem] w-1/3">
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
    </main>
  );
}
export default NavBar;
