// All users of Odinbook, sorted by interation time

import { useState } from "react";
import People_Contacts from "./Sidebar_Contacts";
import People_Groups from "./Sidebar_Groups";
import { useDispatch, useSelector } from "react-redux";
import { messengerActions } from "../../store/messenger_reducer";

function Sidebar() {
  // const [contactView, setContactsView] = useState(true);
  const contactView = useSelector((state) => state.messenger.contactView);
  const dispatch = useDispatch();

  return (
    <section className="relative  mt-[96px] md:mt-14  flex flex-col flex-none overflow-auto w-24   group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
      {/* Heading */}
      <div className="header p-4 flex flex-col  justify-center items-center  ">
        <p className="text-md font-bold  block group-hover:block">{contactView ? "Contacts" : "Groups"}</p>
        <hr className="my-3 bg-blue-500 w-full h-1" />
      </div>
      {/* Heading Ends*/}

      {contactView && <People_Contacts />}
      {!contactView && <People_Groups />}

      {/* Change between Contacts and Groups */}
      <div className="absolute bottom-14 md:bottom-0  w-full   flex gap-0 md:gap-2  flex-col md:flex-row">
        <div onClick={() => dispatch(messengerActions.alterContactView(true))} className={`w-full rounded md:w-1/2  py-3 px-3 flex justify-center font-bold  bg-blue-500 text-white text-sm  hover:bg-blue-800 ${!contactView && "cursor-pointer"}`}>
          Contacts
        </div>
        <div onClick={() => dispatch(messengerActions.alterContactView(false))} className={`w-full rounded md:w-1/2 py-3 px-3 flex justify-center font-bold bg-gray-800 text-white text-sm hover:text-black hover:bg-gray-400  ${contactView && "cursor-pointer"}  `}>
          Groups
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
