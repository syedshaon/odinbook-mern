import { useSelector } from "react-redux";

import Conversations_Ppl from "./Conversations_Ppl";
import Conversations_Group from "./Conversations_Group";
function Conversations() {
  const contactView = useSelector((state) => state.messenger.contactView);

  return (
    <>
      {contactView && <Conversations_Ppl />}

      {!contactView && <Conversations_Group />}
    </>
  );
}

export default Conversations;
