import { useDispatch, useSelector } from "react-redux";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { getAllCourses } from "../../Redux/Slices/courseSlice";
import { useEffect } from "react";
import CourseCard from "../../Componenats/CourseCard";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const loadCourses = async () => {
    await dispatch(getAllCourses());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center font-bold text-3xl">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>

        <div className="mb-10 flex flex-wrap gap-14">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayouts>
  );
}

export default CourseList;
