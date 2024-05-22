import { Link } from "react-router-dom";
import HomeLayouts from "../Layouts/HomeLayouts";
import HomePageImage from "../Assets/Images/HomePage.png";

function HomePage() {
  return (
    <HomeLayouts>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold mt-24">
            Find out best
            <span className="text-yellow-500 font-bold"> Online Courses</span>
          </h1>

          <p className="text-xl text-gray-500">
            We have a large library of courses taught by highly skilled and
            qualified faculties at very affordable price
          </p>

          <div className="space-x-6">
            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="border border-yellow-500  px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300">
                Contact us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <img src={HomePageImage} alt="homepage img" className="" />
        </div>
      </div>
    </HomeLayouts>
  );
}

export default HomePage;
