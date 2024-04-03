import { useDispatch, useSelector } from "react-redux";

const Logout = async () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  try {
    const response = await fetch(authState.backendURL + "/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    });

    const responseData = await response.json();
    // console.log(response);

    if (responseData.Logout === "true") {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("followed_posts");
      dispatch(authActions.logout());
    }
  } catch (error) {
    console.log(error);
  }
};

export default Logout;
