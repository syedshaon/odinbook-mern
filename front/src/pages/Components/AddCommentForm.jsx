import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoPersonSharp } from "react-icons/io5";
import { IKImage } from "imagekitio-react";

const AddCommentForm = ({ searchedUser, postId, SetAllPosts, allPosts }) => {
  const [commentText, setCommentText] = useState("");
  const [showError, setShowError] = useState(false);
  const authState = useSelector((state) => state.auth);
  const startsWithUploads = /^uploads/;

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);

    if (e.target.value.replace(/\s/g, "").length == 0) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (commentText.replace(/\s/g, "").length == 0) {
      setShowError(true);
      return;
    }
    sendDataToBackend({ text: commentText });
    setCommentText("");
  };
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(authState.backendURL + "/posts/addComment/" + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      setCommentText("");
      if (!response.ok) {
        // console.log("Response from backend:", responseData.message);
        console.log("error from here.");
        return;
      }

      const post = responseData.post;
      console.log(post);

      const userComments = post.comments.filter((comment) => comment.provider._id === authState.user.id);
      console.log(userComments);
      // Sort the comments by time in descending order
      const sortedUserComments = userComments.sort((a, b) => new Date(b.time) - new Date(a.time));
      console.log(sortedUserComments);
      // Return the first comment (last comment based on sorting)
      const lastComment = sortedUserComments[0];
      console.log(lastComment);

      // Find the post in the current state
      const updatedPosts = allPosts.map((p) => {
        if (p._id === postId) {
          // Add the new comment to the post's comments array
          p.comments.push(lastComment);
        }
        return p;
      });
      console.log(updatedPosts);

      // Update the state with the modified posts array
      SetAllPosts(updatedPosts);

      // Handle the successful response (if needed)

      // console.log("Response from backend:", responseData.message);

      // Hide signup form
    } catch (err) {
      console.log("Error sending data to backend:", err.message);
    }
  };

  return (
    <div className="flex items-center my-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        {/* Add user profile picture here */}

        {authState.user.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={authState.user.profilePicture} alt="Profile picture" className="w-full h-full object-cover" /> : <IoPersonSharp className="w-9 h-9 rounded-full" />}
      </div>
      <form onSubmit={handleAddComment} className="flex-grow ml-3 ">
        <input maxLength="100" type="text" required value={commentText} onChange={handleCommentChange} placeholder="Write a comment..." className={`${showError ? "w-full bg-gray-200 p-3   border border-red-500 focus:outline-2 outline-red-500 rounded-md" : "w-full rounded-md p-3 bg-gray-200 border-none focus:outline-none"}`} />
      </form>
    </div>
  );
};

export default AddCommentForm;
