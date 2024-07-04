import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/authSlice";

function CheckoutSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <HomeLayouts>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="shadow-[0_0_10px_black] w-80 h-[26rem] flex flex-col items-center justify-center rounded-lg relative">
          <h1 className="bg-green-500 w-full text-center absolute top-0 rounded-tl-lg rounded-tr-lg py-2 font-bold text-2xl">
            Payment successfull
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h1 className="text-lg font-semibold">
                Welcome to the pro bundle
              </h1>

              <p className="text-left">Now you can enjoy all the courses</p>
            </div>

            <AiFillCheckCircle className="bg-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 w-full text-center transition-all ease-in-out duration-300 absolute bottom-0 py-2 font-semibold text-2xl rounded-bl-lg rounded-br-lg"
          >
            <button>Go to the dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayouts>
  );
}

export default CheckoutSuccess;
