//
// Post's that appear on the homepage uses FollowedSinglePost.jsx
//
// SinglePost.jsx is Used to show Single post on any user's profile
//

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCommentForm from "./AddCommentForm";
import { IKImage } from "imagekitio-react";
const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
import ToggleLikesForm from "./ToggleLikesForm";
import { BiSolidCommentAdd } from "react-icons/bi";
import CommentList from "./CommentList";
import { NavLink } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import PopupImg from "./PopupImg";
import { authActions } from "../../store/authReducer";

function FollowedSinglePost({ post, allPosts, SetAllPosts }) {
  // console.log(post);
  const authState = useSelector((state) => state.auth);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const startsWithUploads = /^uploads/;
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white p-4 my-4 mt-10 rounded-md shadow-lg  ">
      {/* POST AUTHOR */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center">
          <div className="relative">
            {/* Assuming you have a variable for the profile picture */}

            {post.author.profilePicture ? <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={post.author.profilePicture} alt="Profile picture" className="w-10 h-10 rounded-full" /> : <IoPersonSharp className="w-10 h-10 rounded-full" />}
          </div>
          <div>
            <NavLink to={`../user/${post.author.username}`}>
              <p className="font-semibold text-blue-500">{post.author.firstName + " " + post.author.lastName}</p>
            </NavLink>

            <span className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleDateString("en-US", options)}</span>
          </div>
        </div>
        <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
          <i className="bx bx-dots-horizontal-rounded"></i>
        </div>
      </div>
      {/* END POST AUTHOR */}
      {/* POST CONTENT */}
      <div className="text-justify  px-4 py-2">
        {post.thumbnail && <IKImage onClick={() => dispatch(authActions.showPopup(post.thumbnail))} className="max-w-full cursor-pointer max-h-[500px] mx-auto h-auto rounded" urlEndpoint="https://ik.imagekit.io/odinbook" alt="Thumbnail Preview" path={post.thumbnail} />}
        {post.thumbnail && <PopupImg />}
      </div>
      <div className="text-justify px-4 py-2">
        <p className="bold  mx-10">{post.text}</p>
      </div>
      {/* END POST CONTENT */}
      {/* POST ACTION */}
      <div className="py-2 px-4">
        <div className="border border-gray-200 border-l-0 border-r-0 py-1">
          <div className="flex justify-between items-center space-x-2">
            {/* <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500">
              <i className="bx bx-like"></i>
              <span className=" text-sm font-semibold   text-blue-500 flex items-center gap-3">
                <ToggleLikesForm SetAllPosts={SetAllPosts} allPosts={allPosts} postId={post._id} /> {post.likes.length}
              </span>
            </div> */}
            <ToggleLikesForm SetAllPosts={SetAllPosts} allPosts={allPosts} postId={post._id} nLikes={post.likes.length} />

            <div onClick={() => setShowAddComment((prev) => !prev)} className="flex justify-center items-center w-1/3 hover:bg-gray-100   py-2 rounded-lg  cursor-pointer text-blue-500 font-semibold">
              <BiSolidCommentAdd />
            </div>
            <div
              onClick={() => {
                setShowComment((prev) => !prev);
              }}
              className=" w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100   py-2 rounded-lg cursor-pointer text-gray-500"
            >
              <span className="text-sm  text-blue-500 font-semibold">{post.comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-opacity duration-500 ${showAddComment ? "opacity-100" : "opacity-0"}`}>{showAddComment && <AddCommentForm SetAllPosts={SetAllPosts} allPosts={allPosts} postId={post._id} />}</div>
      <div className={`transition-opacity duration-500 ${showComment ? "opacity-100" : "opacity-0"}`}>{showComment && <CommentList comments={post.comments} />}</div>

      {/* END POST ACTION */}
    </div>
  );
}

export default FollowedSinglePost;
