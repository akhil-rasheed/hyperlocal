"use client";
import React from "react";
import { useState } from "react";
import EnterCodePrompt from "./EnterCodePrompt";
import CreateCommunityPrompt from "./CreateCommunityPrompt";
import { setUser } from "@/store/store";
import { useDispatch } from "react-redux";

function CommunityActionCard({ userId, user }) {
  // const dispatch = useDispatch();

  // Assuming you have the user object
  // const updateUser = (user) => {
  //   dispatch(setUser(user));
  // };

  // updateUser(user);

  const [showJoinPopup, setShowJoinPopup] = useState(false); // State to control the visibility of the JoinPopup
  const [showCreatePopup, setShowCreatePopup] = useState(false); // State to control the visibility of the JoinPopup

  const openJoinPopup = () => {
    setShowJoinPopup(true);
  };

  const openCreatePopup = () => {
    setShowCreatePopup(true);
  };

  return (
    <>
      <div
        className={`w-full lg:w-1/2 px-10 flex flex-col lg:flex-row gap-6 font-bold text-xl ${
          showJoinPopup || showCreatePopup ? "blur" : ""
        }`}
      >
        <div
          onClick={openCreatePopup}
          className="h-40 px-4 border-2 border-solid text-center flex items-center hover:cursor-pointer justify-center py-5 w-full rounded-lg text-ultra-violet border-ultra-violet"
        >
          <p>Create your own Community</p>
        </div>
        <div className="h-40 px-4 bg-ultra-violet text-center flex flex-col gap-4 justify-center items-center w-full rounded-lg text-black border-ultra-violet">
          <p>Join an existing Community</p>
          <div className="flex w-full flex-row p-2 px-8 lg:px-2 gap-2 justify-around font-bold text-sm">
            <button
              className="p-2 w-full bg-black text-ultra-violet rounded-xl hover:animate-pulse"
              onClick={openJoinPopup} // Attach onClick event to open the JoinPopup
            >
              Enter a code
            </button>
            <button className="p-2 w-full border-black border-2 rounded-xl lg:hidden">
              Scan a QR code
            </button>
          </div>
        </div>
      </div>

      {showJoinPopup && ( // Conditionally render the JoinPopup
        <EnterCodePrompt setShowPopup={setShowJoinPopup} userId={userId} />
      )}
      {showCreatePopup && ( // Conditionally render the CreatePopup
        <CreateCommunityPrompt userId={user.id} />
      )}
      {(showJoinPopup || showCreatePopup) && ( // Conditionally render the JoinPopup
        <div
          className="h-screen w-screen fixed"
          onClick={
            showJoinPopup || showCreatePopup
              ? () => {
                  setShowJoinPopup(false);
                  setShowCreatePopup(false);
                }
              : null
          }
        ></div>
      )}
    </>
  );
}

export default CommunityActionCard;
