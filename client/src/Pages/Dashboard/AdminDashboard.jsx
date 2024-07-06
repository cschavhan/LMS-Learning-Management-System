import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

import { deleteCourse, getAllCourses } from "../../Redux/Slices/courseSlice";
import { getUserStats } from "../../Redux/Slices/statSlice";
import { getPaymentRecord } from "../../Redux/Slices/razorpaySlice";
import HomeLayouts from "../../Layouts/HomeLayouts";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector(
    (state) => state?.stat
  );

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state?.razorpay
  );

  const userData = {
    labels: ["Registered user", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales/Month",
        data: [monthlySalesRecord],
        backgroundColor: ["rgb(255,99,132)"],
        borderWidth: 2,
        borderColor: ["white"],
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getUserStats());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl text-yellow-500 font-semibold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          <div className="flex flex-col items-center gap-10 shadow-lg p-5 rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>

                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>

                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 shadow-lg p-5 rounded-md">
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>

                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {String(allPayments?.count * 499)}
                  </h3>
                </div>

                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* course related */}
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>

            <button
              onClick={() => navigate("/course/create")}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 px-2 py-1 font-semibold text-xl rounded-md"
            >
              Create new course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S No</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCourses.map((course, idx) => {
                return (
                  <tr key={course?._id}>
                    <td>{idx + 1}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>

                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.description}
                        className="w-80 h-auto bg-transparent resize-none "
                      ></textarea>
                    </td>

                    <td className="flex items-center gap-5">
                      <button
                        className="bg-green-500 py-1 px-2 rounded-md text-lg font-semibold"
                        onClick={() => navigate("/courses")}
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        onClick={() => onCourseDelete(course?._id)}
                        className="bg-red-500 py-1 px-2 rounded-md text-lg font-semibold"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayouts>
  );
}

export default AdminDashboard;
