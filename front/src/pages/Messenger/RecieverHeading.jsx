import { useSelector } from "react-redux";

const startsWithUploads = /^uploads/;
import { IoPersonSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { IKImage } from "imagekitio-react";

function RecieverHeading({ setShowContact }) {
  const contactView = useSelector((state) => state.messenger.contactView);
  const activeReciepient = useSelector((state) => state.messenger.activeReciepient);
  const authState = useSelector((state) => state.auth);
  const allUsers = useSelector((state) => state.users.allUsers);
  const allGroupConversations = useSelector((state) => state.messenger.allGroupConversations);
  const activeGroupConversation = useSelector((state) => state.messenger.activeGroupConversation);

  const IMG = (participant) => {
    if (participant.profilePicture) {
      return <IKImage urlEndpoint="https://ik.imagekit.io/odinbook" path={participant.profilePicture} className=" shadow-md rounded-full w-full h-full object-cover " src={participant.profilePicture} />;
    } else {
      return <IoPersonSharp className="shadow-md rounded-full w-full h-full object-cover" />;
    }
  };

  return (
    <>
      {/* Contacts View */}
      {contactView && (
        <div className="chat-header px-1 md:px-6 pb-4 flex flex-col   shadow">
          <div onClick={() => setShowContact((prev) => !prev)} className="md:hidden mb-4 ml-4 cursor-pointer bg-blue-500 w-12 h-10 flex justify-center items-center rounded-md text-xl">
            <FaAddressBook className="text-white" />
          </div>
          <div className="flex items-center mr-auto ml-4">
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">{IMG(activeReciepient)}</div>
            <div className="text-sm">
              <NavLink to={`../user/${activeReciepient.username}`}>
                <p className="font-bold text-sm">
                  {activeReciepient.firstName} {activeReciepient.lastName}
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Contacts View Ends*/}

      {/* Group View */}
      {!contactView && activeGroupConversation && (
        <div className="chat-header px-1 md:px-6 pb-4 flex flex-col   shadow">
          <div onClick={() => setShowContact((prev) => !prev)} className="md:hidden mb-4 ml-4 cursor-pointer bg-blue-500 w-12 h-10 flex justify-center items-center rounded-md text-xl">
            <FaAddressBook className="text-white" />
          </div>
          <div className="mx-2  bg-gray-300 rounded-md mb-5 flex-col items-center  ">
            <h3 className="text-center text-md font-bold">{activeGroupConversation.groupName}</h3>
            <div className="overflow-hidden   flex justify-center">
              {activeGroupConversation.participants.map((participantId) => {
                const participant = allUsers.find((user) => user._id === participantId);
                if (participant) {
                  return (
                    <div className="w-12 h-12 relative flex flex-shrink-0" key={participant._id}>
                      {IMG(participant)}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecieverHeading;
