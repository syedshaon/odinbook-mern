//
// Like button feature on posts
//

import { useSelector } from "react-redux";
import { FaRegThumbsUp } from "react-icons/fa";

const ToggleLikesForm = ({ postId, SetAllPosts, allPosts, nLikes }) => {
  const authState = useSelector((state) => state.auth);
  const handleToggleLike = async () => {
    try {
      const response = await fetch(authState.backendURL + "/posts/toggleLike/" + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const responseData = await response.json();
      // console.log(responseData);

      if (!response.ok) {
        console.log("Response from backend:", responseData.message);

        return;
      }

      // Find the post in the current state
      const updatedPosts = allPosts.map((p) => {
        if (p._id === postId) {
          // Check if the user has already liked the post
          const isLiked = p.likes.some((like) => like.provider === authState.user.id);

          if (isLiked) {
            // If liked, remove the like
            p.likes = p.likes.filter((like) => like.provider !== authState.user.id);
          } else {
            // If not liked, add the like
            p.likes.push({ provider: authState.user.id });
          }
        }
        return p;
      });

      // Update the state with the modified posts array
      SetAllPosts(updatedPosts);
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
    }
  };

  // return <FaRegThumbsUp className="cursor-pointer" onClick={handleToggleLike} />;
  return (
    <div onClick={handleToggleLike} className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
      <i className="bx bx-like"></i>
      <span className=" text-sm font-semibold   text-blue-500 flex items-center gap-3">
        <FaRegThumbsUp className="cursor-pointer" /> {nLikes}
      </span>
    </div>
  );
};

export default ToggleLikesForm;

{
  /* <span className=" text-sm font-semibold   text-blue-500 flex items-center gap-3">
  <ToggleLikesForm SetAllPosts={SetAllPosts} allPosts={allPosts} postId={post._id} /> {post.likes.length}
</span>; */
}
