import React from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import joinCommunity from "@/app/actions/community/joinCommunity";

function EnterCodePrompt({ setShowPopup, userId }) {
  const [otp, setOtp] = useState("");

  function submitCode() {
    console.log(joinCommunity(otp, userId));
  }

  return (
    <div className="popup fixed  w-80 bg-ultra-violet text-black rounded-xl z-20 p-4 font-bold text-xl text-center flex flex-col ">
      {/* Popup content */}

      <div className="w-full flex  flex-col items-center text-2xl gap-6">
        <p>Enter community code</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            backgroundColor: "white",
            padding: "2px",
            border: "1px solid black",
            userSelect: "none",
            height: "40px",
            width: "40px",
          }}
          shouldAutoFocus={true}
          renderSeparator={<span className="text-black/25 p-1"> </span>}
          renderInput={(props) => <input {...props} />}
        />
        <button
          onClick={submitCode}
          className="bg-black py-2 px-4 text-white rounded-xl text-lg "
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default EnterCodePrompt;
