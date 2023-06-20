import React, { useState } from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CommunityActionCard from "./components/CommunityActionCard";

async function Community() {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full flex flex-col gap-10 lg:flex-row justify-center items-center w-full lg:px-40 bg-black">
      <p className="text-4xl text-ultra-violet font-bold text-center fixed top-10">
        Hyperlocal{" "}
        <span className="text-mint-green font-extralight">Communities</span>{" "}
      </p>
      <CommunityActionCard />
    </div>
  );
}

export default Community;
