import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IKImage } from "imagekitio-react";

const CommentList = ({ comments }) => {
  const authState = useSelector((state) => state.auth);
  const startsWithUploads = /^uploads/;
  return (
    <div className="space-y-4">
      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <div key={comment._id} className="flex items-start space-x-4">
            {comment.provider.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={comment.provider.profilePicture} alt="Profile picture" className="w-10 h-10 rounded-full" /> : <IoPersonSharp className="w-10 h-10 rounded-full" />}

            <div className="flex-1">
              <div className="flex flex-col items-start mb-2 md:flex-row md:items-center md:space-x-2">
                <NavLink to={`../user/${comment.provider.username}`}>
                  <span className="font-semibold text-blue-500">
                    {comment.provider.firstName} {comment.provider.lastName}
                  </span>
                </NavLink>

                <p className="text-gray-500  self-start md:self-end text-xs  ">{formatTime(comment.time)}</p>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

const formatTime = (timeString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return new Date(timeString).toLocaleDateString("en-US", options);
};

export default CommentList;
