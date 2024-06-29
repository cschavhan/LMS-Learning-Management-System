import { useLocation, useNavigate } from "react-router-dom";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courseDetails = useLocation().state;

  const [userInput, setUserInput] = useState({
    id: courseDetails?.data?._id,
    title: "",
    description: "",
    lectureThumbnail: null,
    videoSrc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleVideoUpload = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    if (source) {
      setUserInput({
        ...userInput,
        lectureThumbnail: video,
        videoSrc: source,
      });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.lectureThumbnail
    ) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(addCourseLectures(userInput));
    if (response?.payload?.success) {
      setUserInput({
        id: courseDetails?.data?._id,
        title: "",
        description: "",
        lectureThumbnail: null,
        videoSrc: "",
      });

      navigate("/courses");
    }
  };

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>

          <form
            noValidate
            onSubmit={onFormSubmit}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />

            <textarea
              name="description"
              id="description"
              placeholder="Enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-28"
              value={userInput.description}
            />

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload, nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div className="h-40 border flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lectureThumbnail"
                  className="font-semibold text-xl cursor-pointer"
                >
                  {" "}
                  Choose your video
                </label>

                <input
                  type="file"
                  className="hidden"
                  id="lectureThumbnail"
                  name="lectureThumbnail"
                  onChange={handleVideoUpload}
                  accept="video/mp4, video/x-mp4, video/*"
                />
              </div>
            )}

            <button
              type="submit"
              className="py-1 font-semibold text-lg rounded bg-blue-500"
            >
              Add new lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayouts>
  );
}

export default AddLecture;
