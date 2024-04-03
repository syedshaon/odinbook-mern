import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../store/authReducer";
import { IKImage } from "imagekitio-react";

function PopupImg({}) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  return (
    <>
      {authState.imgKit.Popup_show && (
        <div className="fixed z-30 bg-gray-100 top-0 mt-[96px] md:mt-12   left-0 h-screen w-screen flex items-center justify-center">
          <IKImage className="   max-h-[95vh] max-w-[90vw] mx-auto   rounded" urlEndpoint="https://ik.imagekit.io/odinbook" alt="Thumbnail Preview" path={authState.imgKit.Popup_url} />

          <IoCloseCircleOutline
            onClick={(e) => {
              dispatch(authActions.hidePopup());
            }}
            className="cursor-pointer text-3xl md:text-5xl hover:text-blue-700   text-blue-500 absolute top-10 right-10"
          />
        </div>
      )}
    </>
  );
}

export default PopupImg;
