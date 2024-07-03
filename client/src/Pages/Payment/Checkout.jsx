import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/razorpaySlice";
import toast from "react-hot-toast";
import HomeLayouts from "../../Layouts/HomeLayouts";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentVerified
  );
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: userData?.email,
        name: userData?.fullName,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const load = async () => {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayouts>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="absolute top-0 text-center bg-yellow-500 w-full py-2 font-bold text-2xl rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[19px]">
              This purchase will allow you to access all available courses of
              our platform for
              <span className="text-yellow-500 font-bold">
                <br />1 Year duration {""}
              </span>
              All the existing and new launched courses will be also available
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span> only
            </p>

            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and condition applied</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 left-0 py-2 rounded-bl-lg rounded-br-lg text-xl font-bold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayouts>
  );
}

export default Checkout;
