import { useBlogContent } from "../context/BlogContantContext";

const TrackStatus = () => {
  const { data } = useBlogContent();
  return (
    <p className="text-gray-500 text-sm">
      Status:{" "}
      <span className="font-semibold">
        {data.status === "draft" ? "Draft" : "Published"}
      </span>
    </p>
  );
};

export default TrackStatus;
