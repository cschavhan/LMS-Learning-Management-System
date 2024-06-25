import { useLocation } from "react-router-dom";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { useSelector } from "react-redux";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] pt-20 px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              className="w-full h-64"
              src={state.data?.thumbnail}
              alt="thumbnail"
            />

            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Total lectures:{" "}
                  </span>
                  {state.data?.numberOfLectures}
                </p>

                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Instructor:{" "}
                  </span>
                  {state.data?.createdBy}
                </p>
              </div>

              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Watch lectures
                </button>
              ) : (
                <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state.data?.title}
            </h1>

            <p className="text-yellow-500">Course description: </p>
            <p> {state.data?.description} </p>
          </div>
        </div>
      </div>
    </HomeLayouts>
  );
}

export default CourseDescription;
