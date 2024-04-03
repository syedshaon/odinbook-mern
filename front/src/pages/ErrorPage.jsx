import { NavLink } from "react-router-dom";
// import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
// import { useDispatch, useSelector } from "react-redux";

// import Authenticator from "./ImageKit/Authenticator";

function ErrorPage() {
  // const authState = useSelector((state) => state.auth);

  // const validateFileFunction = (file) => {
  //   console.log("validating");
  //   if (file.size < 5000000) {
  //     // Less than 1mb
  //     console.log("less than 5mb");
  //     return true;
  //   }
  //   console.log("more than 5mb");
  //   return false;
  // };

  // const onUploadProgress = (progress) => {
  //   console.log("Progress", progress);
  // };

  // const onError = (err) => {
  //   console.log("Error", err);
  // };

  // const onSuccess = (res) => {
  //   console.log("Success", res);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="teams container min-h-[800px] flex justify-center items-center px-2 md:px-7">
      {/* <form onSubmit={handleSubmit}>
        <IKContext publicKey={authState.imgKit.IMAGEKIT_PUBLIC_KEY} urlEndpoint={authState.imgKit.IMAGEKIT_URL_ENDPOINT} authenticator={Authenticator}>
          <p>Upload an image</p>
          <IKUpload validateFile={validateFileFunction} onUploadProgress={onUploadProgress} fileName="test-upload.png" onError={onError} onSuccess={onSuccess} />
        </IKContext>

        <button type="submit">Submit</button>
      </form> */}

      {/* <IKContext publicKey="public_D3R2YXCqESRUwCNMgLufGCsa8GY=" urlEndpoint="https://ik.imagekit.io/odinbook" transformationPosition="path" authenticationEndpoint={IMAGEKIT_AUTH_END}>
        <IKImage
          path="/default-image.jpg"
          transformation={[
            {
              height: "300",
              width: "400",
            },
          ]}
        />

        <IKUpload fileName="my-upload" />
      </IKContext> */}

      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-orange-600">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let's get you back{" "}
          <NavLink to="/" className="text-emerald-500 font-bold">
            home
          </NavLink>
          .
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
