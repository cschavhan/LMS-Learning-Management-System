import HomeLayouts from "../../Layouts/HomeLayouts";
import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
function CheckoutFailure() {
  return (
    <HomeLayouts>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="shadow-[0_0_10px_black] w-80 h-[26rem] flex flex-col items-center justify-center rounded-lg relative">
          <h1 className="bg-red-500 w-full text-center absolute top-0 rounded-tl-lg rounded-tr-lg py-2 font-bold text-2xl">
            Payment Failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h1 className="text-lg font-semibold">
                Oops ! Your payment failed
              </h1>

              <p className="text-left">Please try again later</p>
            </div>

            <RxCrossCircled className="bg-red-500 text-5xl rounded-full" />
          </div>

          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 w-full text-center transition-all ease-in-out duration-300 absolute bottom-0 py-2 font-semibold text-2xl rounded-bl-lg rounded-br-lg"
          >
            <button>Try again</button>
          </Link>
        </div>
      </div>
    </HomeLayouts>
  );
}

export default CheckoutFailure;
