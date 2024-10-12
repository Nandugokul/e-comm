import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center lg:w-1/2 xl:1/3 shadow-xl p-10 rounded-2xl">
        <div className="h-20 w-20 bg-green-600 flex items-center justify-center rounded-full">
          <FaCheck className="text-white w-10 h-10" />
        </div>
        <div className="text-[20px] text-center md:text-[24px] font-semibold mt-14">
          Order placed successfully
        </div>
        <div className="text-center my-4 text-[#626264]">
          Thank you for shopping with us. You will receive a confirmation email
          with details of your order shortly
        </div>
        <div className="flex  items-center justify-center bg-primaryColor rounded-md text-my14 font-semibold text-white ">
          <Link to={"/"} className=" py-2 px-4 ">
            Check out our new arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
