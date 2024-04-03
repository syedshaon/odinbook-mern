import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { ProfilePicUploadButton, CoverUploadButton } from "./Components/Profile_Conver_Update";
import { NameUpdateForm, BioUpdateForm } from "./Components/Name_Bio_Update";

import CreatePostForm from "./Components/CreatePostForm";
import SinglePost from "./Components/SinglePost";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { IKImage } from "imagekitio-react";
import PopupImg from "./Components/PopupImg";
import { IoPersonSharp } from "react-icons/io5";

function People_Own() {
  const authState = useSelector((state) => state.auth);

  // const [updateFrndFlw, setUpdateFrndFlw] = useState(false);
  const [showEditName, SetShowEditName] = useState(false);
  const [showEditBio, SetShowEditBio] = useState(false);
  const [allPosts, SetAllPosts] = useState([]);

  const fetchProfileDetails = async () => {
    try {
      const response = await fetch(authState.backendURL + "/profile-details/" + authState.user.username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (!response.ok) {
        console.log(responseData);

        // Handle error if needed
        return;
      }

      SetAllPosts(responseData.searchedUser.posts);

      // setUpdateFrndFlw((prev) => !prev);
      return;
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  // Following is required as some image url is added through faker.js
  const startsWithUploads = /^uploads/;
  const backgroundImageStyle = authState.user.coverPicture
    ? {
        backgroundImage: `url(${"https://ik.imagekit.io/odinbook" + authState.user.coverPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundPosition: "center", backgroundSize: "cover" };

  return (
    <>
      <Navbar />

      <div className="     ">
        <div className="mt-[96px] md:mt-14     shadow bg-white  ">
          {/* PROFILE HEADER */}
          <div className="   bg-slate-200 mb-3 pb-3">
            <div className=" w-full flex justify-center h-[348px] ">
              <div className="flex flex-col container">
                <div style={backgroundImageStyle} className="h-[348px] w-full   relative bg-gray-100 rounded-bl-lg rounded-br-lg                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400">
                  <div className="cursor-pointer absolute top-1 right-1 text-white w-10 h-10 rounded bg-blue-500">
                    <CoverUploadButton />
                  </div>

                  {/* // cover photo */}

                  <div className=" rounded-full absolute  top-48 inset-x-96 border-4 border-white bg-slate-500 w-40 h-40 flex justify-center items-center overflow-hidden" style={{ left: "calc(50% - 5rem)" }}>
                    {/* profile photo */}

                    {authState.user.profilePicture ? <IKImage className="max-w-full cursor-pointer max-h-[500px] mx-auto   rounded  w-40 h-40  " urlEndpoint="https://ik.imagekit.io/odinbook" alt="Thumbnail Preview" path={authState.user.profilePicture} /> : <IoPersonSharp className="w-40 h-40 rounded-full" />}
                    {authState.user.profilePicture && <PopupImg />}

                    <div className="cursor-pointer absolute top-3 right-3 text-white  rounded bg-blue-500">
                      <ProfilePicUploadButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* // INFOS */}
            <div className="container flex justify-center flex-col mt-5 mb-3.5">
              <div className="name mb-2 flex flex-col items-center lg:grid   lg:grid-cols-3 grid-flow-col">
                <div className="col-start-2 col-end-3 flex justify-center items-center">
                  {!showEditName && <h1 className="  text-center text-blue-500 font-bold text-xl">{authState.user.firstName + " " + authState.user.lastName}</h1>}
                  {!showEditName && <CiEdit onClick={() => SetShowEditName(true)} className="  cursor-pointer    w-6 h-6  text-blue-700" />}

                  {showEditName && <NameUpdateForm SetShowEditName={SetShowEditName} />}
                </div>
              </div>

              <div className="bio flex items-center justify-center">
                {authState.user.bio && <div className="flex   justify-center">{!showEditBio && <p className="w-2/3  text-center text-sm ">{authState.user.bio}</p>}</div>}

                {authState.user.bio && !showEditBio && (
                  <div onClick={() => SetShowEditBio(true)} className="  cursor-pointer   mr-1    text-blue-700">
                    <CiEdit className="w-8 h-8" />
                  </div>
                )}

                {showEditBio && <BioUpdateForm SetShowEditBio={SetShowEditBio} />}
              </div>

              {/* When there is no bio and bio is editable(owner is visitor) */}
              {!authState.user.bio && !showEditBio ? (
                <div className="bio flex items-center justify-center">
                  <p onClick={() => SetShowEditBio(true)} className="  cursor-pointer font-bold    text-gray-600">
                    Add Bio?
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* // END INFOS */}
          </div>
          <CreatePostForm SetAllPosts={SetAllPosts} />
          {/* Create Post Area Ends*/}

          {/* // CONTENT */}

          <div className=" min-h-[40vh]  container mx-auto">
            <div className="flex flex-col items-center w-full justify-center  ">
              {/* // POST */}
              {allPosts.length > 0 ? (
                allPosts.map((post) => <SinglePost key={post._id} searchedUser={authState.user} post={post} allPosts={allPosts} SetAllPosts={SetAllPosts} />)
              ) : (
                <div className="flex flex-col justify-center items-center min-h-[40vh]  w-full">
                  <MdOutlineContentPasteSearch className="text-red-500 bold text-7xl" />
                  <h3 className="text-blue-500 bold text-5xl">No Posts published yet.!</h3>
                </div>
              )}
              {/* // END POST */}
            </div>
          </div>

          {/* // END CONTENT */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default People_Own;
