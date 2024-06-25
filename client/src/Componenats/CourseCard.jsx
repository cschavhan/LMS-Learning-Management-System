import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/course/description")}
      className="text-white w-[22rem] h-[370px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
    >
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail}
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
        />

        <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-white line-clamp-2">
            <span className="text-yellow-500 font-bold">Title: </span>
            {data?.title}
          </h2>

          <p className="line-clamp-2">
            <span className="text-yellow-500 font-bold">Description: </span>
            {data?.description}
          </p>

          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category: </span>
            {data?.category}
          </p>

          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Total lectures: </span>
            {data?.numberOfLectures}
          </p>

          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Instructor: </span>
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
