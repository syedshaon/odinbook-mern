import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import People_Single from "./People_Single";
import People_Own from "./People_Own";

function People_Profile() {
  const { uid } = useParams();
  const isCurrentUserId = useSelector((state) => state.auth.user.username);

  return <>{isCurrentUserId === uid ? <People_Own /> : <People_Single />}</>;
}

export default People_Profile;
