import { useLocation, useNavigate } from "react-router-dom";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state?.auth);
  const { lectures } = useSelector((state) => state?.lecture);

  const [currentVideo, setCurrentVideo] = useState(0);

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(
      deleteCourseLectures({
        courseid: courseId,
        lectureid: lectureId,
      })
    );
    await dispatch(getCourseLectures(state?.data?._id));
  };

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state?.data?._id));
  }, []);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] flex items-center justify-center flex-col  gap-10 py-10 text-white mx-[5%]">
        <div className="text-center text-2xl text-yellow-500 font-semibold">
          Course name : {state?.data?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 w-[20rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lectureThumbnail}
                className="object-fill rounded-tl-lg rounded-tr-lg"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>

              <div>
                <h1>
                  <span className="text-yellow-500">Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>

                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* left section for displying lecture */}
            <ul className="w-[20rem] p-2 rounded-lg shadow-[0_0_10px_black]  space-y-4 ">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className=" bg-sky-500 py-1 px-2 rounded font-semibold text-sm text-white"
                  >
                    Add lectures
                  </button>
                )}
              </li>

              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span>
                          {""} Lecture {idx + 1} : {""}
                        </span>
                        {lecture?.title}
                      </p>

                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?.data?._id, lecture?._id)
                          }
                          className=" bg-red-500 py-1 px-2 rounded font-semibold text-sm text-white"
                        >
                          Delete lectures
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className=" bg-sky-500 py-1 px-2 rounded font-semibold text-sm text-white"
            >
              Add lectures
            </button>
          )
        )}
      </div>
    </HomeLayouts>
  );
}

export default DisplayLectures;
